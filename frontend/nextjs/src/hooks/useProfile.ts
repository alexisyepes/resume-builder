import useResumeStore from "@/store/useResumeStore"
import { UserProfile } from "@/types/store"
import { useState, useEffect, useCallback, useRef } from "react"

export const useProfile = (userId: string | null, apiBaseUrl: string) => {
	const { isProfileModalOpen, setIsProfileModalOpen, user, setUser } =
		useResumeStore()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const hasFetchedRef = useRef(false)

	const fetchUserProfile = useCallback(async () => {
		if (!userId) return

		setLoading(true)
		setError(null)

		try {
			const response = await fetch(`${apiBaseUrl}/users/${userId}/profile`)

			if (!response.ok) {
				throw new Error("Failed to fetch user profile")
			}

			const data = await response.json()
			setUser(data)
			hasFetchedRef.current = true
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error")
			console.error("Error fetching user profile:", err)
		} finally {
			setLoading(false)
		}
	}, [userId, apiBaseUrl])

	const updateUserProfile = useCallback(
		async (updateData: Partial<UserProfile>) => {
			if (!userId) return false

			setLoading(true)
			setError(null)

			try {
				const response = await fetch(`${apiBaseUrl}/users/${userId}/profile`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				})

				if (!response.ok) {
					throw new Error("Failed to update profile")
				}

				const updatedProfile = await response.json()
				setUser(updatedProfile)
				return true
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to update profile"
				)
				console.error("Error updating user profile:", err)
				return false
			} finally {
				setLoading(false)
			}
		},
		[userId, apiBaseUrl]
	)

	const openModal = useCallback(() => {
		console.log("Opening modal")
		setIsProfileModalOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsProfileModalOpen(false)
		setError(null)
	}, [])

	useEffect(() => {
		if (isProfileModalOpen && userId && !hasFetchedRef.current) {
			fetchUserProfile()
		}
	}, [isProfileModalOpen, userId, fetchUserProfile])

	useEffect(() => {
		hasFetchedRef.current = false
	}, [userId])

	return {
		userProfile: user,
		loading,
		error,
		isProfileModalOpen,
		openModal,
		closeModal,
		fetchUserProfile,
		updateUserProfile,
	}
}
