import {
	FaLightbulb,
	FaUsers,
	FaHandshake,
	FaRocket,
	FaClock,
	FaUserCheck,
} from "react-icons/fa"
import { motion } from "framer-motion"
import { useContext } from "react"
import { RESUME_CONTEXT } from "@/contexts/resumeContext"

const heroImage = "/images/about_hero.jpg"

export const aboutData = {
	en: {
		title: "About Us",
		subtitle: "We are revolutionizing the way resumes are built using AI.",
		mission: {
			title: "Our Mission",
			description:
				"Our mission is to empower job seekers with tools that make resume building effortless, efficient, and effective. We leverage AI to help you stand out in a competitive job market.",
		},
		values: [
			{
				icon: "FaLightbulb",
				title: "Innovation",
				description:
					"We constantly innovate to provide cutting-edge solutions for resume building.",
			},
			{
				icon: "FaUsers",
				title: "User-Centric",
				description:
					"Our tools are designed with the user in mind, ensuring a seamless experience.",
			},
			{
				icon: "FaHandshake",
				title: "Integrity",
				description:
					"We believe in transparency and honesty in everything we do.",
			},
		],
		whyChooseUs: [
			{
				icon: "FaRocket",
				title: "AI-Powered",
				description:
					"Our platform uses advanced AI to create resumes that stand out to employers.",
			},
			{
				icon: "FaClock",
				title: "Save Time",
				description: "Build a professional resume in minutes, not hours.",
			},
			{
				icon: "FaUserCheck",
				title: "Tailored for You",
				description:
					"Customize your resume for specific job roles and industries.",
			},
		],
	},
}

const About = () => {
	const { t } = useContext(RESUME_CONTEXT)
	const about = t.resume_builder.pages.about

	// Map icons dynamically
	const iconComponents = {
		FaLightbulb: FaLightbulb,
		FaUsers: FaUsers,
		FaHandshake: FaHandshake,
		FaRocket: FaRocket,
		FaClock: FaClock,
		FaUserCheck: FaUserCheck,
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
			{/* Hero Section with Image */}
			<div className="relative h-96 sm:h-[500px]">
				<img
					src={heroImage}
					alt="Hero"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="text-center">
						<motion.h1
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl sm:text-6xl font-extrabold text-white"
						>
							{about.title}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="mt-4 text-xl sm:text-2xl text-white"
						>
							{about.subtitle}
						</motion.p>
					</div>
				</div>
			</div>

			{/* Mission Section */}
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						{about.mission.title}
					</h2>
					<p className="mt-4 text-xl text-gray-600">
						{about.mission.description}
					</p>
				</div>
			</div>

			{/* Values Section */}
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
					{about.our_values_title}
				</h2>
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{about.values.map((value, index) => {
						const Icon = iconComponents[value.icon]
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className="bg-white p-8 rounded-lg shadow-lg flex flex-col"
							>
								<div className="flex items-center justify-center w-16 h-16 mx-auto bg-cyan-500 rounded-full text-white">
									<Icon className="w-8 h-8" />
								</div>
								<h3 className="mt-6 text-2xl font-bold text-gray-900 text-center">
									{value.title}
								</h3>
								<p className="mt-4 text-xl text-gray-600 text-center">
									{value.description}
								</p>
							</motion.div>
						)
					})}
				</div>
			</div>

			{/* Why Choose Us Section */}
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
					{about.whyChooseUs_title}
				</h2>
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{about.whyChooseUs.map((reason, index) => {
						const Icon = iconComponents[reason.icon]
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className="bg-white p-8 rounded-lg shadow-lg flex flex-col"
							>
								<div className="flex items-center justify-center w-16 h-16 mx-auto bg-cyan-500 rounded-full text-white">
									<Icon className="w-8 h-8" />
								</div>
								<h3 className="mt-6 text-2xl font-bold text-gray-900 text-center">
									{reason.title}
								</h3>
								<p className="mt-4 text-xl text-gray-600 text-center">
									{reason.description}
								</p>
							</motion.div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default About
