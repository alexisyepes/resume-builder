const { User } = require("../models")

const checkDownloadLimit = async (userId) => {
	try {
		const user = await User.findByPk(userId, {
			attributes: ["id", "planType", "downloadsRemaining", "totalDownloads"],
		})

		const now = new Date()
		const isPaidPeriodExpired =
			user.subscriptionEndDate && new Date(user.subscriptionEndDate) < now

		if (isPaidPeriodExpired && user.plan !== "free") {
			return {
				canDownload: false,
				reason: "Plan has expired",
			}
		}

		if (!user) {
			return {
				canDownload: false,
				reason: "User not found",
			}
		}

		if (user.planType === "premium" || user.downloadsRemaining >= 9999) {
			return {
				canDownload: true,
				userPlan: user.planType,
				downloadsRemaining: 9999,
				limit: "unlimited",
			}
		}

		// Verify downloadsRemaining
		if (user.downloadsRemaining <= 0) {
			return {
				canDownload: false,
				reason: "download_limit_reached",
				userPlan: user.planType,
				downloadsRemaining: user.downloadsRemaining,
				limit: user.planType === "free" ? 1 : 5,
				message:
					user.planType === "free"
						? "You've used your free download. Upgrade to download more."
						: "You've reached your download limit for this period.",
			}
		}

		// Can download
		return {
			canDownload: true,
			userPlan: user.planType,
			downloadsRemaining: user.downloadsRemaining,
			limit: user.planType === "free" ? 1 : 5,
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
			await user.update({
				totalDownloads: user.totalDownloads + 1,
			})
		}
	} catch (error) {
		console.error("Error incrementing download count:", error)
	}
}

module.exports = { checkDownloadLimit, incrementDownloadCount }
