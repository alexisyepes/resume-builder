const router = require("express").Router()
const OpenAI = require("openai")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const { PdfReader } = require("pdfreader")
const { authenticateToken } = require("../middlewares/auth")

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// Configure multer
const storage = multer.diskStorage({
	destination: "uploads/",
	filename: function (req, file, cb) {
		const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")
		cb(null, Date.now() + "-" + safeName)
	},
})

const upload = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === "application/pdf" ||
			path.extname(file.originalname).toLowerCase() === ".pdf"
		) {
			cb(null, true)
		} else {
			cb(new Error("Only PDF files are allowed"), false)
		}
	},
})

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
	fs.mkdirSync("uploads", { recursive: true })
}

/**
 * Extract text from PDF using pdfreader
 */
const extractTextFromPDF = (filePath) => {
	return new Promise((resolve, reject) => {
		let text = ""
		let pageTexts = {}
		let currentPage = 0
		let itemCount = 0
		let textItemCount = 0

		new PdfReader().parseFileItems(filePath, (err, item) => {
			if (err) {
				reject(err)
			} else if (!item) {
				// End of file
				console.log(
					`PDF parsing complete. Items processed: ${itemCount}, Text items: ${textItemCount}`
				)

				// Combine all page texts in order
				const sortedPages = Object.keys(pageTexts)
					.sort((a, b) => parseInt(a) - parseInt(b))
					.map((page) => pageTexts[page])

				const combinedText = sortedPages.join("\n\n")

				// Log detailed extraction info
				console.log(`Pages extracted: ${Object.keys(pageTexts).length}`)
				console.log(`Total text length: ${combinedText.length} chars`)
				console.log(
					`Non-whitespace chars: ${combinedText.replace(/\s/g, "").length}`
				)

				resolve(combinedText)
			} else {
				itemCount++

				if (item.page) {
					// Update current page
					currentPage = item.page
					if (!pageTexts[currentPage]) {
						pageTexts[currentPage] = ""
					}
				}

				if (item.text) {
					textItemCount++
					if (!pageTexts[currentPage]) {
						pageTexts[currentPage] = ""
					}
					pageTexts[currentPage] += item.text + " "

					// Log first few text items for debugging
					if (textItemCount <= 5) {
						console.log(`Text item ${textItemCount}: "${item.text}"`)
					}
				}
			}
		})
	})
}

/**
 * Clean up uploaded file
 */
const cleanupFile = (filePath) => {
	if (filePath && fs.existsSync(filePath)) {
		try {
			fs.unlinkSync(filePath)
			console.log(`Cleaned up file: ${filePath}`)
		} catch (error) {
			console.error("Error cleaning up file:", error)
		}
	}
}

/**
 * Validate and clean extracted text
 */
const validateAndCleanText = (text) => {
	if (!text)
		return { isValid: false, cleanedText: "", reason: "No text extracted" }

	// Remove excessive whitespace
	let cleanedText = text.replace(/\s+/g, " ").trim()

	// Check if text contains meaningful content (not just symbols or numbers)
	const hasLetters = /[a-zA-Z]/.test(cleanedText)
	const hasWords = cleanedText.split(/\s+/).length >= 3
	const meaningfulLength = cleanedText.length >= 20

	console.log(`Text validation:`)
	console.log(`  Has letters: ${hasLetters}`)
	console.log(
		`  Has at least 3 words: ${hasWords} (${
			cleanedText.split(/\s+/).length
		} words)`
	)
	console.log(
		`  Length >= 20 chars: ${meaningfulLength} (${cleanedText.length} chars)`
	)

	if (!hasLetters || !hasWords || !meaningfulLength) {
		return {
			isValid: false,
			cleanedText: cleanedText,
			reason: `Text doesn't contain meaningful content. Letters: ${hasLetters}, Words: ${
				cleanedText.split(/\s+/).length
			}, Length: ${cleanedText.length}`,
		}
	}

	return {
		isValid: true,
		cleanedText: cleanedText,
		reason: "Valid text content",
	}
}

