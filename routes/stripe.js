const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { Subscription, User } = require("../models")
const router = express.Router()

router.post("/create-checkout-session", async (req, res) => {
	try {
		const { priceId, userId, planType } = req.body

		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" })
		}

		// Verificar si el usuario ya tiene un customer ID en Stripe
		let customerId = user.stripeCustomerId

		if (!customerId) {
			// Crear customer en Stripe si no existe
			const customer = await stripe.customers.create({
				email: user.email,
				name: `${user.firstName} ${user.lastName}`,
				metadata: {
					userId: user.id.toString(),
				},
			})

			customerId = customer.id
			// Guardar customer ID en la base de datos
			await user.update({ stripeCustomerId: customerId })
		}

		// Crear sesión de checkout
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			customer: customerId,
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: "subscription",
			return_url: `${process.env.FRONTEND_URL}/builder?session_id={CHECKOUT_SESSION_ID}`,
			metadata: {
				userId: user.id.toString(),
				planType: planType,
			},
			subscription_data: {
				metadata: {
					userId: user.id.toString(),
					planType: planType,
				},
			},
		})

		res.json({
			clientSecret: session.client_secret,
			sessionId: session.id,
		})
	} catch (error) {
		console.error("Error creating checkout session:", error)
		res.status(500).json({ error: error.message })
	}
})

router.get("/session-status", async (req, res) => {
	const { session_id } = req.query

	try {
		const session = await stripe.checkout.sessions.retrieve(session_id)

		res.json({
			status: session.status,
			customer_email: session.customer_details?.email,
		})
	} catch (error) {
		console.error("Error retrieving session:", error)
		res.status(500).json({ error: error.message })
	}
})

router.post("/cancel-subscription", async (req, res) => {
	try {
		const { subscriptionId, userId } = req.body

		if (!subscriptionId) {
			return res.status(400).json({
				error: "subscriptionId is required",
			})
		}

		const canceledSubscription = await stripe.subscriptions.cancel(
			subscriptionId
		)

		if (userId) {
			await User.update(
				{
					planType: "free",
					subscriptionStatus: "canceled",
					subscriptionId: null,
					subscriptionEndDate: null,
					downloadsRemaining: 1,
					totalDownloads: 0,
				},
				{ where: { id: userId } }
			)
		}

		await Subscription.update(
			{
				plan: "free",
				expiresAt: null,
			},
			{ where: { stripeSubscriptionId: subscriptionId } }
		)

		res.json({
			success: true,
			message: "Subscription cancelled successfully",
			subscription: canceledSubscription,
		})
	} catch (error) {
		console.error("Error canceling subscription:", error)
		res.status(500).json({
			error: error.message,
			code: error.code,
		})
	}
})

module.exports = router
