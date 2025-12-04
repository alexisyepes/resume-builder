module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		planType: {
			type: DataTypes.ENUM("free", "basic", "premium", "enterprise"),
			defaultValue: "free",
			allowNull: false,
		},
		subscriptionStatus: {
			type: DataTypes.ENUM("active", "canceled", "past_due", "trialing"),
			defaultValue: "active",
		},
		downloadsRemaining: {
			type: DataTypes.INTEGER,
			defaultValue: 1, // Free plan gets 1 download
		},
		totalDownloads: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		subscriptionId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		subscriptionEndDate: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	})

	User.associate = (models) => {
		User.hasMany(models.Resume, { foreignKey: "userId", as: "resumes" })
	}

	return User
}
