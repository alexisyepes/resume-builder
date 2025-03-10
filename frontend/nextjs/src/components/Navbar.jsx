"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LanguageSelector from "./LanguageSelector"
import Image from "next/image"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import useResumeStore from "@/store/useResumeStore"
import { useAuth } from "@/contexts/AuthContext"

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const t = loadTranslations(router)
	const { isAuthenticated } = useResumeStore()
	const { logout } = useAuth()

	return (
		<nav className="bg-white shadow-md fixed w-full z-50">
			<div className="mx-auto px-6 flex justify-between items-center">
				{/* Logo */}
				<Link className="mx-4" href={"/"}>
					<Image
						alt="logo image"
						width={50}
						height={50}
						src={"/images/resume-logo.png"}
					/>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex space-x-6">
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
								Dashboard
							</Link>
							<p
								onClick={logout}
								className="cursor-pointer ml-4 hover:text-yellow-600 text-yellow-500"
							>
								Logout
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

				{/* Mobile Menu Button */}
				<button
					className="md:hidden focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="md:hidden bg-white shadow-md py-4"
				>
					<div className="flex flex-col items-center space-y-4">
						<Link
							href="/about"
							className="hover:text-blue-500 transition"
							onClick={() => setIsOpen(false)}
						>
							About
						</Link>
						<Link
							href="/services"
							className="hover:text-blue-500 transition"
							onClick={() => setIsOpen(false)}
						>
							Services
						</Link>
						{isAuthenticated && (
							<div>
								<Link
									href="/builder"
									className="hover:text-blue-500 transition"
									onClick={() => setIsOpen(false)}
								>
									Dashboard
								</Link>
								<p
									onClick={logout}
									className="cursor-pointer ml-4 hover:text-yellow-600 text-yellow-500"
								>
									Logout
								</p>
							</div>
						)}
						{/* <Link
							href="/contact"
							className="hover:text-blue-500 transition"
							onClick={() => setIsOpen(false)}
						>
							Contact
						</Link> */}
					</div>
					<LanguageSelector />
				</motion.div>
			)}
		</nav>
	)
}

export default Navbar
