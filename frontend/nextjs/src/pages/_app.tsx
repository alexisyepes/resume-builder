import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect, useState, type ChangeEvent } from "react"
import Layout from "@/components/Layout"
import { AuthProvider } from "@/contexts/AuthContext"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import type { TemplateDesign } from "@/constants"
import useResumeStore from "@/store/useResumeStore"
import { loadTranslations } from "@/utils"

export default function App({ Component, pageProps }: AppProps) {
	const [resumeContentTriggered, setResumeContentTriggered] = useState(false)
	const resumeStore = useResumeStore()
	const { setPhoto, apiBaseUrl } = resumeStore
	const router = useRouter()
	const t = loadTranslations(router)
	const { locale } = router
	const langPrefix = locale ?? null
	const templateNames = t.resume_builder.template_names ?? {}
	const resolveTemplateName = (key: string, fallback: string) =>
		(templateNames as Record<string, string | undefined>)[key] ?? fallback
	const [templateDesigns, setTemplateDesigns] = useState<TemplateDesign[]>([])

	useEffect(() => {
		getAllTemplates()
	}, [locale])

	const getAllTemplates = async () => {
		try {
			const response = await fetch(`${apiBaseUrl}/resumes/all_templates`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})

			if (!response.ok) {
				throw new Error(
					`Failed to fetch templates: ${response.status} ${response.statusText}`
				)
			}

			const data = await response.json()

			const mappedTemplates = data.map((template: any) => {
				const translationKey = template.value.replace(/-/g, "_")

				const translatedName = resolveTemplateName(
					translationKey,
					template.name
				)

				return {
					name: translatedName,
					value: template.value,
					image:
						template.image || `/images/templateDesigns/${template.value}.png`,
				}
			})

			setTemplateDesigns(mappedTemplates)
			return mappedTemplates
		} catch (error) {
			console.error("Error fetching template designs:", error)
			return []
		}
	}

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		const reader = new FileReader()
		reader.onloadend = () => {
			if (typeof reader.result === "string") {
				setPhoto(reader.result)
			}
		}
		reader.readAsDataURL(file)
		event.target.value = ""
	}

	return (
		<AuthProvider>
			<Layout>
				<RESUME_CONTEXT.Provider
					value={{
						t,
						langPrefix,
						handleImageUpload,
						templateDesigns,
						resumeContentTriggered,
						setResumeContentTriggered,
						...resumeStore,
					}}
				>
					<Component {...pageProps} />
				</RESUME_CONTEXT.Provider>
			</Layout>
		</AuthProvider>
	)
}
