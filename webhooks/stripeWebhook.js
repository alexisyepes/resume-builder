const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { Order, Subscription, User } = require("../models")

const router = express.Router()

const mapSubscriptionStatus = (stripeStatus) => {
	const statusMap = {
		incomplete: "active",
		incomplete_expired: "active",
		trialing: "active",
		active: "active",
		past_due: "past_due",
		canceled: "canceled",
		unpaid: "past_due",
	}
	return statusMap[stripeStatus] || "active"
}

const updateDownloadLimits = (planType) => {
	const downloadLimits = {
		free: { downloadsRemaining: 1, totalDownloads: 0 },
		basic: { downloadsRemaining: 10, totalDownloads: 0 },
		premium: { downloadsRemaining: 9999, totalDownloads: 0 },
		enterprise: { downloadsRemaining: 9999, totalDownloads: 0 },
	}
	return downloadLimits[planType] || downloadLimits.free
}

const getRawBody = (req) => {
	return new Promise((resolve, reject) => {
		let data = ""
		req.on("data", (chunk) => {
			data += chunk
		})
		req.on("end", () => {
			resolve(data)
		})
		req.on("error", reject)
	})
}

const rawBodyMiddleware = async (req, res, next) => {
	try {
		if (req.path === "/webhook") {
			const rawBody = await getRawBody(req)
			req.rawBody = rawBody

			try {
				req.body = JSON.parse(rawBody)
			} catch (e) {
				req.body = {}
			}
		}
		next()
	} catch (error) {
		console.error("Error in rawBodyMiddleware:", error)
		next(error)
	}
}

router.use(rawBodyMiddleware)

router.post("/webhook", async (req, res) => {
	const sig = req.headers["stripe-signature"]

	console.log("Webhook received")

	let event

	try {
		if (!req.rawBody) {
			throw new Error("No raw body available")
		}

		if (!process.env.STRIPE_WEBHOOK_SECRET) {
			throw new Error("STRIPE_WEBHOOK_SECRET not set")
		}

		event = stripe.webhooks.constructEvent(
			req.rawBody,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		)

		console.log(`Webhook verified: ${event.type}`)
	} catch (err) {
		console.error("Webhook signature verification failed:", err.message)
		return res.status(400).json({
			error: `Webhook Error: ${err.message}`,
		})
	}

	try {
		await handleStripeEvent(event)
		res.json({ received: true })
	} catch (error) {
		console.error("Error processing webhook:", error.message)
		res.status(500).json({
			error: "Error processing webhook",
			details: error.message,
		})
	}
})

async function handleStripeEvent(event) {
	switch (event.type) {
		case "checkout.session.completed":
			await handleCheckoutSessionCompleted(event.data.object)
			break
		case "customer.subscription.created":
			await handleSubscriptionCreated(event.data.object)
			break
		case "customer.subscription.updated":
			await handleSubscriptionUpdated(event.data.object)
			break
		case "customer.subscription.deleted":
			await handleSubscriptionDeleted(event.data.object)
			break
		case "invoice.paid":
			await handleInvoicePaid(event.data.object)
			break
		case "payment_intent.succeeded":
			console.log(`Payment succeeded`)
			break
		case "invoice.created":
			console.log(`Invoice created`)
			break
		default:
			console.log(`Unhandled event type: ${event.type}`)
	}
}

async function handleCheckoutSessionCompleted(session) {
	console.log("Checkout session completed:", {
		sessionId: session.id,
		amount: session.amount_total / 100,
		metadata: session.metadata,
	})

	if (!session.metadata?.userId) {
		console.warn("Session missing userId metadata")
		return
	}

	try {
		await Order.create({
			userId: session.metadata.userId,
			stripeSessionId: session.id,
			amount: session.amount_total / 100,
			currency: session.currency,
			status: "completed",
		})

		console.log(`Order created for user ${session.metadata.userId}`)
	} catch (error) {
		console.error("Error creating order:", error)
		throw error
	}
}

async function handleSubscriptionCreated(subscription) {
	console.log("Subscription created:", {
		subscriptionId: subscription.id,
		status: subscription.status,
		metadata: subscription.metadata,
	})

	let userId = subscription.metadata?.userId

	if (!userId) {
		console.error("Cannot process subscription: No userId found in metadata")
		return
	}

	try {
		let planType = subscription.metadata?.planType || "basic"

		let expiresAt = null
		if (subscription.current_period_end) {
			expiresAt = new Date(subscription.current_period_end * 1000)
			console.log(`Expires at from subscription: ${expiresAt}`)
		}

		if (!expiresAt || isNaN(expiresAt.getTime())) {
			expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
			console.log(`Using default expiry: ${expiresAt}`)
		}

		const downloadLimits = updateDownloadLimits(planType)
		const mappedStatus = mapSubscriptionStatus(subscription.status)

		console.log(`Processing subscription for user ${userId}:`, {
			planType,
			expiresAt,
			downloadLimits,
			stripeStatus: subscription.status,
			mappedStatus: mappedStatus,
		})

		const [updatedUserCount] = await User.update(
			{
				planType: planType,
				subscriptionStatus: mappedStatus,
				subscriptionId: subscription.id,
				subscriptionEndDate: expiresAt,
				downloadsRemaining: downloadLimits.downloadsRemaining,
				totalDownloads: downloadLimits.totalDownloads,
			},
			{
				where: { id: userId },
			}
		)

		if (updatedUserCount === 0) {
			console.error(`User ${userId} not found in database`)
			throw new Error(`User ${userId} not found`)
		}

		console.log(`User ${userId} updated to plan ${planType}`)

		try {
			await Subscription.create({
				userId: userId,
				stripeSubscriptionId: subscription.id,
				plan: planType,
				expiresAt: expiresAt,
			})
			console.log(`Created new subscription record`)
		} catch (subscriptionError) {
			if (subscriptionError.name === "SequelizeUniqueConstraintError") {
				await Subscription.update(
					{
						plan: planType,
						expiresAt: expiresAt,
					},
					{ where: { stripeSubscriptionId: subscription.id } }
				)
				console.log(`Updated existing subscription record`)
			} else {
				throw subscriptionError
			}
		}

		console.log(`Subscription fully processed: ${subscription.id}`)
	} catch (error) {
		console.error("Error processing subscription creation:", {
			message: error.message,
			name: error.name,
			subscriptionId: subscription.id,
			userId: userId,
		})
		throw error
	}
}

