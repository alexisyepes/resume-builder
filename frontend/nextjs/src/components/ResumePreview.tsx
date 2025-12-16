import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
	type RefObject,
} from "react"
import { FaDownload, FaSpinner } from "react-icons/fa"
import { TfiReload } from "react-icons/tfi"
import ClassicTemplate from "../components/Templates/ClassicTemplate"
import ModernTemplate from "./Templates/ModernTemplate"
import StudentTemplate from "./Templates/StudentTemplate"
import CreativeTemplate from "./Templates/CreativeTemplate"
import MainTemplate from "./Templates/MainTemplateATS"
import ReactDOMServer from "react-dom/server"
import { useRouter } from "next/router"
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
import type {
	CertificationItem,
	CustomSectionItem,
	EducationItem,
	ExperienceItem,
	HobbyItem,
	LanguageItem,
	LinkItem,
	ReferenceItem,
	ResumeData,
	ResumeSnapshot,
} from "@/types/resume"
import type { TemplateCommonProps } from "@/types/templates"
import type { SectionRefs } from "@/types/sections"
import { uploadBase64ToCloudinary, type Translation } from "@/utils"
import { useProfile } from "@/hooks/useProfile"
import { SERVER_RESPONSE_MESSAGES } from "../../shared/response-codes"

type ResumePreviewProps = {
	userPlan: string | null | undefined
	userId: string | null | undefined
	t: Translation
	generatedResume: ResumeData
	email: string
	phone: string
	address: string
	cityPostCode: string
	firstName: string
	lastName: string
	skills: string[]
	experience: ExperienceItem[]
	objective: string
	jobTitle: string
	tabs: string[]
	certifications: CertificationItem[]
	educations: EducationItem[]
	references: ReferenceItem[]
	links: LinkItem[]
	hobbies: HobbyItem[]
	customSections: CustomSectionItem[]
	photo: string
	resumeRef: RefObject<HTMLDivElement>
	languages: LanguageItem[]
	template: string
}

// Constants
const LETTER_SIZE_HEIGHT = 850

