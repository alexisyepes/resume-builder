import { useEffect } from "react"
import { useRouter } from "next/router"
import useResumeStore from "@/store/useResumeStore"
import { validateToken } from "@/utils"

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useResumeStore()
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			const isValid = await validateToken()
			if (!isValid) {
				router.push("/signin")
			}
		}

		checkAuth()
	}, [router])

	return isAuthenticated ? children : null
}

export default ProtectedRoute
