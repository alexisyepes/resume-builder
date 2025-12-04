const express = require("express")
const cors = require("cors")
const { sequelize } = require("./models")
const app = express()
const PORT = process.env.PORT || 4000

require("dotenv").config()

// Middleware
app.use(cors())
// Use express.json with increased limit for larger payloads
app.use(express.json({ limit: "150mb" }))
app.use(express.urlencoded({ limit: "150mb", extended: true }))

// Routes
const authRoutes = require("./routes/auth")
const aiRoutes = require("./routes/ai")
const resumeRoutes = require("./routes/resume")
const userRoutes = require("./routes/users")

app.use("/auth", authRoutes)
app.use("/ai", aiRoutes)
app.use("/resumes", resumeRoutes)
app.use("/users", userRoutes)

sequelize.sync({ force: false }).then(function () {
	app.listen(PORT, () => {
		console.log(`🌎 ==> API server now on port ${PORT} and Database synced ✅!`)
	})
})
