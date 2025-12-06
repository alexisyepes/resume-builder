"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { CgProfile } from "react-icons/cg"
import LanguageSelector from "./LanguageSelector"
import Image from "next/image"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import useResumeStore from "@/store/useResumeStore"
import { useAuth } from "@/contexts/AuthContext"
import { HiHomeModern } from "react-icons/hi2"
import { useProfile } from "@/hooks/useProfile"
import ProfileIcon from "./ProfileIcon"
import ProfileModal from "./ProfileModal"

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const t = loadTranslations(router)
	const { isAuthenticated, user } = useResumeStore()
	const { logout } = useAuth()

	const apiBaseUrl =
		process.env.NEXT_PUBLIC_BACKEND_SERVER || "http://localhost:4000"
	const userId = (user?.id as string) || null

	const {
		userProfile,
		loading: profileLoading,
		error: profileError,
		isModalOpen,
		openModal,
		closeModal,
		updateUserProfile,
	} = useProfile(userId, apiBaseUrl)

	const [userInitials, setUserInitials] = useState("")

	useEffect(() => {
		if (userProfile?.firstName && userProfile?.lastName) {
			const initials = `${userProfile.firstName.charAt(
				0
			)}${userProfile.lastName.charAt(0)}`.toUpperCase()
			setUserInitials(initials)
		} else if (userProfile?.firstName) {
			setUserInitials(userProfile.firstName.charAt(0).toUpperCase())
		} else {
			setUserInitials("")
		}
	}, [userProfile])

	const handleUpdateProfile = async (data: any) => {
		return await updateUserProfile(data)
	}

	return (
		<nav className="bg-white shadow-md fixed w-full z-50">
			<div className="mx-auto pl-6 flex justify-between items-center">
				{/* Logo */}
				<Link href={"/"}>
					<Image
						alt="logo image"
						width={40}
						height={40}
						src={"/images/resume-logo.png"}
					/>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden ml-24 md:flex space-x-6">
					<div className="flex space-x-6 ml-8 items-center">
						<Link
							href="/about"
							className="hover:text-blue-500 capitalize transition"
						>
							{t.resume_builder.navigation.about}
						</Link>
						<Link
							href="/services"
							className="hover:text-blue-500 capitalize transition"
						>
							{t.resume_builder.navigation.services}
						</Link>
						<Link
							href="/pricing"
							className="hover:text-blue-500 capitalize transition"
						>
							{t.resume_builder.navigation.pricing}
						</Link>
					</div>
					{isAuthenticated ? (
						<div className="flex ml-8 items-center">
							<Link
								href="/builder"
								className="hover:text-blue-500 text-cyan-700 transition"
							>
								{t.resume_builder.navigation.dashboard}
							</Link>
							<div className="ml-6">
								<ProfileIcon
									onClick={openModal}
									userInitials={userInitials}
									isLoading={profileLoading && !userProfile}
								/>
							</div>
							<button
								onClick={logout}
								className="ml-6 px-3  border border-yellow-500 text-yellow-500 rounded-md hover:border-yellow-600 hover:text-yellow-600"
							>
								{t.resume_builder.navigation.logout}
							</button>
						</div>
					) : (
						<Link
							href="/signin"
							className="hover:text-blue-500 capitalize transition"
						>
							{t.resume_builder.navigation.signin}
						</Link>
					)}
				</div>

				<div className="hidden md:flex space-x-6">
					<LanguageSelector />
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden pr-2 py-3 focus:outline-none relative z-60"
					onClick={() => setIsOpen(!isOpen)}
				>
					<Menu className="w-6 h-6" />
				</button>
			</div>

			{/* Backdrop */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
						onClick={() => setIsOpen(false)}
					/>
				)}
			</AnimatePresence>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="mobile-menu"
						initial={{ opacity: 0, y: -10, height: 0 }}
						animate={{ opacity: 1, y: 0, height: "auto" }}
						exit={{
							opacity: 0,
							y: -10,
							height: 0,
							transition: { duration: 0.4, ease: "easeOut" },
						}}
						transition={{ duration: 0.4, ease: "easeOut" }}
						className="bg-white -mt-12 shadow-md overflow-visible relative z-50"
					>
						<div className="flex justify-end p-4 pb-0">
							<button onClick={() => setIsOpen(false)}>
								<X className="w-6 h-6" />
							</button>
						</div>

						<div className="p-4 pt-2">
							<div className="flex capitalize flex-col items-center space-y-4">
								<Link
									href="/"
									className="hover:text-blue-500 flex justify-center transition w-full text-center"
									onClick={() => setIsOpen(false)}
								>
									<HiHomeModern size={30} />
								</Link>
								<Link
									href="/about"
									className="hover:text-blue-500 transition w-full text-center py-2"
									onClick={() => setIsOpen(false)}
								>
									{t.resume_builder.navigation.about}
								</Link>
								<Link
									href="/services"
									className="hover:text-blue-500 transition w-full text-center py-2"
									onClick={() => setIsOpen(false)}
								>
									{t.resume_builder.navigation.services}
								</Link>
								<Link
									href="/pricing"
									className="hover:text-blue-500 transition w-full text-center py-2"
									onClick={() => setIsOpen(false)}
								>
									{t.resume_builder.navigation.pricing}
								</Link>
								{isAuthenticated ? (
									<div className="flex flex-col items-center space-y-3 w-full">
										<Link
											href="/builder"
											className="hover:text-blue-500 transition w-full text-center py-2"
											onClick={() => setIsOpen(false)}
										>
											{t.resume_builder.navigation.dashboard}
										</Link>
										{/* Profile en móvil */}
										<div className="border-t w-full border-t-gray-200 pt-4">
											<button
												onClick={() => {
													openModal()
													setIsOpen(false)
												}}
												className="flex items-center justify-center gap-2 w-full py-2"
											>
												{userInitials ? (
													<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
														{userInitials}
													</div>
												) : (
													<CgProfile size={25} />
												)}
												<span>Profile</span>
											</button>
										</div>
										<button
											onClick={() => {
												logout()
												setIsOpen(false)
											}}
											className="border border-yellow-500 text-yellow-500 rounded-md hover:border-yellow-600 hover:text-yellow-600 py-2 px-4"
										>
											{t.resume_builder.navigation.logout}
										</button>
									</div>
								) : (
									<Link
										href="/signin"
										className="hover:text-blue-500 transition w-full text-center py-2"
										onClick={() => setIsOpen(false)}
									>
										{t.resume_builder.navigation.signin}
									</Link>
								)}
							</div>

							<div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
								<div className="w-full flex justify-center max-w-xs">
									<LanguageSelector
										isMobile
										setIsOpen={setIsOpen}
										isOpen={isOpen}
									/>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Profile Modal */}
			<ProfileModal
				isOpen={isModalOpen}
				onClose={closeModal}
				userProfile={userProfile}
				loading={profileLoading}
				error={profileError}
				onUpdateProfile={handleUpdateProfile}
				profileModalTranslations={t.resume_builder.profile_modal}
			/>
		</nav>
	)
}

export default Navbar
