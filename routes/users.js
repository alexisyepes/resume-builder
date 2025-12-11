const express = require("express")
const router = express.Router()
const { User, Resume } = require("../models")
const { checkDownloadLimit } = require("../utils/downloadLimiter")

router.post("/change-to-free-plan", async (req, res) => {
	try {
		const { userId } = req.body

		if (!userId) {
			return res.status(400).json({
				success: false,
				error: "userId is required",
			})
		}

		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({
				success: false,
				error: "User not found",
			})
		}

		// Si ya está en free plan, no hacer nada
		if (user.planType === "free") {
			return res.json({
				success: true,
				message: "User is already on free plan",
				user: {
					id: user.id,
					planType: user.planType,
					subscriptionStatus: user.subscriptionStatus,
				},
			})
		}

		console.log(`Changing user ${userId} from ${user.planType} to free plan`)

		// Cancelar suscripción en Stripe si tiene una
		if (user.subscriptionId) {
			try {
				const canceledSubscription = await stripe.subscriptions.cancel(
					user.subscriptionId
				)

				console.log(`Cancelled Stripe subscription: ${user.subscriptionId}`)

				// Actualizar registro en Subscription table
				await Subscription.update(
					{
						plan: "free",
						expiresAt: null,
					},
					{ where: { stripeSubscriptionId: user.subscriptionId } }
				)
			} catch (stripeError) {
				console.error("Error cancelling Stripe subscription:", stripeError)
			}
		}

		// MANTENER LOS DOWNLOADS REMAINING QUE TENÍA
		// Si tenía 10 descargas en basic, mantiene 10
		// Pero el límite free es 1, así que solo podrá usar 1
		let newDownloadsRemaining = user.downloadsRemaining

		// Asegurar que no sea negativo
		if (newDownloadsRemaining < 0) {
			newDownloadsRemaining = 0
		}

		const updateData = {
			planType: "free",
			downloadsRemaining: newDownloadsRemaining,
			subscriptionStatus: "canceled",
			subscriptionId: null,
			subscriptionEndDate: null,
		}

		await user.update(updateData)

		console.log(`Successfully changed user ${userId} to free plan`, {
			downloadsRemaining: {
				previous: user.downloadsRemaining,
				new: newDownloadsRemaining,
				note: "User keeps their remaining downloads, but free plan limit is 1",
			},
		})

		const updatedUser = await User.findByPk(userId, {
			attributes: [
				"id",
				"email",
				"firstName",
				"lastName",
				"planType",
				"subscriptionStatus",
				"downloadsRemaining",
				"totalDownloads",
				"subscriptionId",
				"subscriptionEndDate",
			],
		})

		res.json({
			success: true,
			message: "Successfully changed to free plan",
			user: updatedUser,
			changes: {
				previousPlan: user.planType,
				newPlan: "free",
				previousDownloads: user.downloadsRemaining,
				newDownloads: newDownloadsRemaining,
				note: "User keeps remaining downloads, but free plan monthly limit is 1",
			},
		})
	} catch (error) {
		console.error("Error changing to free plan:", error)
		res.status(500).json({
			success: false,
			error: "Internal server error",
			details: error.message,
		})
	}
})

router.get("/:userId/profile", async (req, res) => {
	try {
		const { userId } = req.params

		const user = await User.findByPk(userId, {
			attributes: [
				"id",
				"email",
				"firstName",
				"lastName",
				"createdAt",
				"planType",
				"totalDownloads",
				"downloadsRemaining",
				"subscriptionStatus",
				"subscriptionEndDate",
			],
		})

		if (!user) {
			return res.status(404).json({
				success: false,
				error: "User not found",
			})
		}

		const downloadedResumesCount = await Resume.count({
			where: { userId },
		})

		const profileData = {
			id: user.id,
			email: user.email,
			firstName: user.firstName || "",
			lastName: user.lastName || "",
			createdAt: user.createdAt,
			planType: user.planType,
			totalDownloads: user.totalDownloads || 0,
			downloadsRemaining: user.downloadsRemaining,
			resumesDownloaded: downloadedResumesCount,
			subscriptionStatus: user.subscriptionStatus,
			subscriptionEndDate: user.subscriptionEndDate,
		}

		res.json(profileData)
	} catch (error) {
		console.error("Error fetching user profile:", error)
		res.status(500).json({
			success: false,
			error: "Internal server error",
		})
	}
})

router.put("/:userId/profile", async (req, res) => {
	try {
		const { userId } = req.params
		const { firstName, lastName } = req.body

		const user = await User.findByPk(userId)

		if (!user) {
			return res.status(404).json({
				success: false,
				error: "User not found",
			})
		}

		const updateData = {}
		if (firstName !== undefined) updateData.firstName = firstName
		if (lastName !== undefined) updateData.lastName = lastName

		await user.update(updateData)

		const updatedUser = await User.findByPk(userId, {
			attributes: [
				"id",
				"email",
				"firstName",
				"lastName",
				"createdAt",
				"planType",
				"totalDownloads",
			],
		})

		res.json(updatedUser)
	} catch (error) {
		console.error("Error updating user profile:", error)
		res.status(500).json({
			success: false,
			error: "Internal server error",
		})
	}
})

router.get("/:userId/download-limit", async (req, res) => {
	try {
		const { userId } = req.params

		const limitCheck = await checkDownloadLimit(userId)

		res.json({
			success: true,
			...limitCheck,
		})
	} catch (error) {
		console.error("Error checking download limit:", error)
		res.status(500).json({
			success: false,
			error: "Internal server error",
		})
	}
})

router.get("/:userId/download-stats", async (req, res) => {
	try {
		const { userId } = req.params

		const user = await User.findByPk(userId, {
			attributes: ["id", "planType", "downloadsRemaining", "totalDownloads"],
		})

		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const downloadedResumesCount = await Resume.count({
			where: { userId },
		})

		res.json({
			planType: user.planType,
			downloadsUsed: downloadedResumesCount,
			downloadsRemaining:
				user.planType === "free"
					? Math.max(0, 1 - downloadedResumesCount)
					: "unlimited",
			totalDownloads: user.totalDownloads,
			limit: user.planType === "free" ? 1 : "unlimited",
		})
	} catch (error) {
		console.error("Error getting download stats:", error)
		res.status(500).json({ error: "Internal server error" })
	}
})

module.exports = router
