// src/components/ProtectedRoute.js
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/AuthContext"

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/signin")
		}
	}, [isAuthenticated, router])

	return isAuthenticated ? children : null
}

export default ProtectedRoute
