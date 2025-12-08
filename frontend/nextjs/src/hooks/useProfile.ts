import useResumeStore from "@/store/useResumeStore"
import { useState, useEffect, useCallback, useRef } from "react"

export interface UserProfile {
	id: string
	email: string
	firstName: string
	lastName: string
	createdAt: string
	planType: "free" | "basic" | "premium" | "enterprise"
	totalDownloads: number
	downloadsRemaining: number | "unlimited"
}

export const useProfile = (userId: string | null, apiBaseUrl: string) => {
	const { isProfileModalOpen, setIsProfileModalOpen } = useResumeStore()
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
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
			setUserProfile(data)
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
				setUserProfile(updatedProfile)
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
		userProfile,
		loading,
		error,
		isProfileModalOpen,
		openModal,
		closeModal,
		fetchUserProfile,
		updateUserProfile,
	}
}
