import { useAuth } from "@/contexts/AuthContext"
import ResumeGenerator from "../components/ResumeGenerator"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Builder() {
	const { isAuthenticated } = useAuth()

	return (
		<ProtectedRoute>
			<ResumeGenerator />
		</ProtectedRoute>
	)
}
