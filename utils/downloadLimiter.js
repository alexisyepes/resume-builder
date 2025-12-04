const { User, Resume } = require("../models")

/**
 * Verify if user can download more resumes based on their plan
 * @param {string} userId - User ID
 * @returns {Promise<{canDownload: boolean, reason?: string, userPlan?: string}>}
 */
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

		// Paid plans have no limits
		const paidPlans = ["basic", "premium", "enterprise"]

		if (paidPlans.includes(user.planType)) {
			return {
				canDownload: true,
				userPlan: user.planType,
				downloadsRemaining: "unlimited",
			}
		}

		if (user.planType === "free") {
			const downloadedResumesCount = await Resume.count({
				where: { userId },
			})

			if (downloadedResumesCount >= 1) {
				return {
					canDownload: false,
					reason: "free_limit_reached",
					userPlan: "free",
					downloadsUsed: downloadedResumesCount,
					limit: 1,
				}
			}

			return {
				canDownload: true,
				userPlan: "free",
				downloadsRemaining: 1 - downloadedResumesCount,
				limit: 1,
			}
		}

		return {
			canDownload: false,
			reason: "unknown_plan",
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
 * Increment the user's download count
 * @param {string} userId - User ID
 */
const incrementDownloadCount = async (userId) => {
	try {
		const user = await User.findByPk(userId)
		console.log(user)

		if (user) {
			if (user.planType === "free") {
				await user.update({
					totalDownloads: user.totalDownloads + 1,
					downloadsRemaining: Math.max(0, user.downloadsRemaining - 1),
				})
			} else {
				await user.update({
					totalDownloads: user.totalDownloads + 1,
				})
			}
		}
	} catch (error) {
		console.error("Error incrementing download count:", error)
	}
}

module.exports = { checkDownloadLimit, incrementDownloadCount }
