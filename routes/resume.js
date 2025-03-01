const express = require("express")
const { Resume } = require("../models")
const router = express.Router()

// Get user resumes
router.get("/:userId", async (req, res) => {
	const resumes = await Resume.findAll({ where: { userId: req.params.userId } })
	res.json(resumes)
})

// Upload Resume
router.post("/", async (req, res) => {
	const { userId, fileUrl } = req.body

	const resume = await Resume.create({ userId, fileUrl })
	res.status(201).json(resume)
})

module.exports = router
