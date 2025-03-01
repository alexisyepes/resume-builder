module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define("Order", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: { type: DataTypes.UUID, allowNull: false },
		stripeSessionId: { type: DataTypes.STRING, allowNull: false },
		amount: { type: DataTypes.FLOAT, allowNull: false },
		status: {
			type: DataTypes.ENUM("pending", "completed", "failed"),
			defaultValue: "pending",
		},
	})

	return Order
}