async function handleSubscriptionUpdated(subscription) {
	console.log("Subscription updated:", {
		subscriptionId: subscription.id,
		status: subscription.status,
		metadata: subscription.metadata,
	})

	if (!subscription.metadata?.userId) {
		console.warn("Subscription missing userId metadata in update")
		return
	}

	const userId = subscription.metadata.userId

	try {
		const planType = subscription.metadata.planType || "basic"

		let expiresAt = null
		if (subscription.current_period_end) {
			expiresAt = new Date(subscription.current_period_end * 1000)
		}

		if (!expiresAt || isNaN(expiresAt.getTime())) {
			console.log("Invalid expiry date, keeping existing")
			expiresAt = null
		}

		const mappedStatus = mapSubscriptionStatus(subscription.status)
		const updateData = {
			planType: planType,
			subscriptionStatus: mappedStatus,
		}

		console.log("USER TO BE UPDATED: ", updateData)

		if (expiresAt) {
			updateData.subscriptionEndDate = expiresAt
		}

		const [updatedUserCount] = await User.update(updateData, {
			where: { id: userId },
		})

		if (updatedUserCount === 0) {
			console.warn(`User ${userId} not found for update`)
		} else {
			console.log(`User ${userId} updated`)
		}

		const subscriptionUpdateData = {
			plan: planType,
		}

		if (expiresAt) {
			subscriptionUpdateData.expiresAt = expiresAt
		}

		const [updatedSubscriptionCount] = await Subscription.update(
			subscriptionUpdateData,
			{ where: { stripeSubscriptionId: subscription.id } }
		)

		if (updatedSubscriptionCount === 0) {
			console.warn(`Subscription ${subscription.id} not found for update`)
		} else {
			console.log(`Subscription ${subscription.id} updated`)
		}

		console.log(`Subscription update processed for user ${userId}`)
	} catch (error) {
		console.error("Error updating subscription:", error)
		throw error
	}
}

async function handleSubscriptionDeleted(subscription) {
	console.log("Subscription deleted:", {
		subscriptionId: subscription.id,
		metadata: subscription.metadata,
	})

	if (!subscription.metadata?.userId) {
		console.warn("Subscription missing userId metadata")
		return
	}

	const userId = subscription.metadata.userId

	try {
		await User.update(
			{
				planType: "free",
				subscriptionStatus: "canceled",
				subscriptionId: null,
			},
			{ where: { id: userId } }
		)

		await Subscription.update(
			{
				plan: "free",
			},
			{ where: { stripeSubscriptionId: subscription.id } }
		)

		console.log(`Subscription cancelled for user ${userId}`)
	} catch (error) {
		console.error("Error cancelling subscription:", error)
		throw error
	}
}

async function handleInvoicePaid(invoice) {
	console.log("Invoice paid:", {
		invoiceId: invoice.id,
		subscriptionId: invoice.subscription,
		amount: invoice.amount_paid / 100,
	})

	if (!invoice.subscription) return

	try {
		const subscription = await stripe.subscriptions.retrieve(
			invoice.subscription
		)

		if (!subscription.metadata?.userId) {
			console.warn("Subscription missing userId metadata in invoice")
			return
		}

		const userId = subscription.metadata.userId

		let expiresAt = null
		if (subscription.current_period_end) {
			expiresAt = new Date(subscription.current_period_end * 1000)
		}

		if (!expiresAt || isNaN(expiresAt.getTime())) {
			console.warn("⚠️ Invalid expiry date in invoice")
			return
		}

		const [updatedUserCount] = await User.update(
			{
				subscriptionEndDate: expiresAt,
				subscriptionStatus: "active",
			},
			{ where: { id: userId } }
		)

		if (updatedUserCount === 0) {
			console.warn(`User ${userId} not found for invoice update`)
		}

		const [updatedSubscriptionCount] = await Subscription.update(
			{ expiresAt: expiresAt },
			{ where: { stripeSubscriptionId: subscription.id } }
		)

		if (updatedSubscriptionCount === 0) {
			console.warn(
				`Subscription ${subscription.id} not found for invoice update`
			)
		}

		console.log(`Invoice paid for user ${userId}, renewed until ${expiresAt}`)
	} catch (error) {
		console.error("Error processing invoice payment:", error)
	}
}

module.exports = router
