// src/components/ProtectedRoute.js
import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/router"
import useResumeStore from "@/store/useResumeStore"
import { validateToken } from "@/utils"
import LoadingSpinner from "@/components/LoadingSpinner" // Import the spinner

type ProtectedRouteProps = {
	children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useResumeStore()
	const router = useRouter()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const isValid = await validateToken(router)
				if (!isValid) {
					// No need to redirect here; validateToken handles it
				}
			} catch (error) {
				console.error("Error during token validation:", error)
				if (router) {
					router.push("/signin") // Redirect to sign-in page
				}
			} finally {
				setLoading(false) // Always set loading to false
			}
		}

		checkAuth()
	}, [router])

	// Show a loading spinner while validating the token
	if (loading) {
		return <LoadingSpinner /> // Show the spinner
	}

	// Render the children only if authenticated
	return isAuthenticated ? children : null
}

export default ProtectedRoute
