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
import { useRouter } from "next/router"

export const defaultResume = {
	resume: {
		firstName: "sarah",
		lastName: "connor",
		jobTitle: "project manager",
		contact: {
			email: "sarah.connor@example.com",
			phone: "+1-234-567-8901",
			address: "123 Celebrity Lane",
			cityPostCode: "Hollywood, CA 90028",
		},
		objective:
			"Creative and results-driven professional dedicated to thriving in fast-paced settings. Eager to take on new challenges, quickly adapt, and utilize exceptional communication skills. Skilled in teamwork, consistently contributing to the achievement of high-quality, timely results.",
		education: [
			{
				degree: "Bachelor of Fine Arts in Performing Arts",
				institution: "University of the Arts, Philadelphia, PA",
				year: "2017",
			},
			{
				degree: "Diploma in Music Production and Sound Engineering",
				institution: "The Los Angeles Recording School, Los Angeles, CA",
				year: "2019",
			},
		],
		experience: [
			{
				company: "Google",
				role: "Lead Supervisor",
				project: "'Echoes of the Heart'",
				year: "2021 - Present",
				responsibilities: [
					"Performed the lead role in a critically acclaimed Broadway musical, receiving excellent reviews for singing and acting.",
					"Collaborated with the director and cast members to develop a compelling character portrayal.",
				],
			},
			{
				company: "Meta",
				role: "Full stack",
				project: "Debut Album - 'Whispers of the Soul'",
				year: "2020",
				responsibilities: [
					"Wrote and co-produced a debut album featuring 10 original tracks.",
					"Performed live at various venues and music festivals, gaining a loyal fan base.",
				],
			},
			{
				company: "Sony",
				role: "Lead dev",
				project: "Independent Film - 'Lost in Reverie'",
				year: "2018",
				responsibilities: [
					"Played a supporting role in an independent film showcased at international film festivals.",
					"Worked closely with a diverse cast and crew to deliver a powerful storytelling experience.",
				],
			},
		],
		skills: [
			"Acting in Theatre and Film",
			"Vocal Performance and Music Composition",
			"Guitar and Piano Proficiency",
			"Script Analysis and Character Development",
			"Music Production and Audio Engineering",
		],
		references: [
			{
				name: "John Anderson",
				relationship: "Director of 'Echoes of the Heart'",
				contact: "john.anderson@example.com",
			},
			{
				name: "Emily Davis",
				relationship: "Music Producer",
				contact: "emily.davis@example.com",
			},
		],
	},
}

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

export const validateToken = async (router) => {
	const token = localStorage.getItem("token")
	if (!token) {
		if (router) {
			router.push("/signin")
		}
		return false
	}

	const { setIsAuthenticated, setUser } = useResumeStore.getState()

	try {
		const response = await axios.get(`http://localhost:4000/validate-token`, {
			headers: { Authorization: `Bearer ${token}` },
			validateStatus: (status) => status === 200 || status === 401,
		})

		if (response.status === 200 && response.data.isValid) {
			setIsAuthenticated(true)
			setUser(response.data.user)
			return true
		} else {
			setIsAuthenticated(false)
			localStorage.removeItem("token")
			if (router) {
				router.push("/signin")
			}
			return false
		}
	} catch (error) {
		console.error("Token validation failed:", error)
		setIsAuthenticated(false)
		localStorage.removeItem("token")
		if (router) {
			router.push("/signin")
		}
		return false
	}
}

export const setupAxiosInterceptors = () => {
	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response?.status === 401) {
				const { setIsAuthenticated, setUser } = useResumeStore.getState()
				setIsAuthenticated(false)
				setUser(null)
				localStorage.removeItem("token")
				window.location.href = "/signin"
			}
			return Promise.reject(error)
		}
	)
}
