import axios from "axios"
import en from "./locales/en"
import es from "./locales/es"
import fr from "./locales/fr"
import it from "./locales/it"
import pt from "./locales/pt"
import zh from "./locales/zh"
import hi from "./locales/hi"
import ar from "./locales/ar"
import useResumeStore from "./store/useResumeStore"

export const tabs = [
	"Personal details",
	"Contact information",
	"Professional summary",
	"Employment history",
	"Skills",
	"Education",
	"References",
]

export const capitalizeEachWord = (string) => {
	return string
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ")
}

const translations = { en, fr, es, it, pt, zh, hi, ar }
export const loadTranslations = (router) => {
	const { locale, pathname } = router

	const detectedLocale =
		locale ||
		Object.keys(translations).find((lang) => pathname.startsWith(`/${lang}`)) ||
		"en"

	return translations[detectedLocale] || en
}

export const getLangPrefix = (lang) => {
	return lang === "es" ? "/es" : ""
}

// Validates token and also refreshes the token if the old token is still valid
export const validateToken = async (router) => {
	let token = localStorage.getItem("token")

	if (!token) {
		if (router) router.push("/signin")
		return false
	}

	const { apiBaseUrl, setIsAuthenticated, setUser } = useResumeStore.getState()

	try {
		const response = await axios.get(`${apiBaseUrl}/validate-token`, {
			headers: { Authorization: `Bearer ${token}` },
			validateStatus: (status) => status === 200 || status === 401,
		})

		if (response.status === 200 && response.data.isValid) {
			setIsAuthenticated(true)
			setUser(response.data.user)

			if (response.data.token) {
				localStorage.setItem("token", response.data.token)
			}

			return true
		} else {
			setIsAuthenticated(false)
			localStorage.removeItem("token")
			if (router) router.push("/signin")
			return false
		}
	} catch (error) {
		console.error("Token validation failed:", error)
		setIsAuthenticated(false)
		localStorage.removeItem("token")
		if (router) router.push("/signin")
		return false
	}
}
