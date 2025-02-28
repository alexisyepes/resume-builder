import useResumeStore from "@/store/useResumeStore"
import { useRouter } from "next/router"

const languages = [
	{ code: "en", label: "🇬🇧 English" },
	{ code: "fr", label: "🇫🇷 Français" },
	{ code: "es", label: "🇪🇸 Español" },
	{ code: "it", label: "🇮🇹 Italiano" },
	{ code: "pt", label: "🇵🇹 Português" },
	{ code: "zh", label: "🇨🇳 中文 (Chinese)" },
	{ code: "hi", label: "🇮🇳 हिन्दी (Hindi)" },
	{ code: "ar", label: "🇸🇦 العربية (Arabic)" },
]

export default function LanguageSelector() {
	const router = useRouter()
	const { locale, pathname, asPath, query } = router
	const { resetCustomTitles } = useResumeStore()

	const changeLanguage = (newLocale) => {
		router.push({ pathname, query }, asPath, { locale: newLocale })
		resetCustomTitles()
	}

	return (
		<div>
			<select
				className=" text-black text-lg px-3 py-4 cursor-pointer"
				value={locale}
				onChange={(e) => changeLanguage(e.target.value)}
			>
				{languages.map(({ code, label }) => (
					<option key={code} value={code}>
						{label}
					</option>
				))}
			</select>
		</div>
	)
}
