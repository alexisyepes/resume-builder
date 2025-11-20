import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useState, type ChangeEvent } from "react"

import Layout from "@/components/Layout"
import { AuthProvider } from "@/contexts/AuthContext"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import type { TemplateDesign } from "@/constants"
import useResumeStore from "@/store/useResumeStore"
import { loadTranslations } from "@/utils"

export default function App({ Component, pageProps }: AppProps) {
	const [resumeContentTriggered, setResumeContentTriggered] = useState(false)
	const resumeStore = useResumeStore()
	const { setPhoto } = resumeStore
	const router = useRouter()
	const t = loadTranslations(router)
	const { locale } = router
	const langPrefix = locale ?? null
	const templateNames = t.resume_builder.template_names ?? {}
	const resolveTemplateName = (key: string, fallback: string) =>
		(templateNames as Record<string, string | undefined>)[key] ?? fallback

	const templateDesigns: TemplateDesign[] = [
		{
			name: resolveTemplateName("classic_ats", "Classic ATS"),
			value: "classic-ats",
			image: "/images/templateDesigns/classic.png",
		},
		{
			name: resolveTemplateName("elegant", "Elegant"),
			value: "elegant",
			image: "/images/templateDesigns/elegant.png",
		},
		{
			name: resolveTemplateName("modern", "Modern"),
			value: "modern",
			image: "/images/templateDesigns/modern.png",
		},
		{
			name: resolveTemplateName("minimalist", "Minimalist"),
			value: "minimalist",
			image: "/images/templateDesigns/minimalist.png",
		},
		{
			name: resolveTemplateName("student", "Student"),
			value: "student",
			image: "/images/templateDesigns/student.png",
		},
	]

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
