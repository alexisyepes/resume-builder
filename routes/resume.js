const express = require("express")
const { Resume } = require("../models")
const router = express.Router()

const isProduction = process.env.NODE_ENV === "production"

let puppeteer
let chromium

if (isProduction) {
	chromium = require("@sparticuz/chromium")
	puppeteer = require("puppeteer-core")
} else {
	puppeteer = require("puppeteer")
}

router.post("/generate-pdf", async (req, res) => {
	try {
		const { html, firstName } = req.body
		if (!html) {
			return res.status(400).json({ error: "No HTML content provided" })
		}

		let browser
		if (isProduction) {
			const executablePath = await chromium.executablePath()
			console.log("Using Chromium from:", executablePath)

			browser = await puppeteer.launch({
				args: chromium.args,
				defaultViewport: chromium.defaultViewport,
				executablePath,
				headless: chromium.headless,
			})
		} else {
			browser = await puppeteer.launch({
				headless: true,
			})
		}

		const page = await browser.newPage()
		await page.setContent(html, { waitUntil: "domcontentloaded" })
		await page.waitForSelector("body")
		await page.evaluate(
			() => new Promise((resolve) => setTimeout(resolve, 500))
		)
		await page.setViewport({ width: 850, height: 1100 })

		const pdfBuffer = await page.pdf({
			format: "LETTER",
			printBackground: true,
			margin: { top: 0, right: 0, bottom: 0, left: 0 },
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

router.get("/:userId", async (req, res) => {
	const resumes = await Resume.findAll({ where: { userId: req.params.userId } })
	res.json(resumes)
})

router.post("/", async (req, res) => {
	const { userId, fileUrl } = req.body
	const resume = await Resume.create({ userId, fileUrl })
	res.status(201).json(resume)
})

module.exports = router
