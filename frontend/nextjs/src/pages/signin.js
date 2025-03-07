import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import {
	FaUser,
	FaLock,
	FaEnvelope,
	FaArrowRight,
	FaGoogle,
} from "react-icons/fa"
import { useAuth } from "@/contexts/AuthContext"
import useResumeStore from "@/store/useResumeStore"
import Image from "next/image"

const Signin = ({ props }) => {
	const [isLogin, setIsLogin] = useState(true)
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const { login, register, signInWithGoogle } = useAuth()
	const { authError, setAuthError } = useResumeStore()
	const router = useRouter()

	useEffect(() => {
		setAuthError(false)
	}, [])

	const toggleForm = () => {
		setIsLogin(!isLogin)
	}

	const handleSubmit = async (e, provider) => {
		e.preventDefault()
		if (!email || !password) {
			return alert("You must enter email and password!")
		}

		try {
			if (isLogin) {
				await login(email, password)
			} else {
				if (password !== confirmPassword) {
					alert("Passwords do not match!")
					return
				}
				await register(email, password, provider)
			}
		} catch (error) {
			console.error("Authentication failed:", error)
			alert("Authentication failed. Please try again.")
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			await signInWithGoogle()
			// Redirect to the intended destination or a default page
			router.push("/builder")
		} catch (error) {
			console.error("Google sign-in failed:", error)
			alert("Google sign-in failed. Please try again.")
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
				<div className="flex justify-center">
					<Image
						alt="logo"
						width={70}
						height={70}
						src={"/images/resume-logo.png"}
					/>
				</div>
				<hr className="my-4" />
				<h2 className="text-2xl font-bold mb-6 text-center">
					{isLogin ? "Login" : "Register"}
				</h2>
				<form onSubmit={handleSubmit}>
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
					{authError && (
						<p className="text-red-500 text-center my-4">{authError}!</p>
					)}

					{!isLogin ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mt-4"
						>
							<button
								onClick={(e) => handleSubmit(e, "email")}
								type="submit"
								className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
							>
								Register
								<FaArrowRight className="ml-2" />
							</button>
							<p className="my-4 text-center">Or</p>
							<button
								type="button"
								onClick={handleGoogleSignIn}
								className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
							>
								<FaGoogle className="mr-2" /> Sign up with Google
							</button>
						</motion.div>
					) : (
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
						>
							Login <FaArrowRight className="ml-2" />
						</button>
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

export default Signin

export async function getStaticProps() {
	return {
		props: {
			BACKEND_SERVER: process.env.NEXT_PUBLIC_BACKEND_SERVER,
		},
	}
}
