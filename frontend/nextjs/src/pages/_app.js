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
					...resumeStore,
				}}
			>
				<Component {...pageProps} />
			</RESUME_CONTEXT.Provider>
		</Layout>
	)
}
