// routes/users.js
const express = require("express")
const router = express.Router()
const { User, Resume } = require("../models")
const { checkDownloadLimit } = require("../utils/downloadLimiter")

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
