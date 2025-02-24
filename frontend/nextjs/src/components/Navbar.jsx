"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LanguageSelector from "./LanguageSelector"
import Image from "next/image"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const t = loadTranslations(router)

	return (
		<nav className="bg-white shadow-md fixed w-full z-50">
			<div className="mx-auto px-6 flex justify-between items-center">
				{/* Logo */}
				<Link className="mx-4" href={"/"}>
					<Image width={50} height={50} src={"/images/resume-logo.png"} />
					{/* <IoHomeSharp className="mx-4 cursor-pointer" color="teal" size={35} /> */}
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
					<Link
						href="/contact"
						className="hover:text-blue-500 capitalize transition"
					>
						{t.resume_builder.navigation.contact}
					</Link>
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
						{/* <Link
							href="/"
							className="hover:text-blue-500 transition"
							onClick={() => setIsOpen(false)}
						>
							Home
						</Link> */}
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
						<Link
							href="/contact"
							className="hover:text-blue-500 transition"
							onClick={() => setIsOpen(false)}
						>
							Contact
						</Link>
					</div>
					<LanguageSelector />
				</motion.div>
			)}
		</nav>
	)
}

export default Navbar
