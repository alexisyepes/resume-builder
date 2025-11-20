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
        ((Object.keys(translations).find((lang) => pathname.startsWith(`/${lang}`)) as SupportedLocale) ?? "en")

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
        const response = await axios.get<ValidateTokenResponse>(`${apiBaseUrl}/validate-token`, {
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
