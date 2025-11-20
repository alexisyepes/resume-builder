import { motion } from "framer-motion"
import { useEffect } from "react"
import { loadFull } from "tsparticles"
import type { ISourceOptions } from "@tsparticles/engine"
import { BsPersonVcard } from "react-icons/bs"
import { FaCloud, FaBrain, FaChartLine } from "react-icons/fa"
import { PieChart, Pie, Cell } from "recharts"
import { useRouter } from "next/router"
import { loadTranslations } from "@/utils"

type TransparentTouchscreenProps = {
	firstName: string
	lastName: string
	jobTitle: string
}

type ParticlesWindow = Window &
	typeof globalThis & {
		tsParticles?: {
			load: (config: { id: string; options: ISourceOptions }) => Promise<void>
		}
	}

const TransparentTouchscreen = ({
	firstName,
	lastName,
	jobTitle,
}: TransparentTouchscreenProps) => {
	const router = useRouter()
	const t = loadTranslations(router)

	// Typing animation variants
	const typingVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: 1,
				staggerChildren: 0.2,
			},
		},
	}

	// Character animation variants
	const characterVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	}

	// Data for the pie chart
	const data = [
		{ name: "Skills", value: 80 },
		{ name: "Experience", value: 70 },
		{ name: "Education", value: 90 },
	]
	const COLORS = ["#3b82f6", "#8b5cf6", "#6366f1"]

	// Initialize particles
	useEffect(() => {
		const initParticles = async () => {
			const particlesWindow = window as ParticlesWindow

			if (!particlesWindow.tsParticles) return

			await loadFull(particlesWindow.tsParticles)
			await particlesWindow.tsParticles.load({
				id: "tsparticles",
				options: {
					background: {
						color: {
							value: "transparent",
						},
					},
					particles: {
						number: {
							value: 50,
						},
						color: {
							value: ["#3b82f6", "#8b5cf6"],
						},
						shape: {
							type: "circle",
						},
						size: {
							value: { min: 1, max: 3 },
						},
						move: {
							enable: true,
							speed: 2,
							direction: "none",
							random: true,
							straight: false,
							outModes: {
								default: "bounce",
							},
						},
						opacity: {
							value: { min: 0.3, max: 0.7 },
						},
					},
					interactivity: {
						events: {
							onHover: {
								enable: true,
								mode: "repulse",
							},
						},
						modes: {
							repulse: {
								distance: 100,
							},
						},
					},
				},
			})
		}

		void initParticles()
	}, [])

	return (
		<div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4 sm:px-6 lg:px-8">
			{/* Background Video */}
			<video
				autoPlay
				loop
				muted
				className="absolute inset-0 w-full h-full object-cover z-0"
			>
				<source src="/videos/ai_office.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{/* 3D Transparent Touchscreen Container */}
			<div
				className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-4xl 
				h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] 
				mt-4 sm:mt-8 md:mt-12 
				bg-black/20 backdrop-blur-lg 
				border-4 sm:border-6 lg:border-8 border-purple-600/50 
				rounded-xl sm:rounded-2xl lg:rounded-3xl 
				shadow-[0_0_20px_rgba(99,102,241,0.3)] sm:shadow-[0_0_30px_rgba(99,102,241,0.4)] lg:shadow-[0_0_40px_rgba(99,102,241,0.5)] 
				transform perspective-1000 rotate-x-2 rotate-y-2 sm:rotate-x-4 sm:rotate-y-4 lg:rotate-x-6 lg:rotate-y-6 
				overflow-hidden z-10"
			>
				{/* Particle Animation */}
				<div id="tsparticles" className="absolute inset-0 z-0"></div>

				{/* Neon Glow Effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse rounded-lg"></div>

				{/* Screen Content */}
				<div className="relative z-10 flex flex-col justify-center items-center h-full p-3 sm:p-4 text-white">
					<div className="flex flex-col items-center justify-center text-center w-full max-w-md mx-auto">
						{/* Profile Icon */}
						<BsPersonVcard className="text-4xl sm:text-6xl lg:text-8xl mb-2 sm:mb-4" />

						{/* Name */}
						<h2 className="text-lg sm:text-xl lg:text-2xl capitalize holographic-text mb-1 sm:mb-2 px-2">
							{firstName ||
								t.resume_builder.pages.home.demo_animation
									.default_first_name}{" "}
							{lastName ||
								t.resume_builder.pages.home.demo_animation.default_last_name}
						</h2>

						{/* Job Title */}
						<h3 className="text-base sm:text-lg lg:text-xl capitalize mb-3 sm:mb-4 px-2">
							{jobTitle ||
								t.resume_builder.pages.home.demo_animation.default_job_title}
						</h3>

						{/* Typing Animation */}
						<motion.h3
							className="text-sm sm:text-base lg:text-lg mt-2 sm:mt-4 whitespace-pre-wrap px-2 sm:px-4"
							variants={typingVariants}
							initial="hidden"
							animate="visible"
						>
							{t.resume_builder.pages.home.demo_animation.generating_text
								.split("")
								.map((char, index) => (
									<motion.span
										key={index}
										variants={characterVariants}
										style={{ display: "inline-block" }}
									>
										{char === " " ? "\u00A0" : char}
									</motion.span>
								))}
						</motion.h3>

						{/* Progress Bar Animation */}
						<motion.div
							className="w-full max-w-xs sm:max-w-sm h-1 sm:h-2 bg-purple-500/20 rounded-full mt-4 sm:mt-6 overflow-hidden"
							initial={{ width: 0 }}
							animate={{ width: "100%" }}
							transition={{
								duration: 4,
								delay: 1,
								ease: "easeInOut",
								repeat: Infinity,
								repeatType: "reverse",
							}}
						>
							<motion.div
								className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
								initial={{ width: 0 }}
								animate={{ width: "100%" }}
								transition={{
									duration: 4,
									delay: 1,
									ease: "easeInOut",
									repeat: Infinity,
									repeatType: "reverse",
								}}
							/>
						</motion.div>

						{/* Glowing Icons for Features */}
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-8 px-2">
							<motion.div
								className="p-2 sm:p-3 lg:p-4 bg-black/20 backdrop-blur-sm border border-purple-500/50 rounded-lg cursor-pointer flex-1 min-w-[100px] max-w-[120px] sm:max-w-none"
								whileHover={{
									scale: 1.05,
									boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
								}}
							>
								<FaCloud className="text-xl sm:text-2xl lg:text-3xl text-purple-500 mx-auto" />
								<p className="mt-1 sm:mt-2 text-xs sm:text-sm text-center">
									{t.resume_builder.pages.home.demo_animation.cloud_sync}
								</p>
							</motion.div>
							<motion.div
								className="p-2 sm:p-3 lg:p-4 bg-black/20 backdrop-blur-sm border border-blue-500/50 rounded-lg cursor-pointer flex-1 min-w-[100px] max-w-[120px] sm:max-w-none"
								whileHover={{
									scale: 1.05,
									boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
								}}
							>
								<FaBrain className="text-xl sm:text-2xl lg:text-3xl text-blue-500 mx-auto" />
								<p className="mt-1 sm:mt-2 text-xs sm:text-sm text-center">
									{t.resume_builder.pages.home.demo_animation.ai_analysis}
								</p>
							</motion.div>
							<motion.div
								className="p-2 sm:p-3 lg:p-4 bg-black/20 backdrop-blur-sm border border-purple-500/50 rounded-lg cursor-pointer flex-1 min-w-[100px] max-w-[120px] sm:max-w-none"
								whileHover={{
									scale: 1.05,
									boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
								}}
							>
								<FaChartLine className="text-xl sm:text-2xl lg:text-3xl text-purple-500 mx-auto" />
								<p className="mt-1 sm:mt-2 text-xs sm:text-sm text-center">
									{t.resume_builder.pages.home.demo_animation.analytics}
								</p>
							</motion.div>
						</div>

						{/* Animated Data Visualization */}
						<div className="mt-4 sm:mt-6 lg:mt-8 scale-75 sm:scale-90 lg:scale-100">
							<PieChart
								width={150}
								height={150}
								className="sm:w-[200px] sm:h-[200px]"
							>
								<Pie
									data={data}
									cx={75}
									cy={75}
									innerRadius={40}
									outerRadius={60}
									fill="#8884d8"
									dataKey="value"
								>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
							</PieChart>
						</div>
					</div>
				</div>

				{/* Simulated Screen Reflection */}
				<div className="absolute inset-0 opacity-30 bg-gradient-to-b from-white/10 to-transparent"></div>
			</div>

			{/* Cinematic Lighting Effect */}
			<div className="absolute inset-0 pointer-events-none bg-radial-gradient from-blue-500/10 to-transparent z-0"></div>
		</div>
	)
}

export default TransparentTouchscreen
