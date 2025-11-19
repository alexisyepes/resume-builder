"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LanguageSelector from "./LanguageSelector"
import Image from "next/image"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import useResumeStore from "@/store/useResumeStore"
import { useAuth } from "@/contexts/AuthContext"
import { HiHomeModern } from "react-icons/hi2"

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const t = loadTranslations(router)
	const { isAuthenticated } = useResumeStore()
	const { logout } = useAuth()

	return (
		<nav className="bg-white shadow-md fixed w-full z-50">
			<div className="mx-auto pl-6 flex justify-between items-center">
				{/* Logo - Hidden on mobile, visible on desktop */}
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
					{isAuthenticated ? (
						<div className="flex ml-8">
							<Link
								href="/builder"
								className="hover:text-blue-500 text-cyan-700 transition"
								onClick={() => setIsOpen(false)}
							>
								{t.resume_builder.navigation.dashboard}
							</Link>
							<p
								onClick={logout}
								className="cursor-pointer ml-4 hover:text-yellow-600 text-yellow-500"
							>
								{t.resume_builder.navigation.logout}
							</p>
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

				{/* Mobile Menu Button - Always on the right with higher z-index */}
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

			{/* Mobile Menu with AnimatePresence */}
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
							transition: {
								duration: 0.4,
								ease: "easeOut",
							},
						}}
						transition={{
							duration: 0.4,
							ease: "easeOut",
						}}
						className=" bg-white -mt-12 shadow-md overflow-visible relative z-50"
					>
						{/* Close button */}
						<div className="flex justify-end p-4 pb-0">
							<button
								className="focus:outline-none"
								onClick={() => setIsOpen(false)}
							>
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
								{isAuthenticated ? (
									<div className="flex flex-col items-center space-y-2 w-full">
										<Link
											href="/builder"
											className="hover:text-blue-500 transition w-full text-center py-2"
											onClick={() => setIsOpen(false)}
										>
											{t.resume_builder.navigation.dashboard}
										</Link>
										<p
											onClick={() => {
												logout()
												setIsOpen(false)
											}}
											className="cursor-pointer hover:text-yellow-600 text-yellow-500 w-full text-center py-2"
										>
											{t.resume_builder.navigation.logout}
										</p>
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

							{/* Language Selector Container */}
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
		</nav>
	)
}

export default Navbar
