const router = require("express").Router()
const axios = require("axios")
const OpenAI = require("openai")
const defaultSkillPool = require("../utils/defaultSkills")

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

router.post("/generate-skills", async (req, res) => {
	try {
		const { jobTitle, langPrefix } = req.body
		let response

		const getRandomSkills = (count) => {
			const shuffled = [...defaultSkillPool].sort(() => Math.random() - 0.5)
			return shuffled.slice(0, count)
		}

		if (jobTitle) {
			console.log("AI generation...")
			response = await openai.chat.completions.create({
				model: "gpt-4o",
				messages: [
					{
						role: "user",
						content: `Generate a unique list of 6 skills relevant to the job title "${jobTitle}". These skills will be used in a resume. Ensure the list is different on each request, even if the job title is the same. Use synonyms or variations if needed. Format the response as JSON with the key: "skills". Provide the response in the language identifier: ${langPrefix}.`,
					},
				],
				response_format: { type: "json_object" },
			})
		} else {
			console.log("Sending randomized default skills...")
			response = {
				skills: getRandomSkills(6), // Get a random set of 6 skills
			}
		}

		console.log(response)

		// Parse AI response if jobTitle is provided
		const resumeData = jobTitle
			? JSON.parse(response.choices[0].message.content)
			: response

		res.json({ resume: resumeData })
	} catch (error) {
		console.error("Error generating skills:", error)
		res.status(500).json({ error: "Error generating skills" })
	}
})

router.post("/generate-objective", async (req, res) => {
	console.log("Generating objective...")

	try {
		const { jobTitle, skills, objective, langPrefix } = req.body

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: `Generate a summary for a resume, with no more than 100 words, using this job title and skills: ${skills}, and this experience: ${objective}. In addition, generate 6 separate words related to this job title: ${jobTitle}, which will be used on the resume as well. Format the response as JSON with these keys: "objective" and "skills" accordingly. Provide the response in the following language identifier: ${langPrefix}`,
				},
			],
			response_format: { type: "json_object" },
		})

		console.log(response)

		const resumeData = JSON.parse(response.choices[0].message.content)

		res.json({ resume: resumeData })
	} catch (error) {
		console.error("Error generating objective:", error)
		res.status(500).json({ error: "Error generating objective" })
	}

	// Uncomment if you need to use DeepSeek API via OpenRouter
	/*
	try {
		const requestData = {
			model: "deepseek/deepseek-r1:free",
			messages: [
				{
					role: "user",
					content: `Generate a professional resume for ${name}, who is applying for a ${jobTitle} position. Skills: ${skills}. Experience: ${experience}.`,
				},
			],
			max_tokens: 4000,
		};

		const response = await axios.post(
			"https://openrouter.ai/api/v1/chat/completions",
			requestData,
			{
				headers: {
					Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
					"HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
					"X-Title": process.env.SITE_NAME || "My Resume Generator",
					"Content-Type": "application/json",
				},
			}
		);

		const resume = response.data.choices[0].message.content;
		res.json({ resume });
	} catch (error) {
		console.error("Error generating resume:", error.response?.data || error.message);
		res.status(500).json({ error: "Error generating resume" });
	}
	*/
})

module.exports = router
