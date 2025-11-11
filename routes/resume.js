const express = require("express")
const { Resume } = require("../models")
const router = express.Router()
const puppeteer = require("puppeteer")

router.post("/generate-pdf", async (req, res) => {
	try {
		const { html, firstName } = req.body
		if (!html) {
			return res.status(400).json({ error: "No HTML content provided" })
		}

		const browser = await puppeteer.launch({
			headless: "new",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		})

		const page = await browser.newPage()
		await page.setContent(html, { waitUntil: "domcontentloaded" })
		await page.waitForSelector("body")
		await page.evaluate(
			() => new Promise((resolve) => setTimeout(resolve, 500))
		)
		await page.setViewport({ width: 850, height: 1100 }) // 8.5in x 11in in pixels (approx)

		const pdfBuffer = await page.pdf({
			format: "LETTER",
			printBackground: true,
			margin: { top: 0, right: 0, bottom: 0, left: 0 }, // Remove extra spacing
			width: "8.5in",
			height: "11in",
		})

		await browser.close()

		res.setHeader("Content-Type", "application/pdf")
		res.setHeader(
			"Content-Disposition",
			`attachment; filename=${firstName}.pdf`
		)
		res.setHeader("Content-Length", pdfBuffer.length)

		res.end(pdfBuffer)
	} catch (error) {
		console.error("Error generating PDF:", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

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
