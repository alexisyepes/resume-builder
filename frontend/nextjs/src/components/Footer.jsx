import { useContext } from "react"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"

export default function Footer() {
	const router = useRouter()
	const t = loadTranslations(router)
	return (
		<footer className="bg-white py-4">
			<div className="max-w-7xl mx-auto text-center">
				<p className="text-gray-600">&copy; {t.resume_builder.footer}</p>
			</div>
		</footer>
	)
}
