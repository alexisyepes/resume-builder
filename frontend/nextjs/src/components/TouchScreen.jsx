import { motion } from "framer-motion"
import { useEffect } from "react"
import { loadFull } from "tsparticles"
import { BsPersonVcard } from "react-icons/bs"
import { FaCloud, FaBrain, FaChartLine } from "react-icons/fa"
import { PieChart, Pie, Cell } from "recharts"

const TransparentTouchscreen = ({ firstName, lastName, jobTitle }) => {
	// Typing animation variants
	const typingVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: 1, // Delay before the animation starts
				staggerChildren: 0.2, // Delay between each character
			},
		},
	}

	// Character animation variants
	const characterVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	}

	// Text to be animated
	const typingText = "...generating your resume"

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
			await loadFull(window.tsParticles)
			await window.tsParticles.load({
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
							out_mode: "bounce",
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
					},
				},
			})
		}

		initParticles()
	}, [])

	return (
		<div className="relative flex items-start justify-center min-h-screen bg-black overflow-hidden">
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
			<div className="relative w-[70%] max-w-4xl mt-12 h-[800px] bg-black/20 backdrop-blur-lg border-8 border-purple-600/50 rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.5)] transform perspective-1000 rotate-x-6 rotate-y-6 overflow-hidden z-10">
				{/* Particle Animation */}
				<div id="tsparticles" className="absolute inset-0 z-0"></div>

				{/* Neon Glow Effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse rounded-lg"></div>

				{/* Screen Content */}
				<div className="relative z-10 flex flex-col justify-start h-full p-4 text-white">
					<div className="flex flex-col items-center justify-center text-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse">
						<BsPersonVcard size={100} />
						<h2 className="text-xl capitalize holographic-text">
							{firstName ? firstName : "John"} {lastName ? lastName : "Connor"}
						</h2>
						<h3 className="text-lg capitalize">
							{jobTitle ? jobTitle : "Project manager"}
						</h3>

						{/* Typing Animation */}
						<motion.h3
							className="text-lg mt-4 whitespace-pre-wrap"
							variants={typingVariants}
							initial="hidden"
							animate="visible"
						>
							{typingText.split("").map((char, index) => (
								<motion.span
									key={index}
									variants={characterVariants}
									style={{ display: "inline-block" }}
								>
									{char === " " ? "\u00A0" : char}{" "}
									{/* Replace spaces with non-breaking spaces */}
								</motion.span>
							))}
						</motion.h3>

						{/* Progress Bar Animation */}
						<motion.div
							className="w-full h-2 bg-purple-500/20 rounded-full mt-6 overflow-hidden"
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
						<div className="flex gap-6 mt-8">
							<motion.div
								className="p-4 bg-black/20 backdrop-blur-sm border border-purple-500/50 rounded-lg cursor-pointer"
								whileHover={{
									scale: 1.1,
									boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
								}}
							>
								<FaCloud className="text-3xl text-purple-500" />
								<p className="mt-2 text-sm">Cloud Sync</p>
							</motion.div>
							<motion.div
								className="p-4 bg-black/20 backdrop-blur-sm border border-blue-500/50 rounded-lg cursor-pointer"
								whileHover={{
									scale: 1.1,
									boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
								}}
							>
								<FaBrain className="text-3xl text-blue-500" />
								<p className="mt-2 text-sm">AI Analysis</p>
							</motion.div>
							<motion.div
								className="p-4 bg-black/20 backdrop-blur-sm border border-purple-500/50 rounded-lg cursor-pointer"
								whileHover={{
									scale: 1.1,
									boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
								}}
							>
								<FaChartLine className="text-3xl text-purple-500" />
								<p className="mt-2 text-sm">Analytics</p>
							</motion.div>
						</div>

						{/* Animated Data Visualization */}
						<div className="mt-8">
							<PieChart width={200} height={200}>
								<Pie
									data={data}
									cx={100}
									cy={100}
									innerRadius={60}
									outerRadius={80}
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
