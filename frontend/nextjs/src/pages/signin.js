// src/App.js
import React, { useState } from "react"
import { motion } from "framer-motion"
import {
	FaUser,
	FaLock,
	FaEnvelope,
	FaArrowRight,
	FaGoogle,
} from "react-icons/fa"
import { useAuth } from "@/contexts/AuthContext"

const App = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const { login, register, signInWithGoogle } = useAuth()

	const toggleForm = () => {
		setIsLogin(!isLogin)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (isLogin) {
			login(email, password)
		} else {
			if (password !== confirmPassword) {
				alert("Passwords do not match!")
				return
			}
			register(username, email, password)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-50 to-blue-60">
			<motion.div
				className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">
					{isLogin ? "Login" : "Register"}
				</h2>
				<form onSubmit={handleSubmit}>
					{!isLogin && (
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-4"
						>
							<label className="block text-sm font-medium mb-2">Username</label>
							<div className="relative">
								<FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</motion.div>
					)}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Email</label>
						<div className="relative">
							<FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Password</label>
						<div className="relative">
							<FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
					{!isLogin && (
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-6"
						>
							<label className="block text-sm font-medium mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</motion.div>
					)}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
					>
						{isLogin ? "Login" : "Register"} <FaArrowRight className="ml-2" />
					</button>
					{!isLogin && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mt-4"
						>
							<button
								type="button"
								onClick={signInWithGoogle}
								className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
							>
								<FaGoogle className="mr-2" /> Sign up with Google
							</button>
						</motion.div>
					)}
				</form>
				<p className="mt-4 text-center">
					{isLogin ? "Don't have an account? " : "Already have an account? "}
					<button
						onClick={toggleForm}
						className="text-blue-500 hover:underline focus:outline-none"
					>
						{isLogin ? "Register" : "Login"}
					</button>
				</p>
			</motion.div>
		</div>
	)
}

export default App
