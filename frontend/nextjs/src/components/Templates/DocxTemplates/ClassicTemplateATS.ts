import {
	CERTIFICATIONS,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
	LANGUAGES,
	LINKS,
	REFERENCES,
	SKILLS,
} from "@/constants"
import {
	Document,
	Paragraph,
	TextRun,
	HeadingLevel,
	AlignmentType,
	BorderStyle,
} from "docx"

import type { ResumeExportData } from "@/types/resume"

export function generateClassicDocx(resumeData: ResumeExportData) {
	console.log(resumeData)

	function createHeader(text: string): Paragraph {
		return new Paragraph({
			children: [
				new TextRun({
					text,
					bold: true,
					size: 28,
					color: "3684f7", // Black text
				}),
			],
			heading: HeadingLevel.HEADING_2,
			alignment: AlignmentType.LEFT,
			spacing: {
				after: 200,
			},
			border: {
				bottom: {
					style: BorderStyle.DOUBLE,
					size: 6,
					color: "3684f7",
				},
			},
		})
	}

	const sectionMap: Record<string, Paragraph[]> = {
		[EMPLOYMENT_HISTORY]: [
			createHeader("Employment History"),
			...resumeData.experience.map(
				(exp) =>
					new Paragraph({
						children: [
							new TextRun({
								text: `${exp.company} - ${exp.role} (${exp.year})`,
								color: "000000",
							}),
						],
					})
			),
		],

		[EDUCATION]:
			resumeData.educations?.length > 0
				? [
						createHeader(EDUCATION),
						...resumeData.educations.map(
							(edu) =>
								new Paragraph({
									children: [
										new TextRun({
											text: `${edu.degree} - ${edu.institution} (${edu.year})`,
											color: "000000",
										}),
									],
								})
						),
				  ]
				: [],

		[SKILLS]: [
			createHeader("Skills"),
			new Paragraph({
				children: [
					new TextRun({
						text: resumeData.skills.length
							? `${resumeData.skills.join(", ")}.`
							: "N/A",
						color: "000000",
					}),
				],
			}),
		],

		[CERTIFICATIONS]: [
			createHeader("Certifications"),
			...resumeData.certifications.map(
				(cert) =>
					new Paragraph({
						children: [
							new TextRun({
								text: `${cert.certificationName} - ${cert.institution} (${cert.year})`,
								color: "000000",
							}),
						],
					})
			),
		],

		[LINKS]: [
			createHeader("Links"),
			...resumeData.links.map(
				(link) =>
					new Paragraph({
						children: [
							new TextRun({
								text: `${link.name}: ${link.link}`,
								color: "000000",
							}),
						],
						bullet: {
							level: 0,
						},
					})
			),
		],

		[HOBBIES]: [
			createHeader("Hobbies"),
			new Paragraph({
				children: [
					new TextRun({
						text: resumeData.hobbies.length
							? resumeData.hobbies.map((hobby) => hobby.hobbies).join(", ")
							: "N/A",
						color: "000000",
					}),
				],
			}),
		],

		[LANGUAGES]: [
			createHeader("Languages"),
			new Paragraph({
				children: [
					new TextRun({
						text: resumeData.languages.length
							? resumeData.languages
									.map((lang) => `${lang.language}${lang.proficiency ? ` (${lang.proficiency})` : ""}`)
									.join(", ")
							: "N/A",
						color: "000000",
					}),
				],
			}),
		],

		[REFERENCES]: [
			createHeader("References"),
			...resumeData.references.map(
				(ref) =>
					new Paragraph({
						children: [
							new TextRun({
								text: `${ref.name}, ${ref.company} - ${ref.email_phone}`,
								color: "000000",
							}),
						],
					})
			),
		],
	}

	const orderedSections = resumeData.orderedTabs.flatMap(
		(tab) => sectionMap[tab] || []
	)

	return new Document({
		sections: [
			{
				properties: {
					page: {
						size: {
							width: 12240, // 8.5 inches in Twip units (8.5 * 1440)
							height: 15840, // 11 inches in Twip units (11 * 1440)
						},
						margin: {
							top: 500,
							right: 500,
							bottom: 500,
							left: 500,
						},
					},
				},
				children: [
					// Header: Name, Job Title, Contact Info
					new Paragraph({
						children: [
							new TextRun({
								text: `${resumeData.firstName || ""} ${
									resumeData.lastName || ""
								}`,
								bold: true,
								size: 36,
								color: "000000",
							}),
						],
						alignment: AlignmentType.CENTER,
					}),
					new Paragraph({
						children: [
							new TextRun({
								text: resumeData.jobTitle || "",
								bold: true,
								size: 28,
								color: "000000",
							}),
						],
						alignment: AlignmentType.CENTER,
					}),
					new Paragraph({
						children: [
							...(resumeData.email
								? [
										new TextRun({
											text: resumeData.email,
											color: "000000",
										}),
								  ]
								: []),
							...(resumeData.email && resumeData.phone
								? [
										new TextRun({
											text: " | ",
											color: "000000",
										}),
								  ]
								: []),
							...(resumeData.phone
								? [
										new TextRun({
											text: resumeData.phone,
											color: "000000",
										}),
								  ]
								: []),
						],
						alignment: AlignmentType.CENTER,
					}),
					new Paragraph({
						children: [
							...(resumeData.address
								? [
										new TextRun({
											text: resumeData.address,
											color: "000000",
										}),
								  ]
								: []),
							...(resumeData.address && resumeData.cityPostCode
								? [
										new TextRun({
											text: ", ",
											color: "000000",
										}),
								  ]
								: []),
							...(resumeData.cityPostCode
								? [
										new TextRun({
											text: resumeData.cityPostCode,
											color: "000000",
										}),
								  ]
								: []),
						],
						alignment: AlignmentType.CENTER,
					}),

					// Summary
					...(resumeData.objective
						? [
								createHeader("Professional Summary"),
								new Paragraph({
									children: [
										new TextRun({
											text: resumeData.objective.replace(/<[^>]+>/g, ""),
											size: 24,
											color: "000000",
										}),
									],
								}),
						  ]
						: []),
					...orderedSections,
				],
			},
		],
	})
}
