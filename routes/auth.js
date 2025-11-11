const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")
const router = express.Router()

// Function to generate an access token @TODO
const generateAccessToken = (user) => {
	console.log(user)
	return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "10s" })
}

// Validate and refresh token on page refresh @TODO
router.post("/refresh-token", async (req, res) => {
	const token = req.body.token
	console.log("TOKEN", token)

	if (!token) return res.status(401).json({ message: "No token provided" })

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findByPk(decoded.id, {
			attributes: { exclude: ["password"] },
		})

		if (!user) return res.status(401).json({ message: "User not found" })

		const newAccessToken = generateAccessToken(user)
		res.json({ accessToken: newAccessToken })
	} catch (error) {
		res.status(401).json({ message: "Invalid or expired token" })
	}
})

router.get("/validate-token", async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1]

	if (!token) {
		return res
			.status(401)
			.json({ isValid: false, message: "No token provided" })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findByPk(decoded.id, {
			attributes: { exclude: ["password"] },
		})

		if (!user) {
			return res.status(401).json({ isValid: false, message: "User not found" })
		}

		const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		})

		res.json({ isValid: true, user, token: newToken })
	} catch (error) {
		return res
			.status(401)
			.json({ isValid: false, message: "Invalid or expired token" })
	}
})

// Register (Email & Password)
router.post("/register", async (req, res) => {
	const { provider, firstName, lastName, email, password } = req.body

	if (!email || !password || !firstName || !lastName) {
		return res.status(400).json({ message: "All fields are required" })
	}

	if (password.length < 8) {
		return res
			.status(400)
			.json({ message: "Password must be at least 8 characters" })
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	try {
		const existingUser = await User.findOne({ where: { email } })

		if (existingUser) {
			return res.status(400).json({ message: "Email already exists" })
		}

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			provider,
		})

		const userResponse = user.get({ plain: true })
		delete userResponse.password

		const token = jwt.sign({ id: userResponse.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		})

		res
			.status(201)
			.json({ message: "User registered", user: userResponse, token })
	} catch (error) {
		res.status(500).json({ message: "Error creating user", error })
	}
})

// Login
router.post("/login", async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ where: { email } })

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		const userResponse = user.get({ plain: true })
		delete userResponse.password

		const token = jwt.sign({ id: userResponse.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		})

		res.json({ token, user: userResponse })
	} catch (error) {
		res.status(500).json({ message: "Error during login", error })
	}
})

module.exports = router
