import { Packer } from "docx"
import { renderToStream } from "@react-pdf/renderer"
import type { NextApiRequest, NextApiResponse } from "next"
import React from "react"

import { ClassicTemplateATS } from "@/components/Templates/PDFTemplates/ClassicTemplateATS"
import { generateClassicDocx } from "@/components/Templates/DocxTemplates/ClassicTemplateATS"
import type { ResumeExportData } from "@/types/resume"

type DownloadRequestBody = {
	resume: Record<string, unknown>
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" })
	}

	const { format } = req.query
	const body = req.body as Partial<DownloadRequestBody> | undefined
	const resumeData = body?.resume as Record<string, unknown> | undefined
	const typedResumeData = resumeData as unknown as ResumeExportData | undefined

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
				if (!typedResumeData) {
					return res.status(400).json({ error: "Invalid resume data" })
				}
				const pdfProps = {
					resumeData: typedResumeData,
					photo: typedResumeData.photo,
				}
				const pdfElement = React.createElement(ClassicTemplateATS, pdfProps)
				const pdfStream = await renderToStream(pdfElement)
				res.setHeader("Content-Type", "application/pdf")
				res.setHeader(
					"Content-Disposition",
					'attachment; filename="resume.pdf"'
				)
				console.log("Resume PDF Data", resumeData)
				return pdfStream.pipe(res)
			} else {
				return res
					.status(400)
					.json({ error: "Invalid template selection for PDF" })
			}
		} else if (format === "docx") {
			let doc
			if (template === "classic-ats") {
				if (!typedResumeData) {
					return res.status(400).json({ error: "Invalid resume data" })
				}
				doc = generateClassicDocx(typedResumeData)
			} else {
				return res
					.status(400)
					.json({ error: "Invalid template selection for DOCX" })
			}

			// try {
			// 	await saveResumeToDatabase(
			// 		userId,
			// 		fileName,
			// 		fileBuffer,
			// 		resumeData,
			// 		format as string,
			// 		template
			// 	)
			// } catch (saveError) {
			// 	console.error("Error saving resume to database:", saveError)
			// 	// No fallar la respuesta principal si hay error al guardar
			// }

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
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "Unexpected error generating file"
		console.error(`Error generating ${format} file:`, error)
		res
			.status(500)
			.json({ error: `Error generating ${format} file: ${message}` })
	}
}
