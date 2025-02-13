import { renderToStream } from "@react-pdf/renderer"
import { ClassicTemplateATS } from "@/components/Templates/PDFTemplates/ClassicTemplateATS"
import { CreativeTemplateATS } from "@/components/Templates/PDFTemplates/CreativeTemplateATS"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" })
	}

	const resumeData = req.body?.resume

	if (!resumeData || typeof resumeData !== "object") {
		return res.status(400).json({ error: "Invalid resume data" })
	}

	const resume = Object.entries(resumeData).reduce((acc, [key, value]) => {
		if (value != null && value !== "") {
			acc[key] = value
		}
		return acc
	}, {})

	const { template } = resume

	if (!template) {
		return res.status(400).json({ error: "Template selection is required" })
	}

	console.log(resume)

	let templateToUse
	if (template === "1") {
		templateToUse = <ClassicTemplateATS resumeData={resume} />
	} else if (template === "2") {
		templateToUse = <CreativeTemplateATS resumeData={resume} />
	} else {
		return res.status(400).json({ error: "Invalid template selection" })
	}

	try {
		const stream = await renderToStream(templateToUse)

		// Set headers for file download
		res.setHeader("Content-Type", "application/pdf")
		res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"')

		stream.pipe(res)
	} catch (error) {
		console.error("PDF Generation Error:", error)
		res.status(500).json({ error: "Error generating PDF" })
	}
}
