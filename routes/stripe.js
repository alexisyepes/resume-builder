const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const { Order, Subscription } = require("../models")

const router = express.Router()

router.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	async (req, res) => {
		let event
		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				req.headers["stripe-signature"],
				process.env.STRIPE_WEBHOOK_SECRET // @TODO: set this in env variables
			)
		} catch (err) {
			return res.status(400).send(`Webhook Error: ${err.message}`)
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object
			await Order.create({
				userId: session.metadata.userId,
				stripeSession: session.id,
				amount: session.amount_total / 100,
				currency: session.currency,
				status: "paid",
			})
		}

		if (
			event.type === "customer.subscription.updated" ||
			event.type === "customer.subscription.created"
		) {
			const subscription = event.data.object
			await Subscription.upsert({
				userId: subscription.metadata.userId,
				stripeSubId: subscription.id,
				plan: subscription.items.data[0].price.id.includes("pro")
					? "paid"
					: "free",
				status: subscription.status,
				startDate: new Date(subscription.current_period_start * 1000),
				endDate: new Date(subscription.current_period_end * 1000),
			})
		}

		res.json({ received: true })
	}
)

module.exports = router