/**
 * Parse OpenAI response to JSON
 */
const parseAIResponse = (responseText) => {
	try {
		// Clean the response text
		const cleanText = responseText.trim()

		// Try to parse as JSON directly
		try {
			const parsed = JSON.parse(cleanText)

			// Validate required fields
			if (
				typeof parsed.score === "number" &&
				Array.isArray(parsed.strengths) &&
				Array.isArray(parsed.suggestions)
			) {
				// Ensure score is within range
				parsed.score = Math.max(1, Math.min(100, parsed.score))

				return parsed
			}
		} catch (jsonError) {
			console.log("Direct JSON parse failed, trying to extract JSON...")
		}

		// Try to find JSON object in the response
		const jsonStart = cleanText.indexOf("{")
		const jsonEnd = cleanText.lastIndexOf("}")

		if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
			const jsonStr = cleanText.substring(jsonStart, jsonEnd + 1)
			try {
				const parsed = JSON.parse(jsonStr)

				if (
					typeof parsed.score === "number" &&
					Array.isArray(parsed.strengths) &&
					Array.isArray(parsed.suggestions)
				) {
					parsed.score = Math.max(1, Math.min(100, parsed.score))
					return parsed
				}
			} catch (error) {
				console.log("Extracted JSON parse failed")
			}
		}

		// If no valid JSON found, create a structured response
		console.log("Creating structured response from text...")

		return {
			score: 50,
			strengths: ["Resume processed successfully"],
			suggestions: ["Consider adding more details to your resume"],
			summary: "Basic resume analysis completed.",
			aiFeedback:
				cleanText.length > 0
					? cleanText
					: "Resume analysis completed successfully.",
		}
	} catch (error) {
		console.error("Error parsing AI response:", error)

		return {
			score: 50,
			strengths: ["PDF processed successfully"],
			suggestions: ["Try uploading a more detailed resume"],
			summary: "Unable to generate detailed analysis.",
			aiFeedback:
				"The resume was processed but analysis could not be completed.",
		}
	}
}

/**
 * Resume Analysis Endpoint
 */
