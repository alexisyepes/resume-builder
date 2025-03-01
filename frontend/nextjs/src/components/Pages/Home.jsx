"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import { AiOutlineRobot } from "react-icons/ai"
import { MdDesignServices, MdFileDownload, MdVerified } from "react-icons/md"
import FAQSection from "./FAQSection"

const heroImage = "/images/home_hero2.jpg" // Update with your home page hero image

const Home = () => {
	const router = useRouter()
	const t = loadTranslations(router)

	return (
		<div className="min-h-screen mb-4 w-full flex flex-col items-center bg-cyan-50">
			{/* Hero Section with Image */}
			<div className="relative w-full h-96 sm:h-[500px]">
				<img
					src={heroImage}
					alt="Hero"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
					<div className="text-center px-4">
						<motion.h1
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl sm:text-6xl font-extrabold text-white"
						>
							{t.resume_builder.pages.home.title}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="mt-4 text-xl sm:text-2xl text-white"
						>
							{t.resume_builder.pages.home.description}
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="mt-8 flex flex-col md:flex-row gap-4 justify-center"
						>
							<Link href="/builder">
								<button className="px-6 py-3 bg-cyan-500 text-white rounded-lg shadow-md hover:bg-cyan-700 text-lg">
									{t.resume_builder.pages.home.cta_builder}
								</button>
							</Link>
							<Link href="/templates">
								<button className="px-6 py-3 border border-cyan-300 text-cyan-300 hover:text-cyan-500 rounded-lg shadow-md hover:bg-blue-100 text-lg">
									{t.resume_builder.pages.home.cta_templates}
								</button>
							</Link>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="mt-16 w-full max-w-7xl px-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.3 }}
							className="bg-white p-6 shadow-lg rounded-xl text-center border-t-4 border-blue-500"
						>
							<feature.icon className="w-12 h-12 mx-auto text-blue-500" />
							<h3 className="mt-4 text-xl font-semibold text-gray-800">
								{t.resume_builder.pages.home.features[feature.key]}
							</h3>
							<p className="mt-2 text-gray-600">
								{
									t.resume_builder.pages.home.features[
										feature.key + "_description"
									]
								}
							</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* How It Works Section */}
			<div className="mt-20 w-full max-w-7xl px-6 text-center">
				<h2 className="text-3xl font-bold text-gray-800">
					{t.resume_builder.pages.home.how_it_works.title}
				</h2>
				<p className="mt-2 text-gray-600">
					{t.resume_builder.pages.home.how_it_works.description}
				</p>
				<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
					{t.resume_builder.pages.home.how_it_works.steps.map((step, index) => (
						<motion.div
							key={index}
							className="bg-white p-6 shadow-lg rounded-xl"
						>
							<h3 className="text-xl font-semibold text-gray-800">
								{step.title}
							</h3>
							<p className="mt-2 text-gray-600">{step.description}</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* FAQ Section */}
			<FAQSection />

			{/* Final CTA Section */}
			<div className="mt-20 w-full max-w-7xl px-6 text-center">
				<h2 className="text-3xl font-bold text-gray-800">
					{t.resume_builder.pages.home.final_cta.title}
				</h2>
				<p className="mt-2 text-gray-600">
					{t.resume_builder.pages.home.final_cta.description}
				</p>
				<Link href="/builder">
					<button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 text-lg">
						{t.resume_builder.pages.home.final_cta.cta_text}
					</button>
				</Link>
			</div>
		</div>
	)
}

const features = [
	{
		key: "customization",
		icon: () => (
			<MdDesignServices className="w-12 h-12 mx-auto text-blue-500" />
		),
	},
	{
		key: "ai_assistance",
		icon: () => <AiOutlineRobot className="w-12 h-12 mx-auto text-blue-500" />,
	},
	{
		key: "export_options",
		icon: () => <MdFileDownload className="w-12 h-12 mx-auto text-blue-500" />,
	},
]

export default Home
