module.exports = (sequelize, DataTypes) => {
	const Subscription = sequelize.define("Subscription", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: { type: DataTypes.UUID, allowNull: false },
		stripeSubscriptionId: { type: DataTypes.STRING, allowNull: false },
		plan: { type: DataTypes.ENUM("free", "premium"), defaultValue: "free" },
		expiresAt: { type: DataTypes.DATE, allowNull: false },
	})

	return Subscription
}
