const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();
const PORT = process.env.PORT || 4000;

require("dotenv").config();

// Webhooks
const stripeWebhookRoutes = require("./webhooks/stripeWebhook");
app.use(
	"/webhooks/stripe",
	express.raw({ type: "application/json" }),
	stripeWebhookRoutes,
);

// Middleware
app.use(cors());
// Use express.json with increased limit for larger payloads
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");
const resumeRoutes = require("./routes/resume");
const userRoutes = require("./routes/users");
const paymentRoutes = require("./routes/stripe");
const resumeAnalyzerRoutes = require("./routes/resumeAnalyzer");

app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);
app.use("/resumes", resumeRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
app.use("/analyzer", resumeAnalyzerRoutes);

sequelize.sync({ force: false }).then(function () {
	app.listen(PORT, () => {
		console.log(
			`🌎 ==> API server now on port ${PORT} and Database synced ✅!`,
		);
	});
});
