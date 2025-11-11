import React from "react"
import {
	FaFileAlt,
	FaEdit,
	FaChartLine,
	FaDownload,
	FaStar,
	FaQuoteLeft,
} from "react-icons/fa"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"

export const servicesData = {
	en: {
		title: "Our Services",
		subtitle: "Leverage AI to create the perfect resume and boost your career.",
		services: [
			{
				icon: "FaFileAlt",
				title: "AI-Powered Resume Builder",
				description:
					"Create professional, ATS-friendly resumes in minutes with our AI-driven resume builder.",
			},
			{
				icon: "FaEdit",
				title: "Resume Customization",
				description:
					"Tailor your resume for specific job roles and industries with expert recommendations.",
			},
			{
				icon: "FaChartLine",
				title: "Career Insights",
				description:
					"Get actionable insights to improve your resume and increase your chances of landing interviews.",
			},
			{
				icon: "FaDownload",
				title: "Download & Apply",
				description:
					"Easily download your resume and start applying to your dream jobs.",
			},
		],
		testimonials: [
			{
				quote:
					"This AI resume builder helped me land my dream job! Highly recommended.",
				author: "John Doe",
				role: "Software Engineer",
			},
			{
				quote:
					"The customization options are fantastic. My resume looks professional and polished.",
				author: "Jane Smith",
				role: "Marketing Manager",
			},
		],
		pricing: [
			{
				title: "Basic",
				price: "Free",
				features: ["1 Resume", "Basic Templates", "Limited Customization"],
				cta: "Get Started",
			},
			{
				title: "Pro",
				price: "$9.99/month",
				features: [
					"Unlimited Resumes",
					"Premium Templates",
					"Advanced Customization",
					"Career Insights",
				],
				cta: "Subscribe",
			},
		],
	},
}

const Services = () => {
	const router = useRouter()
	const t = loadTranslations(router)
	// const { title, subtitle, services, testimonials, pricing } = servicesData.en

	// Map icons dynamically
	const iconComponents = {
		FaFileAlt: FaFileAlt,
		FaEdit: FaEdit,
		FaChartLine: FaChartLine,
		FaDownload: FaDownload,
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
			{/* Hero Section */}
			<div className="text-center mb-16">
				<motion.h1
					initial={{ opacity: 0, y: -60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-3xl mt-8 font-extrabold text-gray-900 sm:text-5xl"
				>
					{t.resume_builder.pages.services.title}
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mt-4 text-xl text-gray-600"
				>
					{t.resume_builder.pages.services.create_resume_in_minutes}
				</motion.p>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mt-8"
				>
					<Link href="/builder">
						<button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-lg">
							{t.resume_builder.pages.services.get_started}
						</button>
					</Link>
				</motion.div>
			</div>

			{/* Services Section */}
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						{t.resume_builder.pages.services.title}
					</h2>
					<p className="mt-4 text-xl text-gray-500">
						{t.resume_builder.pages.services.subtitle}
					</p>
				</div>
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{t.resume_builder.pages.services.services.map((service, index) => {
						const Icon = iconComponents[service.icon]
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className="pt-6 pb-8 px-6 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
							>
								<div className="flow-root">
									<div className="-mt-6">
										<div className="flex items-center justify-center w-16 h-16 mx-auto bg-cyan-500 rounded-full text-white">
											<Icon className="w-8 h-8" />
										</div>
										<h3 className="mt-6 text-lg font-medium text-gray-900 text-center">
											{service.title}
										</h3>
										<p className="mt-2 text-base text-gray-500 text-center">
											{service.description}
										</p>
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>

			{/* Testimonials Section */}
			<div className="max-w-7xl mx-auto mt-24">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
					{t.resume_builder.pages.services.what_our_users_say}
				</h2>
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
					{t.resume_builder.pages.services.testimonials.map(
						(testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className="bg-white p-8 rounded-lg shadow-lg"
							>
								<FaQuoteLeft className="text-cyan-500 w-8 h-8 mb-4" />
								<p className="text-gray-600 italic">"{testimonial.quote}"</p>
								<div className="mt-4 flex items-center">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
											{testimonial.author[0]}
										</div>
									</div>
									<div className="ml-4">
										<p className="text-gray-900 font-semibold">
											{testimonial.author}
										</p>
										<p className="text-gray-500">{testimonial.role}</p>
									</div>
								</div>
							</motion.div>
						)
					)}
				</div>
			</div>

			{/* Pricing Section */}
			<div className="max-w-7xl mx-auto mt-24">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
					{t.resume_builder.pages.services.pricing_plans}
				</h2>
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
					{t.resume_builder.pages.services.pricing.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							className="bg-white p-8 rounded-lg shadow-lg flex flex-col" // Add flex and flex-col
						>
							<div className="mb-8">
								<h3 className="text-2xl font-bold text-gray-900">
									{plan.title}
								</h3>
								<p className="mt-4 text-4xl font-extrabold text-cyan-500">
									{plan.price}
								</p>
								<ul className="mt-6 space-y-4">
									{plan.features.map((feature, i) => (
										<li key={i} className="flex items-center">
											<FaStar className="w-5 h-5 text-cyan-500 mr-2" />
											<span className="text-gray-600">{feature}</span>
										</li>
									))}
								</ul>
							</div>
							{/* Push the button to the bottom using mt-auto */}
							<button className="w-full bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-all mt-auto">
								{plan.cta}
							</button>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Services
