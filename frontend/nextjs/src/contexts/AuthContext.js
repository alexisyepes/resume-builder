import useResumeStore from "@/store/useResumeStore"
import axios from "axios"
import { useRouter } from "next/router"
import { createContext, useContext } from "react"
import { loadTranslations } from "@/utils"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const { isAuthenticated, setIsAuthenticated, user, setUser, setAuthError } =
		useResumeStore()
	const router = useRouter()
	const t = loadTranslations(router)

	const login = async (email, password) => {
		try {
			const response = await axios.post(`http://localhost:4000/login`, {
				email,
				password,
			})
			localStorage.setItem("token", response.data.token)
			setUser(response.data.user)
			setIsAuthenticated(true)
			router.push("/builder")
		} catch (error) {
			console.error("Login failed:", error.response.data.message)
			setAuthError(t.resume_builder.pages.signin.invalid_credentials)
		}
	}

	const register = async (email, password, provider) => {
		console.log("Server", process.env.NEXT_PUBLIC_BACKEND_SERVER)
		try {
			const response = await axios.post(`http://localhost:4000/register`, {
				provider,
				email,
				password,
			})
			localStorage.setItem("token", response.data.token)
			setUser(response.data.user)
			setIsAuthenticated(true)
			router.push("/builder")
		} catch (error) {
			console.error("Registration failed:", error)
			alert("Registration failed. Please try again.")
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
