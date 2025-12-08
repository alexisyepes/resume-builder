import axios from "axios"
import type { ReactNode } from "react"
import { createContext, useContext } from "react"
import { useRouter } from "next/router"

import useResumeStore from "@/store/useResumeStore"
import { loadTranslations } from "@/utils"

interface User {
	id?: string
	firstName?: string
	lastName?: string
	email?: string
	plan?: string
	provider?: string
	updatedAt?: string
	[key: string]: unknown
}

type AuthResponse = {
	token: string
	user: User
}

type AuthContextValue = {
	user: User | null
	isAuthenticated: boolean
	login: (email: string, password: string) => Promise<void>
	register: (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => Promise<void>
	signInWithGoogle: () => Promise<void>
	logout: () => void
}

type AuthProviderProps = {
	children: ReactNode
}

const AuthContext = createContext<AuthContextValue | null>(null)

const ensureApiBaseUrl = (apiBaseUrl?: string) => {
	if (!apiBaseUrl) {
		throw new Error("NEXT_PUBLIC_BACKEND_SERVER is not configured")
	}
	return apiBaseUrl
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const {
		apiBaseUrl,
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		setAuthError,
		reset,
	} = useResumeStore()
	const router = useRouter()
	const t = loadTranslations(router)
	const signinErrors = t.resume_builder.pages.signin.errors

	const handleAuthError = (message?: string) => {
		if (message === "Invalid email or password") {
			setAuthError(signinErrors.invalid_credentials)
		} else if (message === "You must enter email and password") {
			setAuthError(signinErrors.validation)
		} else if (message === "Email already exists") {
			setAuthError(signinErrors.email_exists)
		} else if (message === "All fields are required") {
			setAuthError(signinErrors.all_fields_required)
		} else if (message === "Password must be at least 8 characters") {
			setAuthError(signinErrors.password_min_length)
		} else if (message) {
			setAuthError(signinErrors.auth_failed)
		} else {
			setAuthError(signinErrors.auth_failed)
		}
	}

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post<AuthResponse>(
				`${ensureApiBaseUrl(apiBaseUrl)}/auth/login`,
				{
					email,
					password,
				}
			)
			localStorage.setItem("token", response.data.token)
			setUser(response.data.user)
			setIsAuthenticated(true)
			router.push("/builder")
		} catch (error) {
			if (axios.isAxiosError<{ message?: string }>(error)) {
				handleAuthError(error.response?.data?.message)
			} else {
				setAuthError(signinErrors.auth_failed)
			}
		}
	}

	const register = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => {
		try {
			const response = await axios.post<AuthResponse>(
				`${ensureApiBaseUrl(apiBaseUrl)}/auth/register`,
				{
					firstName,
					lastName,
					email,
					password,
					provider: "email",
				}
			)

			localStorage.setItem("token", response.data.token)
			setUser(response.data.user)
			setIsAuthenticated(true)
			router.push("/builder")
		} catch (error) {
			if (axios.isAxiosError<{ message?: string }>(error)) {
				handleAuthError(error.response?.data?.message)
			} else {
				setAuthError(signinErrors.auth_failed)
			}
		}
	}

	const signInWithGoogle = async () => {
		// TODO: integrate OAuth provider
		setUser({ email: "googleuser@example.com" })
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem("token")
		reset()
		setUser(null)
		setIsAuthenticated(false)
		router.push("/signin")
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				register,
				signInWithGoogle,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextValue => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
