import React, {
	useState,
	useRef,
	useLayoutEffect,
	useEffect,
	useContext,
} from "react"
import { FaDownload } from "react-icons/fa"
import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import MainTemplate from "./Templates/MainTemplateATS"
import ReactDOMServer from "react-dom/server"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import useResumeStore from "@/store/useResumeStore"
import {
	CERTIFICATIONS,
	CONTACT_INFORMATION,
	CUSTOM_SECTION,
	EDUCATION,
	EMPLOYMENT_HISTORY,
	HOBBIES,
	LANGUAGES,
	LINKS,
	PERSONAL_DETAILS,
	PROFESSIONAL_SUMMARY,
	REFERENCES,
	SKILLS,
} from "@/constants"
import StandardATSSectionMap from "./TemplateSections/StandardATSSections"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import { TfiReload } from "react-icons/tfi"

export default function ResumePreview({
	generatedResume,
	email,
	phone,
	address,
	cityPostCode,
	firstName,
	lastName,
	skills,
	experience,
	objective,
	jobTitle,
	tabs,
	certifications,
	educations,
	references,
	links,
	hobbies,
	customSections,
	photo,
	template,
	languages,
	// handleDownloadPDF, // Old method
}) {
	const [downloadInProgress, setDownloadInProgress] = useState(false)
	const [pages, setPages] = useState([])
	const { customTitles, apiBaseUrl } = useResumeStore()
	const resumeRef = useRef(null)
	const videoRef = useRef(null)
	const { resumeContentTriggered, setResumeContentTriggered } =
		useContext(RESUME_CONTEXT)
	const letterSizeHeight = 850

	const router = useRouter()
	const t = loadTranslations(router)
	const { locale } = router
	const langPrefix = locale

	const commonProps = {
		resumeRef,
		resume: generatedResume,
		photo,
		firstName,
		lastName,
		jobTitle,
		email,
		phone,
		address,
		cityPostCode,
		experience,
		orderedTabs: tabs,
		certifications,
		educations,
		references,
		links,
		hobbies,
		customSections,
		languages,
		objective,
		skills,
		customTitles,
		t,
		pages,
	}

	const resumeData = {
		photo,
		firstName,
		lastName,
		jobTitle,
		email,
		phone,
		address,
		cityPostCode,
		objective,
		skills,
		experience,
		certifications,
		educations,
		references,
		links,
		hobbies,
		customSections,
		languages,
	}

	useEffect(() => {
		const refreshContent = async () => {
			await paginateContent()
		}
		// Always refresh content when resumeContentTriggered changes
		if (resumeContentTriggered) {
			refreshContent()
			// Reset the trigger after refreshing
			setResumeContentTriggered(false)
		}
	}, [resumeContentTriggered, template])

	useLayoutEffect(() => {
		// Initial content setup
		if (pages.length === 0) {
			paginateContent()
		}
	}, [])

	useLayoutEffect(() => {
		setPages([[...tabs.map((tab, i) => <div key={i}>{sectionMap[tab]}</div>)]])
	}, [tabs, resumeContentTriggered])

	useLayoutEffect(() => {
		if (pages.length === 0) {
			setPages([
				[...tabs.map((tab, i) => <div key={i}>{sectionMap[tab]}</div>)],
			])
		}
	}, [
		photo,
		pages,
		firstName,
		lastName,
		jobTitle,
		email,
		phone,
		address,
		cityPostCode,
		objective,
		skills,
		tabs,
	])

	useEffect(() => {
		requestAnimationFrame(() => {
			paginateContent()
		})
	}, [tabs])

	const paginateContent = async () => {
		return new Promise((resolve) => {
			const content = resumeRef.current
			if (!content) return resolve()

			const newPages = []
			let currentPage = []
			let currentHeight = 0

			tabs.forEach((tab) => {
				const section = sectionRefs[tab].current
				if (!section) return

				const sectionHeight = section.offsetHeight || 0

				if (currentHeight + sectionHeight > letterSizeHeight) {
					newPages.push(currentPage)
					currentPage = []
					currentHeight = 0
				}

				currentPage.push(
					React.cloneElement(sectionMap[tab], { key: tab + newPages.length })
				)
				currentHeight += sectionHeight
			})

			if (currentPage.length) {
				newPages.push(currentPage)
			}

			if (newPages.length === 0) {
				newPages.push([])
			}

			setPages(newPages)

			// ✅ Resolve after state update
			resolve()
		})
	}

	useEffect(() => {
		paginateContent()
	}, [
		t,
		photo,
		firstName,
		lastName,
		jobTitle,
		email,
		phone,
		address,
		cityPostCode,
		objective,
		tabs,
		experience,
		skills,
		certifications,
		educations,
		references,
		links,
		hobbies,
		customSections,
		languages,
		customTitles,
	])

	const sectionRefs = {
		[PERSONAL_DETAILS]: useRef(null),
		[CONTACT_INFORMATION]: useRef(null),
		[PROFESSIONAL_SUMMARY]: useRef(null),
		[EMPLOYMENT_HISTORY]: useRef(null),
		[EDUCATION]: useRef(null),
		[SKILLS]: useRef(null),
		[CERTIFICATIONS]: useRef(null),
		[REFERENCES]: useRef(null),
		[LINKS]: useRef(null),
		[LANGUAGES]: useRef(null),
		[HOBBIES]: useRef(null),
		[CUSTOM_SECTION]: useRef(null),
	}

	const bgStyle =
		template === "elegant"
			? `
				.elegant-template {
					background: url('${process.env.NEXT_PUBLIC_FRONTEND_SERVER}/images/template-bg-1.png') no-repeat center center !important;
					background-size: cover !important;
					-webkit-print-color-adjust: exact;
					print-color-adjust: exact;
				}
			`
			: ""

	const handleDownload = async () => {
		setDownloadInProgress(true)
		await paginateContent()
		let selectedTemplate
		switch (template) {
			case "classic-ats":
				selectedTemplate = <MainTemplate {...commonProps} isPdf />
				break
			case "modern":
				selectedTemplate = <ModernTemplate {...commonProps} />
				break
			case "elegant":
				selectedTemplate = (
					<MainTemplate
						template={template}
						bg="/images/template-bg-1.png"
						{...commonProps}
					/>
				)
				break
			default:
				selectedTemplate = <MainTemplate {...commonProps} isPdf />
				break
		}

		const htmlContent = `
			<!DOCTYPE html>
			<html lang="${langPrefix}">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Resume</title>
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
				<link rel="stylesheet" href="http://localhost:3000/tailwind.css">
				<link rel="stylesheet" href="http://localhost:3000/styles/globals.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.min.css">
			
				<!-- Add a font that supports Chinese characters -->
				<style>
					body {
						font-family: "Inter", system-ui, Arial, Helvetica, sans-serif;
					}
			
					/* Apply Chinese fonts only to Chinese characters */
					@font-face {
						font-family: 'Noto Sans CJK SC';
						src: url('https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk/NotoSansSC-Regular.otf') format('opentype');
					}
			
					:lang(${langPrefix}) {
						font-family: "Noto Sans CJK SC", "Inter", system-ui, Arial, Helvetica, sans-serif;
					}

					${bgStyle}
				</style>
			</head>
			<body>
				${ReactDOMServer.renderToString(selectedTemplate)}
			</body>
		</html>`

		try {
			const response = await fetch(`${apiBaseUrl}/generate-pdf`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ html: htmlContent, firstName }),
			})

			if (!response.ok) {
				setDownloadInProgress(false)
				throw new Error("Failed to generate PDF")
			}

			// Convert response to an ArrayBuffer (to avoid data corruption)
			const arrayBuffer = await response.arrayBuffer()
			const blob = new Blob([arrayBuffer], { type: "application/pdf" })

			// Create a temporary URL for the PDF
			const url = window.URL.createObjectURL(blob)

			// Create a hidden download link and click it
			const a = document.createElement("a")
			a.href = url
			a.download = `${firstName}_resume.pdf`
			document.body.appendChild(a)
			a.click()

			// Cleanup
			document.body.removeChild(a)
			window.URL.revokeObjectURL(url)
			setDownloadInProgress(false)
		} catch (error) {
			setDownloadInProgress(false)
			console.error("Error:", error)
		}
	}

	const sectionMap =
		template === "classic-ats"
			? StandardATSSectionMap({
					sectionRefs,
					t,
					customTitles,
					resumeData,
					generatedResume,
					template,
			  })
			: StandardATSSectionMap({
					sectionRefs,
					t,
					customTitles,
					resumeData,
					generatedResume,
					template,
			  })

	return (
		<div className="relative border ring-4 ring-gray-50 p-2 bg-gray-200 rounded-md overflow-hidden">
			<video
				ref={videoRef}
				autoPlay
				loop
				muted
				playsInline
				className="absolute top-0 left-0 w-full h-full object-cover z-0 smooth-video"
			>
				<source src="/videos/bg_ai_office.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="relative z-10">
				<div className="flex download-section justify-between items-center">
					<button
						className="bg-cyan-500 text-white font-bold p-3 rounded-md text-lg"
						onClick={() => {
							window.location.reload()
						}}
					>
						<TfiReload className="inline mr-2" />
						Synchronize Content
					</button>
					<span className="text-white font-extrabold ml-6 text-xl capitalize">
						{
							t.resume_builder.labels.general.template_selector
								.selected_template
						}
						: {template}
					</span>
					<button
						disabled={downloadInProgress}
						className="bg-cyan-500 text-white font-bold p-3 rounded-md text-lg"
						onClick={() => handleDownload()}
					>
						<FaDownload className="inline mr-2" />
						{t.resume_builder.labels.general.template_selector.download}
					</button>
					{/* <button onClick={() => handleDownloadPDF("docx")}>
					Download as DOCX
				</button> */}
				</div>
				<div className="rounded py-8">
					{template === "classic" && <ClassicTemplate {...commonProps} />}
					{template === "classic-ats" && <MainTemplate {...commonProps} />}
					{template === "elegant" && (
						<MainTemplate bg="/images/template-bg-1.png" {...commonProps} />
					)}
					{template === "modern" && <ModernTemplate {...commonProps} />}
					{template === "creative" && <CreativeTemplate {...commonProps} />}
				</div>
			</div>
		</div>
	)
}