export default function ResumePreview({
	userPlan,
	userId,
	t,
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
	resumeRef,
	languages,
}: ResumePreviewProps) {
	const [downloadInProgress, setDownloadInProgress] = useState(false)
	const [pages, setPages] = useState<React.ReactNode[][]>([])
	const [templateKey, setTemplateKey] = useState(0)
	const { customTitles, apiBaseUrl, template } = useResumeStore()
	const { fetchUserProfile } = useProfile(userId, apiBaseUrl)
	const tAny = t as any
	const serverResponseTranslations = tAny?.resume_builder?.server_responses

	// Section refs
	const personalDetailsRef = useRef<HTMLDivElement | null>(null)
	const contactInformationRef = useRef<HTMLDivElement | null>(null)
	const professionalSummaryRef = useRef<HTMLDivElement | null>(null)
	const employmentHistoryRef = useRef<HTMLDivElement | null>(null)
	const educationRef = useRef<HTMLDivElement | null>(null)
	const skillsRef = useRef<HTMLDivElement | null>(null)
	const certificationsRef = useRef<HTMLDivElement | null>(null)
	const referencesRef = useRef<HTMLDivElement | null>(null)
	const linksRef = useRef<HTMLDivElement | null>(null)
	const languagesRef = useRef<HTMLDivElement | null>(null)
	const hobbiesRef = useRef<HTMLDivElement | null>(null)
	const customSectionRef = useRef<HTMLDivElement | null>(null)

	const router = useRouter()
	const { locale } = router
	const langPrefix = locale

	// Memoized resume data
	const resumeData: ResumeSnapshot = useMemo(
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
	const sectionRefs = useMemo<SectionRefs>(
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
	const sectionMap = useMemo<Record<string, React.ReactNode>>(() => {
		try {
			const map = StandardATSSectionMap({
				sectionRefs,
				t,
				customTitles,
				resumeData,
				generatedResume: generatedResume as unknown as ResumeSnapshot,
				template,
			})
			return map || {}
		} catch (error) {
			console.error("Error creating section map:", error)
			return {}
		}
	}, [sectionRefs, t, customTitles, resumeData, generatedResume, template])

	// Common props with memoization
	const commonProps: TemplateCommonProps = useMemo(
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
	const paginateContent = useCallback(async () => {
		if (!resumeRef.current) {
			return
		}

		const newPages: React.ReactNode[][] = []
		let currentPage: React.ReactNode[] = []
		let currentHeight = 0

		const safeTabs = Array.isArray(tabs) ? tabs : []

		safeTabs.forEach((tab) => {
			const section = sectionRefs[tab]?.current
			if (!section) return

			const sectionHeight = section.offsetHeight || 0

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
	}, [tabs, sectionRefs, sectionMap])

	useEffect(() => {
		let isMounted = true
		let timeoutId: ReturnType<typeof setTimeout> | undefined

		const initializeContent = async () => {
			if (!isMounted) return

			// Build initial pages
			if (Array.isArray(tabs) && tabs.length > 0) {
				const initialPages = tabs
					.map((tab, i) => {
						const sectionElement = sectionMap[tab]
						return sectionElement ? <div key={i}>{sectionElement}</div> : null
					})
					.filter((node): node is React.ReactElement => Boolean(node))

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
				case "student":
					console.log(template)
					return <StudentTemplate key={templateKey} {...templateProps} />
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

		const limitCheckResponse = await fetch(
			`${apiBaseUrl}/users/${userId}/download-limit`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		)

		if (!limitCheckResponse.ok) {
			throw new Error("Failed to check download limit")
		}

		const limitCheck = await limitCheckResponse.json()

		if (!limitCheck.canDownload) {
			switch (limitCheck.reason) {
				case SERVER_RESPONSE_MESSAGES.DOWNLOAD_LIMIT_REACHED:
					alert(
						limitCheck.userPlan === "free"
							? serverResponseTranslations.you_used_all_downloads_upgrade
							: serverResponseTranslations.you_used_your_download_limit
					)
					break

				case SERVER_RESPONSE_MESSAGES.PLAN_EXPIRED:
					alert(serverResponseTranslations.paid_plan_expired)
					break
				case SERVER_RESPONSE_MESSAGES.USER_NOT_FOUND:
					alert(serverResponseTranslations.user_not_found)
					break
				case SERVER_RESPONSE_MESSAGES.YOU_USED_ALL_DOWNLOADS_UPGRADE:
					alert(serverResponseTranslations.you_used_all_downloads_upgrade)
					break
				case SERVER_RESPONSE_MESSAGES.YOU_USED_YOUR_DOWNLOAD_LIMIT:
					alert(serverResponseTranslations)
					break

				default:
					alert(serverResponseTranslations.general_unable_to_download)
					break
			}

			setDownloadInProgress(false)
			return
		}

		await paginateContent()

		let cloudinaryUrl: string = ""

		if (photo) {
			try {
				const url = await uploadBase64ToCloudinary(photo, {
					publicId: `resume_${firstName}_${lastName}_${Date.now()}`,
					transformation: "q_auto,f_auto",
					folder: "resumePhotos",
				})

				if (url) {
					cloudinaryUrl = url
				} else {
					console.warn("Cloudinary returned null")
				}
			} catch (error) {
				console.error("Error uploading to Cloudinary:", error)
			}
		} else {
			console.log("No photo to upload to Cloudinary")
		}

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
			const response = await fetch(`${apiBaseUrl}/resumes/generate-pdf`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId,
					title: `${firstName}_resume.pdf`,
					html: htmlContent,
					templateName: template,
					fileFormat: "pdf",
					fileName: `${firstName}_resume.pdf`,
					fileUrl: cloudinaryUrl,
					fileSize: 0,
					firstName,
					lastName,
					resumeData,
				}),
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

			await fetchUserProfile()
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
					{t.resume_builder.labels.general.template_selector.download}
				</>
			) : (
				<>
					<FaDownload className="inline" />
					{t.resume_builder.labels.general.template_selector.download}
				</>
			)}
		</button>
	)

	const renderTemplateInfo = () => (
		<span className="text-white font-extrabold ml-6 text-xl capitalize">
			{t.resume_builder.labels.general.template_selector.selected_template}:{" "}
			{template}
		</span>
	)

	return (
		<div className="relative border ring-4 ring-gray-50 p-2 bg-gray-950 rounded-md overflow-hidden">
			<div className="relative z-10">
				<div className="flex download-section justify-between items-center">
					{renderTemplateInfo()}
					{renderDownloadButton()}
				</div>
				<div className="rounded py-8">{getSelectedTemplate()}</div>
			</div>
		</div>
	)
}
