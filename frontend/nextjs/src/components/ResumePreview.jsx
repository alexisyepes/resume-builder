import React, { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { FaDownload, FaSpinner } from "react-icons/fa"
import { TfiReload } from "react-icons/tfi"
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
import MinimalistTemplate from "./Templates/MinimalistTemplate"
import TEMPLATE_STYLES from "./Templates/TemplateStyles"

// Constants
const LETTER_SIZE_HEIGHT = 850

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
	tabs = [],
	certifications,
	educations,
	references,
	links,
	hobbies,
	customSections,
	photo,
	languages,
}) {
	const [downloadInProgress, setDownloadInProgress] = useState(false)
	const [pages, setPages] = useState([])
	const [templateKey, setTemplateKey] = useState(0)
	const { customTitles, apiBaseUrl, template } = useResumeStore()
	const resumeRef = useRef(null)

	// Section refs
	const personalDetailsRef = useRef(null)
	const contactInformationRef = useRef(null)
	const professionalSummaryRef = useRef(null)
	const employmentHistoryRef = useRef(null)
	const educationRef = useRef(null)
	const skillsRef = useRef(null)
	const certificationsRef = useRef(null)
	const referencesRef = useRef(null)
	const linksRef = useRef(null)
	const languagesRef = useRef(null)
	const hobbiesRef = useRef(null)
	const customSectionRef = useRef(null)

	const router = useRouter()
	const t = loadTranslations(router)
	const { locale } = router
	const langPrefix = locale

	// Memoized resume data
	const resumeData = useMemo(
		() => ({
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
		}),
		[
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
		]
	)

	// Section refs object
	const sectionRefs = useMemo(
		() => ({
			[PERSONAL_DETAILS]: personalDetailsRef,
			[CONTACT_INFORMATION]: contactInformationRef,
			[PROFESSIONAL_SUMMARY]: professionalSummaryRef,
			[EMPLOYMENT_HISTORY]: employmentHistoryRef,
			[EDUCATION]: educationRef,
			[SKILLS]: skillsRef,
			[CERTIFICATIONS]: certificationsRef,
			[REFERENCES]: referencesRef,
			[LINKS]: linksRef,
			[LANGUAGES]: languagesRef,
			[HOBBIES]: hobbiesRef,
			[CUSTOM_SECTION]: customSectionRef,
		}),
		[]
	)

	// Section map with memoization
	const sectionMap = useMemo(() => {
		try {
			const map = StandardATSSectionMap({
				sectionRefs,
				t,
				customTitles,
				resumeData,
				generatedResume,
				template,
			})
			return map || {}
		} catch (error) {
			console.error("Error creating section map:", error)
			return {}
		}
	}, [sectionRefs, t, customTitles, resumeData, generatedResume, template])

	// Common props with memoization
	const commonProps = useMemo(
		() => ({
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
			template,
		}),
		[
			generatedResume,
			photo,
			firstName,
			lastName,
			jobTitle,
			email,
			phone,
			address,
			cityPostCode,
			experience,
			tabs,
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
			template,
		]
	)

	// Pagination function
	const paginateContent = useCallback(() => {
		return new Promise((resolve) => {
			const content = resumeRef.current
			if (!content) {
				return resolve()
			}

			const newPages = []
			let currentPage = []
			let currentHeight = 0

			const safeTabs = Array.isArray(tabs) ? tabs : []

			safeTabs.forEach((tab) => {
				const section = sectionRefs[tab]?.current
				if (!section) return

				const sectionHeight = section.offsetHeight || 0

				console.log(
					`Section: ${tab}, Height: ${sectionHeight}, Current Page Height: ${currentHeight}`
				)

				if (currentHeight + sectionHeight > LETTER_SIZE_HEIGHT) {
					newPages.push(currentPage)
					currentPage = []
					currentHeight = 0
				}

				const sectionElement = sectionMap[tab]
				if (sectionElement && React.isValidElement(sectionElement)) {
					currentPage.push(
						React.cloneElement(sectionElement, {
							key: `${tab}-${newPages.length}`,
						})
					)
					currentHeight += sectionHeight
				}
			})

			if (currentPage.length > 0) {
				newPages.push(currentPage)
			}

			setPages(newPages.length > 0 ? newPages : [[]])
			resolve()
		})
	}, [tabs, sectionRefs, sectionMap])

	useEffect(() => {
		let isMounted = true
		let timeoutId

		const initializeContent = async () => {
			if (!isMounted) return

			// Build initial pages
			if (Array.isArray(tabs) && tabs.length > 0) {
				const initialPages = tabs
					.map((tab, i) => {
						const sectionElement = sectionMap[tab]
						return sectionElement ? <div key={i}>{sectionElement}</div> : null
					})
					.filter(Boolean)

				if (isMounted && initialPages.length > 0) {
					setPages([initialPages])
				}
			}

			// Paginate after a short delay
			timeoutId = setTimeout(() => {
				if (isMounted) {
					paginateContent()
				}
			}, 300)
		}

		initializeContent()

		return () => {
			isMounted = false
			clearTimeout(timeoutId)
		}
	}, [tabs, sectionMap, paginateContent, template])

	// Effect for template change
	useEffect(() => {
		setTemplateKey((prev) => prev + 1)
	}, [template])

	// Template selection
	const getSelectedTemplate = useCallback(
		(isPdf = false) => {
			const templateProps = isPdf
				? { ...commonProps, isPdf, template }
				: { ...commonProps, template }

			switch (template) {
				case "classic-ats":
					return <MainTemplate key={templateKey} {...templateProps} />
				case "modern":
					return <ModernTemplate key={templateKey} {...templateProps} />
				case "elegant":
					return (
						<MainTemplate
							key={templateKey}
							bg="/images/template-bg-1.png"
							{...templateProps}
						/>
					)
				case "minimalist":
					return <MinimalistTemplate key={templateKey} {...templateProps} />
				case "classic":
					return <ClassicTemplate key={templateKey} {...templateProps} />
				case "creative":
					return <CreativeTemplate key={templateKey} {...templateProps} />
				default:
					return <MainTemplate key={templateKey} {...templateProps} />
			}
		},
		[template, commonProps, templateKey]
	)

	// Download handler
	const handleDownload = useCallback(async () => {
		if (downloadInProgress) return

		setDownloadInProgress(true)
		await paginateContent()

		const baseUrl =
			process.env.NEXT_PUBLIC_FRONTEND_SERVER || "http://localhost:3000"
		const selectedTemplate = getSelectedTemplate(true)
		const bgStyle = TEMPLATE_STYLES[template] || ""

		const htmlContent = `
			<!DOCTYPE html>
			<html lang="${langPrefix}">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Resume - ${firstName}</title>
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
				<link rel="stylesheet" href="${baseUrl}/tailwind.css">
				<link rel="stylesheet" href="${baseUrl}/styles/globals.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.min.css">
				
				<style>
					body { font-family: "Inter", system-ui, Arial, Helvetica, sans-serif; }
					
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
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ html: htmlContent, firstName }),
			})

			if (!response.ok) throw new Error("Failed to generate PDF")

			const arrayBuffer = await response.arrayBuffer()
			const blob = new Blob([arrayBuffer], { type: "application/pdf" })
			const url = window.URL.createObjectURL(blob)

			const a = document.createElement("a")
			a.href = url
			a.download = `${firstName}_resume.pdf`
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error("Error generating PDF:", error)
		} finally {
			setDownloadInProgress(false)
		}
	}, [
		downloadInProgress,
		paginateContent,
		getSelectedTemplate,
		template,
		langPrefix,
		firstName,
		apiBaseUrl,
	])

	// Refresh handler
	const handleRefreshContent = useCallback(async () => {
		console.log("🔄 Manual refresh triggered")
		await paginateContent()
	}, [paginateContent])

	// UI helpers
	const renderDownloadButton = () => (
		<button
			disabled={downloadInProgress}
			className={`flex items-center justify-center gap-2 font-bold px-4 py-2 rounded-md text-lg transition-all ${
				downloadInProgress
					? "bg-gray-400 cursor-not-allowed"
					: "bg-cyan-500 hover:bg-cyan-600 text-white"
			}`}
			onClick={handleDownload}
		>
			{downloadInProgress ? (
				<>
					<FaSpinner className="inline animate-spin" />
					{t.resume_builder.labels.general.template_selector.downloading}
				</>
			) : (
				<>
					<FaDownload className="inline" />
					{t.resume_builder.labels.general.template_selector.download}
				</>
			)}
		</button>
	)

	const renderRefreshButton = () => (
		<button
			className="bg-cyan-500 text-white font-bold px-2 rounded-md text-lg hover:bg-cyan-600 transition-colors"
			onClick={handleRefreshContent}
		>
			<TfiReload className="inline mr-2" />
			{t.resume_builder.labels.general.template_selector.synch_content}
		</button>
	)

	const renderTemplateInfo = () => (
		<span className="text-white font-extrabold ml-6 text-xl capitalize">
			{t.resume_builder.labels.general.template_selector.selected_template}:{" "}
			{template}
		</span>
	)

	return (
		<div className="relative border ring-4 ring-gray-50 p-2 bg-cyan-950 rounded-md overflow-hidden">
			<div className="relative z-10">
				<div className="flex download-section justify-between items-center">
					{renderRefreshButton()}
					{renderTemplateInfo()}
					{renderDownloadButton()}
				</div>
				<div className="rounded py-8">{getSelectedTemplate()}</div>
			</div>
		</div>
	)
}
