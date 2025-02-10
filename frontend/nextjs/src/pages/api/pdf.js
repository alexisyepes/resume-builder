import { renderToStream } from "@react-pdf/renderer"
import { ClassicTemplateATS } from "@/components/Templates/PDFTemplates/ClassicTemplateATS"
import { CreativeTemplateATS } from "@/components/Templates/PDFTemplates/CreativeTemplateATS"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" })
	}

	res.setHeader("Content-Type", "application/pdf")

	const resume = req.body.resume
	const template = req.body.resume.template
	let templateToUse
	if (template === "1") {
		templateToUse = <ClassicTemplateATS resumeData={resume} />
	}
	if (template === "2") {
		templateToUse = <CreativeTemplateATS resumeData={resume} />
	}
	const stream = await renderToStream(templateToUse)
	stream.pipe(res)
}
