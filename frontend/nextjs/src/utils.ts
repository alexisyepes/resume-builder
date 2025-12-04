import axios from "axios"
import type { NextRouter } from "next/router"

import ar from "./locales/ar"
import en from "./locales/en"
import es from "./locales/es"
import fr from "./locales/fr"
import hi from "./locales/hi"
import it from "./locales/it"
import pt from "./locales/pt"
import zh from "./locales/zh"
import useResumeStore from "./store/useResumeStore"

export const capitalizeEachWord = (value: string): string => {
	return value
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ")
}

const translations = {
	en,
	fr,
	es,
	it,
	pt,
	zh,
	hi,
	ar,
} as const

export type SupportedLocale = keyof typeof translations
export type Translation = (typeof translations)[SupportedLocale]

export const loadTranslations = (router: NextRouter): Translation => {
	const { locale, pathname } = router

	const detectedLocale: SupportedLocale =
		(locale as SupportedLocale) ||
		((Object.keys(translations).find((lang) =>
			pathname.startsWith(`/${lang}`)
		) as SupportedLocale) ??
			"en")

	return translations[detectedLocale] || en
}

export const getLangPrefix = (lang: string): string => {
	return lang === "es" ? "/es" : ""
}

interface ValidateTokenResponse {
	isValid: boolean
	user: ReturnType<typeof useResumeStore.getState>["user"]
	token?: string
}

// Validates token and also refreshes the token if the old token is still valid
export const validateToken = async (router?: NextRouter): Promise<boolean> => {
	const token = localStorage.getItem("token")

	if (!token) {
		if (router) router.push("/signin")
		return false
	}

	const { apiBaseUrl, setIsAuthenticated, setUser } = useResumeStore.getState()

	try {
		const response = await axios.get<ValidateTokenResponse>(
			`${apiBaseUrl}/auth/validate-token`,
			{
				headers: { Authorization: `Bearer ${token}` },
				validateStatus: (status) => status === 200 || status === 401,
			}
		)

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

import {
	CloudinaryUploadResult,
	CloudinaryUploadOptions,
} from "@/types/cloudinary"

export const uploadBase64ToCloudinary = async (
	base64Data: string,
	options: CloudinaryUploadOptions = {}
): Promise<string | null> => {
	try {
		const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
		const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

		if (!cloudName || !uploadPreset) {
			console.warn(
				"Cloudinary no está configurado. Asegúrate de configurar NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME y NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET"
			)
			return null
		}

		let base64Content: string
		if (base64Data.startsWith("data:image")) {
			const parts = base64Data.split(",")
			if (parts.length !== 2) {
				throw new Error("Formato base64 inválido")
			}
			base64Content = parts[1]
		} else {
			base64Content = base64Data
		}

		if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64Content)) {
			throw new Error("Base64 string inválido")
		}

		// Crear FormData
		const formData = new FormData()

		formData.append("file", base64Data)
		formData.append("upload_preset", uploadPreset)

		if (options.folder) {
			formData.append("folder", options.folder)
		}

		if (options.publicId) {
			formData.append("public_id", options.publicId)
		}

		if (options.tags && options.tags.length > 0) {
			formData.append("tags", options.tags.join(","))
		}

		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
			{
				method: "POST",
				body: formData,
			}
		)

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Cloudinary upload failed: ${errorText}`)
		}

		const data: CloudinaryUploadResult = await response.json()

		return data.url
	} catch (error) {
		console.error("Error uploading to Cloudinary:", error)
		return null
	}
}

// Versión alternativa que retorna el objeto completo
export const uploadBase64ToCloudinaryFull = async (
	base64Data: string,
	options: CloudinaryUploadOptions = {}
): Promise<CloudinaryUploadResult | null> => {
	try {
		const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
		const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

		if (!cloudName || !uploadPreset) {
			console.warn("Cloudinary configuration missing")
			return null
		}

		const formData = new FormData()
		formData.append("file", base64Data)
		formData.append("upload_preset", uploadPreset)

		if (options.folder) {
			formData.append("folder", options.folder)
		}

		if (options.publicId) {
			formData.append("public_id", options.publicId)
		}

		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
			{
				method: "POST",
				body: formData,
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		const data: CloudinaryUploadResult = await response.json()
		return data
	} catch (error) {
		console.error("Cloudinary upload error:", error)
		return null
	}
}
