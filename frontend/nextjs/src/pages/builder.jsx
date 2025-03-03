import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ResumeGenerator from "../components/ResumeGenerator"
import ProtectedRoute from "@/components/ProtectedRoute"
import { validateToken } from "@/utils"
import useResumeStore from "@/store/useResumeStore"
import LoadingSpinner from "@/components/LoadingSpinner" // Import the spinner

export default function Builder() {
	const { setIsAuthenticated, setUser } = useResumeStore()
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const isValid = await validateToken(router)
				if (!isValid) {
					setIsAuthenticated(false)
				}
			} catch (error) {
				console.error("Error during token validation:", error)
				if (router) {
					router.push("/signin")
				}
			} finally {
				setLoading(false)
			}
		}

		checkAuth()
	}, [setIsAuthenticated, setUser, router])

	if (loading) {
		return <LoadingSpinner />
	}

	return (
		<ProtectedRoute>
			<ResumeGenerator />
		</ProtectedRoute>
	)
}
