const router = require("express").Router()
const OpenAI = require("openai")
const defaultSkillPool = require("../utils/defaultSkills")
const { authenticateToken } = require("../middlewares/auth")

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Helper: Generate random fallback skills
 */
const getRandomSkills = (count) => {
	const shuffled = [...defaultSkillPool].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count)
}

router.post("/generate-skills", authenticateToken, async (req, res) => {
	try {
		const { jobTitle, langPrefix } = req.body

		if (jobTitle && typeof jobTitle !== "string") {
			return res.status(400).json({ error: "Invalid job title format" })
		}

		if (jobTitle) {
			console.log("AI generating skills...")

			const systemPrompt = `
				You are an AI assistant specialized in human resources.
				Your task is to generate short, professional skill lists
				relevant to a given job title for use in resumes.
				Do not accept requests outside this context.
				Never provide explanations, code, or text beyond the JSON output.
				Always respond with a valid JSON object.
			`

			const userPrompt = `
				Generate a unique list of 6 skills relevant to the job title: "${jobTitle}".
				These skills will be used in a resume.
				Ensure the list is different on each request, even for the same job title.
				Use synonyms or variations where appropriate.
				Return the response in the language identified by: ${langPrefix}.
				Expected format:
				{
					"skills": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6"]
				}
			`

			const response = await openai.chat.completions.create({
				model: "gpt-4o",
				messages: [
					{ role: "system", content: systemPrompt.trim() },
					{ role: "user", content: userPrompt.trim() },
				],
				response_format: { type: "json_object" },
				max_tokens: 400,
				temperature: 0.8,
			})

			let resumeData
			try {
				resumeData = JSON.parse(response.choices[0].message.content)
			} catch (parseError) {
				console.error("Error parsing AI response:", parseError)
				return res.status(500).json({ error: "Invalid AI response format" })
			}

			return res.json({ resume: resumeData })
		} else {
			console.log("Sending randomized default skills...")
			return res.json({ resume: { skills: getRandomSkills(6) } })
		}
	} catch (error) {
		console.error("Error generating skills:", error)
		return res.status(500).json({ error: "Error generating skills" })
	}
})

router.post("/generate-objective", authenticateToken, async (req, res) => {
	console.log("Generating objective...")

	try {
		const { jobTitle, skills, objective, langPrefix } = req.body

		if (!jobTitle || !skills || !objective) {
			return res.status(400).json({ error: "Missing required fields" })
		}

		const systemPrompt = `
			You are an AI assistant specialized in professional resume writing.
			Your task is to write concise, well-structured summaries (under 100 words)
			and generate relevant keywords for a specific job title.
			Do not accept requests outside this context (e.g., code, jokes, or unrelated topics).
			Always respond with a valid JSON object.
			Never include any text outside the JSON.
		`

		const userPrompt = `
			Write a professional resume summary (maximum 100 words) for the job title: "${jobTitle}".
			Use the following skills: ${Array.isArray(skills) ? skills.join(", ") : skills}.
			Also consider this experience or description: ${objective}.
			
			Additionally, generate 6 keywords related to the job title "${jobTitle}"
			that can be used as tags or highlights in the resume.
			
			Return the response in the language corresponding to: ${langPrefix}.
			
			Expected JSON format:
			{
				"objective": "brief professional summary text",
				"skills": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"]
			}
		`

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{ role: "system", content: systemPrompt.trim() },
				{ role: "user", content: userPrompt.trim() },
			],
			response_format: { type: "json_object" },
			max_tokens: 500,
			temperature: 0.7,
		})

		let resumeData
		try {
			resumeData = JSON.parse(response.choices[0].message.content)
		} catch (parseError) {
			console.error("Error parsing AI response:", parseError)
			return res.status(500).json({ error: "Invalid AI response format" })
		}

		return res.json({ resume: resumeData })
	} catch (error) {
		console.error("Error generating objective:", error)
		return res.status(500).json({ error: "Error generating objective" })
	}
})

module.exports = router