router.post(
	"/analyze-resume",
	authenticateToken,
	upload.single("resume"),
	async (req, res) => {
		console.log("\n" + "=".repeat(50))
		console.log("STARTING RESUME ANALYSIS")
		console.log("=".repeat(50))

		let filePath = null

		try {
			// Validate file
			if (!req.file) {
				return res.status(400).json({
					success: false,
					error: "Please select a PDF file",
				})
			}

			filePath = req.file.path
			console.log(`File: ${req.file.originalname}`)
			console.log(`Size: ${req.file.size} bytes`)
			console.log(`Type: ${req.file.mimetype}`)

			// Extract text
			console.log("\n--- Extracting text from PDF ---")
			const resumeText = await extractTextFromPDF(filePath)

			console.log(`\n--- Text Extraction Results ---`)
			console.log(`Raw text length: ${resumeText.length} characters`)

			// Validate and clean the text
			const validation = validateAndCleanText(resumeText)
			console.log(`Validation result: ${validation.reason}`)

			if (!validation.isValid) {
				console.log(`\n✗ Text validation failed: ${validation.reason}`)

				// Even if validation fails, we can still try to analyze if there's some text
				if (validation.cleanedText.length === 0) {
					cleanupFile(filePath)
					return res.status(400).json({
						success: false,
						error:
							"No readable text found in PDF. Please ensure your PDF contains selectable text.",
						suggestion:
							"Try converting your PDF to text format or creating a new PDF from a word processor.",
					})
				}

				console.log(
					`⚠ Continuing with limited text: ${validation.cleanedText.length} chars`
				)
			}

			const cleanText = validation.cleanedText

			// Show sample of extracted text
			const lines = cleanText
				.split("\n")
				.filter((line) => line.trim().length > 0)
			console.log(`\n--- Extracted Content ---`)
			console.log(`Clean text length: ${cleanText.length} characters`)
			console.log(`Non-empty lines: ${lines.length}`)

			if (lines.length > 0) {
				console.log(`\nSample lines:`)
				lines.slice(0, Math.min(5, lines.length)).forEach((line, i) => {
					console.log(
						`  ${i + 1}. ${line.substring(0, 80)}${
							line.length > 80 ? "..." : ""
						}`
					)
				})
			}

			// Get parameters from request
			const { jobTitle = "", locale = "en" } = req.body
			console.log(`\n--- Analysis Parameters ---`)
			console.log(`Job title: ${jobTitle || "Not specified"}`)
			console.log(`Language: ${locale}`)

			// Prepare prompts for OpenAI with language support
			console.log("\n--- Preparing AI Analysis ---")

			const systemPrompt = `You are a professional resume analyzer. Analyze the resume and provide constructive feedback.

IMPORTANT: 
1. Respond ONLY with a valid JSON object in this exact format:
{
    "score": [number between 1-100],
    "strengths": ["strength1", "strength2", "strength3"],
    "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
    "summary": "brief summary here",
    "aiFeedback": "detailed feedback here"
}

2. Provide your entire response in ${locale} language.

3. Even if the resume is brief or incomplete, provide the best analysis you can based on available content.`

			const userPrompt = `Analyze this resume${
				jobTitle ? ` for a ${jobTitle} position` : ""
			}:

RESUME CONTENT:
${cleanText}

${
	cleanText.length < 100
		? "NOTE: This is a brief resume. Please provide analysis based on the available content."
		: ""
}

Provide your analysis in ${locale} language and in the required JSON format.`

			console.log("Calling OpenAI API...")

			// Call OpenAI API
			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo", // Using 3.5-turbo for better JSON reliability
				messages: [
					{
						role: "system",
						content: systemPrompt,
					},
					{
						role: "user",
						content: userPrompt,
					},
				],
				max_tokens: 1500,
				temperature: 0.7,
			})

			console.log("✓ OpenAI response received")

			const aiResponse = response.choices[0].message.content
			console.log(`AI response length: ${aiResponse.length} characters`)
			console.log(`First 200 chars: ${aiResponse.substring(0, 200)}...`)

			// Parse the AI response
			console.log("\n--- Parsing AI Response ---")
			const analysisData = parseAIResponse(aiResponse)

			console.log(`✓ Analysis parsed successfully`)
			console.log(`Score: ${analysisData.score}/100`)
			console.log(`Strengths: ${analysisData.strengths.length} items`)
			console.log(`Suggestions: ${analysisData.suggestions.length} items`)

			// Cleanup
			cleanupFile(filePath)

			console.log("\n" + "=".repeat(50))
			console.log("ANALYSIS COMPLETE")
			console.log("=".repeat(50) + "\n")

			// Return successful response
			return res.json({
				success: true,
				analysis: analysisData,
				metadata: {
					filename: req.file.originalname,
					fileSize: req.file.size,
					textLength: cleanText.length,
					jobTitle: jobTitle || null,
					language: locale,
					extractedLines: lines.length,
					analyzedAt: new Date().toISOString(),
					note:
						cleanText.length < 100
							? "Brief resume analyzed"
							: "Standard resume analyzed",
				},
			})
		} catch (error) {
			console.error("\n" + "✗".repeat(50))
			console.error("ANALYSIS ERROR")
			console.error("✗".repeat(50))
			console.error("Error:", error.message)

			if (filePath) {
				cleanupFile(filePath)
			}

			// Handle specific error cases
			let errorMessage = error.message
			let suggestion = "Please try again with a different PDF file."

			if (error.message.includes("PDF") || error.message.includes("extract")) {
				errorMessage = "Error processing PDF file."
				suggestion =
					"Please ensure your PDF contains selectable text (not scanned images)."
			} else if (
				error.message.includes("API key") ||
				error.message.includes("OpenAI")
			) {
				errorMessage = "AI service configuration error."
				suggestion = "Please check your OpenAI API key configuration."
			}

			return res.status(500).json({
				success: false,
				error: errorMessage,
				suggestion: suggestion,
			})
		}
	}
)

module.exports = router
