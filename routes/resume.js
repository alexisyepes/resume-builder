const express = require("express")
const { Resume, Template, User } = require("../models")
// const { save } = require("pdfkit")
const router = express.Router()
const { Op } = require("sequelize")
const { uploadPdfDirectToCloudinary } = require("../utils/cloudinaryService")

const isProduction = process.env.NODE_ENV === "production"

let puppeteer
let chromium

if (isProduction) {
	chromium = require("@sparticuz/chromium")
	puppeteer = require("puppeteer-core")
} else {
	puppeteer = require("puppeteer")
}

router.get("/all_templates", async (req, res) => {
	try {
		const templates = await Template.findAll()
		res.json(templates)
	} catch (error) {
		console.error("Error fetching templates:", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

router.post("/generate-pdf", async (req, res) => {
	try {
		const {
			userId,
			title,
			html,
			templateName,
			fileFormat,
			fileUrl,
			fileName,
			fileSize,
			firstName,
			lastName,
			resumeData,
		} = req.body

		if (!html) {
			return res.status(400).json({ error: "No HTML content provided" })
		}

		const user = await User.findByPk(userId)

		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const {
			checkDownloadLimit,
			incrementDownloadCount,
		} = require("../utils/downloadLimiter")

		const limitCheck = await checkDownloadLimit(userId)

		if (!limitCheck.canDownload) {
			return res.status(403).json({
				error: "Download limit reached",
				message: limitCheck.message || "You have reached your download limit",
				reason: limitCheck.reason,
				userPlan: limitCheck.userPlan,
				downloadsRemaining: limitCheck.downloadsRemaining,
				code: "DOWNLOAD_LIMIT_REACHED",
			})
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

		let pdfCloudinaryUrl = null
		try {
			pdfCloudinaryUrl = await uploadPdfDirectToCloudinary(
				pdfBuffer,
				userId,
				`${firstName}_${lastName}_resume.pdf`
			)

			if (pdfCloudinaryUrl) {
				console.log("PDF uploaded to Cloudinary:", pdfCloudinaryUrl)
			} else {
				console.warn("PDF Cloudinary upload failed, but continuing...")
			}
		} catch (uploadError) {
			console.warn(
				"Cloudinary not configured, skipping PDF upload:",
				uploadError
			)
		}

		const template = await Template.findOne({
			where: {
				[Op.or]: [{ name: templateName }, { value: templateName }],
			},
			attributes: ["id"],
		})

		if (!template) {
			console.error(`Template '${templateName}' not found`)
			return res
				.status(404)
				.json({ error: `Template '${templateName}' not found` })
		}

		let savedResume

		try {
			savedResume = await Resume.create({
				userId,
				title: title || generateDefaultTitle(firstName, lastName),
				templateId: template.id,
				resumeData,
				fileFormat,
				fileName,
				fileUrl,
				pdfUrl: pdfCloudinaryUrl,
				fileSize,
				firstName,
				lastName,
			})
			console.log("Resume saved to database:", {
				id: savedResume.id,
				pdfUrl: savedResume.pdfUrl,
				fileUrl: savedResume.fileUrl,
			})
		} catch (error) {
			console.error("Error saving resume to database:", error)
		}

		if (savedResume) {
			try {
				// Usar la nueva función incrementDownloadCount que maneja downloadsRemaining
				await incrementDownloadCount(userId)
				console.log(
					"Download count incremented for user:",
					userId,
					`Downloads remaining: ${
						limitCheck.downloadsRemaining !== 9999
							? limitCheck.downloadsRemaining - 1
							: "unlimited"
					}`
				)
			} catch (incrementError) {
				console.error("Error incrementing download count:", incrementError)
			}
		}

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

function generateDefaultTitle(firstName, lastName) {
	const date = new Date().toLocaleDateString("en-CA")
	const namePart = firstName && lastName ? `${firstName}_${lastName}` : "Resume"
	return `${namePart}_${date}`
}

module.exports = router
