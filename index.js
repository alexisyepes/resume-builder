const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { sequelize } = require("./models")
const db = require("./models")

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const aiRoutes = require("./routes/ai")
app.use(aiRoutes)
sequelize.sync({ force: false }).then(function () {
	app.listen(PORT, () => {
		console.log(`🌎 ==> API server now on port ${PORT} and Database synced ✅!`)
	})
})
