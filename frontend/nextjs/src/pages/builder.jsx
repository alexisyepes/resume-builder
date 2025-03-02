import ResumeGenerator from "../components/ResumeGenerator"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Builder() {
	return (
		<ProtectedRoute>
			<ResumeGenerator />
		</ProtectedRoute>
	)
}
