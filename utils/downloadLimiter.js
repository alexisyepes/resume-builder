const { User } = require("../models")

const checkDownloadLimit = async (userId) => {
	try {
		const user = await User.findByPk(userId, {
			attributes: ["id", "planType", "downloadsRemaining", "totalDownloads"],
		})

		if (!user) {
			return {
				canDownload: false,
				reason: "User not found",
			}
		}

		// Plan limits
		const planLimits = {
			free: 1, // Máximo 1 descarga por mes
			basic: 10, // 10 descargas por mes
			premium: 9999, // Ilimitado
		}

		const userLimit = planLimits[user.planType] || 1

		// Premium es ilimitado
		if (user.planType === "premium" || user.downloadsRemaining >= 9999) {
			return {
				canDownload: true,
				userPlan: user.planType,
				downloadsRemaining: 9999,
				limit: "unlimited",
			}
		}

		// Para free plan: puede usar máximo 1, aunque tenga más en downloadsRemaining
		if (user.planType === "free") {
			// Si ya usó su descarga gratuita este mes
			if (user.downloadsRemaining <= 0) {
				return {
					canDownload: false,
					reason: "free_monthly_limit_reached",
					userPlan: "free",
					downloadsRemaining: user.downloadsRemaining,
					limit: 1,
					message:
						"You've used your free download for this month. Monthly limit: 1 download.",
				}
			}

			// Puede descargar (máximo 1 este mes)
			return {
				canDownload: true,
				userPlan: "free",
				downloadsRemaining: Math.min(user.downloadsRemaining, 1),
				limit: 1,
				note: "Free plan: monthly limit is 1 download",
			}
		}

		// Para basic plan: verificar downloadsRemaining
		if (user.downloadsRemaining <= 0) {
			return {
				canDownload: false,
				reason: "download_limit_reached",
				userPlan: user.planType,
				downloadsRemaining: user.downloadsRemaining,
				limit: userLimit,
				message: `You've reached your monthly download limit (${userLimit} resumes).`,
			}
		}

		// Puede descargar
		return {
			canDownload: true,
			userPlan: user.planType,
			downloadsRemaining: user.downloadsRemaining,
			limit: userLimit,
		}
	} catch (error) {
		console.error("Error checking download limit:", error)
		return {
			canDownload: false,
			reason: "server_error",
		}
	}
}

/**
 * Increment the user's download count and decrement downloadsRemaining
 * @param {string} userId - User ID
 */
const incrementDownloadCount = async (userId) => {
	try {
		const user = await User.findByPk(userId)

		if (!user) {
			console.error("User not found for incrementDownloadCount")
			return
		}

		// Solo decrementar downloadsRemaining si no es premium/ilimitado
		if (user.planType !== "premium" && user.downloadsRemaining < 9999) {
			const newRemaining = Math.max(0, user.downloadsRemaining - 1)

			await user.update({
				totalDownloads: user.totalDownloads + 1,
				downloadsRemaining: newRemaining,
			})

			console.log(
				`Decremented downloads for user ${userId}: ${user.downloadsRemaining} -> ${newRemaining}`
			)
		} else {
			// Para premium, solo incrementar totalDownloads
			await user.update({
				totalDownloads: user.totalDownloads + 1,
			})
		}
	} catch (error) {
		console.error("Error incrementing download count:", error)
	}
}

module.exports = { checkDownloadLimit, incrementDownloadCount }
