import { Packer } from "docx"
import { renderToStream } from "@react-pdf/renderer"
import { ClassicTemplateATS } from "@/components/Templates/PDFTemplates/ClassicTemplateATS"
import { generateClassicDocx } from "@/components/Templates/DocxTemplates/ClassicTemplateATS"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" })
	}

	const { format } = req.query
	const resumeData = req.body?.resume

	if (!resumeData || typeof resumeData !== "object") {
		return res.status(400).json({ error: "Invalid resume data" })
	}

	const { template } = resumeData
	if (!template) {
		return res.status(400).json({ error: "Template selection is required" })
	}

	try {
		if (format === "pdf") {
			if (template === "classic-ats") {
				const pdfStream = await renderToStream(
					<ClassicTemplateATS resumeData={resumeData} />
				)
				res.setHeader("Content-Type", "application/pdf")
				res.setHeader(
					"Content-Disposition",
					'attachment; filename="resume.pdf"'
				)
				console.log(resumeData)
				return pdfStream.pipe(res)
			} else {
				return res
					.status(400)
					.json({ error: "Invalid template selection for PDF" })
			}
		} else if (format === "docx") {
			let doc
			if (template === "classic-ats") {
				doc = generateClassicDocx(resumeData)
			} else {
				return res
					.status(400)
					.json({ error: "Invalid template selection for DOCX" })
			}

			const buffer = await Packer.toBuffer(doc)
			res.setHeader(
				"Content-Type",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			)
			res.setHeader("Content-Disposition", 'attachment; filename="resume.docx"')

			res.end(Buffer.from(buffer))
		} else {
			return res.status(400).json({ error: "Invalid format" })
		}
	} catch (error) {
		console.error(`Error generating ${format} file:`, error)
		res
			.status(500)
			.json({ error: `Error generating ${format} file: ${error.message}` })
	}
}
