import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { ChevronDown } from "lucide-react"

import useResumeStore from "@/store/useResumeStore"

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

type LanguageSelectorProps = {
	setIsOpen?: (value: boolean) => void
	isOpen?: boolean
	isMobile?: boolean
}

export default function LanguageSelector({
	setIsOpen,
	isMobile = false,
}: LanguageSelectorProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement | null>(null)
	const router = useRouter()
	const { locale, pathname, asPath, query } = router
	const { resetCustomTitles } = useResumeStore()

	const currentLanguage = languages.find((lang) => lang.code === locale)

	const changeLanguage = (newLocale: string) => {
		router.push({ pathname, query }, asPath, { locale: newLocale })
		resetCustomTitles()
		setIsDropdownOpen(false)
		if (isMobile && setIsOpen) {
			setIsOpen(false)
		}
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	return (
		<div className="w-52 relative" ref={dropdownRef}>
			{/* Custom dropdown button */}
			<button
				className={`w-full flex items-center justify-between text-black border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 hover:border-cyan-400 hover:text-cyan-400  focus:ring-cyan-200 ${
					isMobile
						? "text-lg px-6 py-4"
						: "text-base sm:text-lg px-4 py-3 sm:py-4"
				}`}
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				<span>{currentLanguage?.label}</span>
				<ChevronDown
					className={`w-5 h-5 transition-transform ${
						isDropdownOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{/* Dropdown options */}
			{isDropdownOpen && (
				<div
					className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
					style={{
						maxHeight: isMobile ? "200px" : "240px",
					}}
				>
					<div
						className="overflow-y-auto h-full"
						style={{
							maxHeight: "inherit",
						}}
					>
						{languages.map(({ code, label }) => (
							<button
								key={code}
								className={`w-full text-left px-6 py-1 hover:bg-blue-50 hover:text-blue-700 transition-colors ${
									locale === code
										? "bg-blue-100 text-blue-700"
										: "text-gray-900"
								} ${isMobile ? "text-lg" : "text-base"}`}
								onClick={() => changeLanguage(code)}
							>
								{label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
