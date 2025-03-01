require("dotenv").config() // Load environment variables

module.exports = {
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	dialect: "mysql",
}
