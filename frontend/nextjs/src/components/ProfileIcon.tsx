import React from "react"
import { CgProfile } from "react-icons/cg"

interface ProfileIconProps {
	onClick: () => void
	userInitials?: string
	isLoading?: boolean
	size?: number
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
	onClick,
	userInitials,
	isLoading = false,
	size = 24,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={isLoading}
			className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group relative"
			aria-label="User profile"
		>
			{isLoading ? (
				<div className="animate-pulse flex items-center gap-2">
					<div className="w-8 h-8 bg-gray-200 rounded-full"></div>
				</div>
			) : userInitials ? (
				<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
					{userInitials}
				</div>
			) : (
				<CgProfile
					size={size}
					className="text-gray-600 group-hover:text-gray-800 transition-colors"
				/>
			)}
		</button>
	)
}

export default ProfileIcon
