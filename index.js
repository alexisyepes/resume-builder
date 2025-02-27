const express = require("express")
const app = express()
const PORT = 4000
const cors = require("cors")
const punycode = require("punycode/")

require("dotenv").config()
app.use(cors())
const aiRoutes = require("./routes/ai")
app.use(express.json())
app.use(aiRoutes)

app.listen(PORT, () => {
	console.log("Server listening on port: " + PORT)
})
