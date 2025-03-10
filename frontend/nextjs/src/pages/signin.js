import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { FaLock, FaEnvelope, FaArrowRight, FaGoogle } from "react-icons/fa"
import { useAuth } from "@/contexts/AuthContext"
import useResumeStore from "@/store/useResumeStore"
import Image from "next/image"
\import { loadTranslations } from "@/utils"

const Signin = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const { login, register, signInWithGoogle } = useAuth()
	const { authError, setAuthError } = useResumeStore()
	const router = useRouter()
	const t = loadTranslations(router)

	useEffect(() => {
		setAuthError(false)
	}, [])

	const toggleForm = () => {
		setIsLogin(!isLogin)
	}

	const handleSubmit = async (e, provider) => {
		e.preventDefault()
		if (!email || !password) {
			return alert(t.resume_builder.pages.signin.errors.validation)
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
					{isLogin
						? t.resume_builder.pages.signin.title
						: t.resume_builder.pages.signin.register}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">
							{t.resume_builder.pages.signin.email}
						</label>
						<div className="relative">
							<FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="email"
								placeholder={t.resume_builder.pages.signin.email}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">
							{t.resume_builder.pages.signin.password}
						</label>
						<div className="relative">
							<FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="password"
								placeholder={t.resume_builder.pages.signin.password}
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
								{t.resume_builder.pages.signin.confirm_password}
							</label>
							<div className="relative">
								<FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="password"
									placeholder={t.resume_builder.pages.signin.confirm_password}
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
								{t.resume_builder.pages.signin.register}
								<FaArrowRight className="ml-2" />
							</button>
							<p className="my-4 text-center">
								{t.resume_builder.pages.signin.or}
							</p>
							<button
								type="button"
								onClick={handleGoogleSignIn}
								className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
							>
								<FaGoogle className="mr-2" />
								{t.resume_builder.pages.signin.signup_with_google}
							</button>
						</motion.div>
					) : (
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
						>
							{t.resume_builder.pages.signin.title}{" "}
							<FaArrowRight className="ml-2" />
						</button>
					)}
				</form>
				<p className="mt-4 text-center">
					{isLogin
						? `${t.resume_builder.pages.signin.no_account} `
						: `${t.resume_builder.pages.signin.already_an_account} `}
					<button
						onClick={toggleForm}
						className="text-blue-500 hover:underline focus:outline-none"
					>
						{isLogin
							? t.resume_builder.pages.signin.register
							: t.resume_builder.pages.signin.title}
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
