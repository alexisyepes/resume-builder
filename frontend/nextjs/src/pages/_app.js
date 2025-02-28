import Layout from "@/components/Layout"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import "@/styles/globals.css"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import useResumeStore from "@/store/useResumeStore"

export default function App({ Component, pageProps }) {
	const resumeStore = useResumeStore()
	const router = useRouter()
	const t = loadTranslations(router)
	const { locale } = router
	const langPrefix = locale
	const { setPhoto } = useResumeStore()

	const templateDesigns = [
		{
			name: t.resume_builder.template_names.classic,
			value: "classic",
			image: "/images/templateDesigns/classic.png",
		},
		{
			name: t.resume_builder.template_names.classic_ats,
			value: "classic-ats",
			image: "/images/templateDesigns/classic.png",
		},
		{
			name: t.resume_builder.template_names.elegant,
			value: "elegant",
			image: "/images/templateDesigns/elegant.png",
		},
		{
			name: t.resume_builder.template_names.modern,
			value: "modern",
			image: "/images/templateDesigns/modern.png",
		},
		// {
		// 	name: "Creative - ATS",
		// 	value: "creative-ats",
		// 	image: "/images/creative-ats.png",
		// },
	]

	const handleImageUpload = (event) => {
		const file = event.target.files[0]
		if (!file) return

		const reader = new FileReader()
		reader.onloadend = () => {
			setPhoto(reader.result)
		}
		reader.readAsDataURL(file)
		event.target.value = null
	}

	return (
		<Layout>
			<RESUME_CONTEXT.Provider
				value={{
					t,
					langPrefix,
					handleImageUpload,
					templateDesigns,
					...resumeStore,
				}}
			>
				<Component {...pageProps} />
			</RESUME_CONTEXT.Provider>
		</Layout>
	)
}
