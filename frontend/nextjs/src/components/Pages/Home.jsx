"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"
import { AiOutlineRobot } from "react-icons/ai"
import { MdDesignServices, MdFileDownload, MdVerified } from "react-icons/md"
import { FaRegSmile } from "react-icons/fa"
import FAQSection from "./FAQSection"

const Home = () => {
	const router = useRouter()
	const t = loadTranslations(router)

	return (
		<div className="min-h-screen pt-36 w-full flex flex-col items-center justify-center bg-cyan-50 px-6 py-10">
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
						<button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-lg">
							{t.resume_builder.pages.home.cta_builder}
						</button>
					</Link>
					<Link href="/templates">
						<button className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg shadow-md hover:bg-blue-100 text-lg">
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

			{/* How It Works Section */}
			<div className="mt-20 max-w-4xl text-center">
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

			<FAQSection />

			{/* Final CTA Section */}
			<div className="mt-20 text-center">
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

const Testimonial = ({ name, text }) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		className="bg-white p-6 shadow-lg rounded-xl text-center border-t-4 border-green-500"
	>
		<FaRegSmile className="w-12 h-12 mx-auto text-green-500" />
		<p className="mt-4 text-lg text-gray-700">"{text}"</p>
		<h4 className="mt-2 text-md font-semibold text-gray-800">- {name}</h4>
	</motion.div>
)

export default Home
