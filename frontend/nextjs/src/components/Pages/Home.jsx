"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import { AiOutlineRobot } from "react-icons/ai"
import { MdDesignServices, MdFileDownload } from "react-icons/md"

const Home = () => {
	const router = useRouter()
	const t = loadTranslations(router)

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-6">
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: -60 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center max-w-2xl"
			>
				<h1 className="text-4xl md:text-5xl font-bold text-gray-800">
					{t.resume_builder.pages.home.title}
				</h1>
				<p className="mt-4 text-lg text-gray-600">
					{t.resume_builder.pages.home.description}
				</p>
				<div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
					<Link href="/builder">
						<button className="px-6 py-3 text-lg">
							{t.resume_builder.pages.home.cta_builder}
						</button>
					</Link>
					<Link href="/templates">
						<button variant="outline" className="px-6 py-3 text-lg">
							{t.resume_builder.pages.home.cta_templates}
						</button>
					</Link>
				</div>
			</motion.div>

			{/* Features Section */}
			<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
				{features.map((feature, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: index * 0.3 }}
						className="bg-white p-6 shadow-md rounded-xl text-center"
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
