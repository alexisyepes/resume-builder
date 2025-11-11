import useResumeStore from "@/store/useResumeStore"
import axios from "axios"
import { useRouter } from "next/router"
import { createContext, useContext } from "react"
import { loadTranslations } from "@/utils"
import { first } from "lodash"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const {
		apiBaseUrl,
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		setAuthError,
	} = useResumeStore()
	const router = useRouter()
	const t = loadTranslations(router)

	const login = async (email, password) => {
		try {
			const response = await axios.post(`${apiBaseUrl}/login`, {
				email,
				password,
			})
			localStorage.setItem("token", response.data.token)
			setUser(response.data.user)
			setIsAuthenticated(true)
			router.push("/builder")
		} catch (error) {
			console.error("Login failed:", error.response?.data)

			const errorMessage = error.response?.data?.message

			if (errorMessage === "Invalid email or password") {
				setAuthError(t.resume_builder.pages.signin.errors.invalid_credentials)
			} else if (errorMessage === "You must enter email and password") {
				setAuthError(t.resume_builder.pages.signin.errors.validation)
			} else {
				setAuthError(t.resume_builder.pages.signin.errors.auth_failed)
			}
		}
	}

	const register = async (firstName, lastName, email, password) => {
		try {
			const response = await axios.post(`${apiBaseUrl}/register`, {
				firstName,
				lastName,
				email,
				password,
				provider: "email",
			})

			localStorage.setItem("token", response.data.token)
			setUser(response.data.user)
			setIsAuthenticated(true)
			router.push("/builder")
		} catch (error) {
			console.error("Registration failed:", error.response?.data)
			const errorMessage = error.response?.data?.message

			if (errorMessage === "Email already exists") {
				setAuthError(t.resume_builder.pages.signin.errors.email_exists)
			} else if (errorMessage === "All fields are required") {
				setAuthError(t.resume_builder.pages.signin.errors.all_fields_required)
			} else if (errorMessage === "Password must be at least 8 characters") {
				setAuthError(t.resume_builder.pages.signin.errors.password_min_length)
			} else {
				setAuthError(t.resume_builder.pages.signin.errors.error_creating_user)
			}
		}
	}

	const signInWithGoogle = async () => {
		console.log("Signing in with Google")
		//@TODO
		setUser({ email: "googleuser@example.com" })
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem("token")
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

export const useAuth = () => useContext(AuthContext)
