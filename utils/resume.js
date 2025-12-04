const { Template } = require("../models/Template")

async function saveResumeToDatabase(
	userId,
	fileName,
	fileBuffer,
	resumeData,
	format,
	templateName
) {
	try {
		const template = Template.findOne({
			where: { name: templateName },
			attributes: ["id"],
		})

		if (!template) {
			throw new Error(`Template ${templateName} not found`)
		}

		const resumeResponse = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/resumes/create-with-template`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					title: `${resumeData.firstName || "Resume"}_${
						resumeData.jobTitle || ""
					}_${new Date().toISOString().split("T")[0]}`,
					fileName,
					fileFormat: format,
					fileSize: fileBuffer.length,
					jobTitle: resumeData.jobTitle,
					firstName: resumeData.firstName,
					lastName: resumeData.lastName,
					resumeData: resumeData,
					templateId: template.id,
				}),
			}
		)

		if (!resumeResponse.ok) {
			throw new Error(`Failed to save resume: ${resumeResponse.statusText}`)
		}

		return await resumeResponse.json()
	} catch (error) {
		console.error("Error in saveResumeToDatabase:", error)
		throw error
	}
}

module.exports = { saveResumeToDatabase }
