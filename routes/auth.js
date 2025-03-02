const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")
const router = express.Router()

router.get("/validate-token", async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1]

	if (!token) {
		return res.status(401).json({ isValid: false })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findByPk(decoded.id, {
			attributes: { exclude: ["password"] },
		})

		if (!user) {
			return res.status(401).json({ isValid: false })
		}

		res.json({ isValid: true, user })
	} catch (error) {
		res.status(401).json({ isValid: false })
	}
})

// Register (Email & Password)
router.post("/register", async (req, res) => {
	const { provider, email, password } = req.body
	const hashedPassword = await bcrypt.hash(password, 10)

	try {
		const user = await User.create({
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
