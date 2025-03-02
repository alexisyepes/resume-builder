const express = require("express")
const cors = require("cors")
const { sequelize } = require("./models")
const app = express()
const PORT = process.env.PORT || 4000

require("dotenv").config()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require("./routes/auth")
const aiRoutes = require("./routes/ai")

app.use(aiRoutes)
app.use(authRoutes)

sequelize.sync({ force: false }).then(function () {
	app.listen(PORT, () => {
		console.log(`🌎 ==> API server now on port ${PORT} and Database synced ✅!`)
	})
})
