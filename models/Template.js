module.exports = (sequelize, DataTypes) => {
	const Template = sequelize.define("Template", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: { type: DataTypes.STRING, allowNull: false },
		value: { type: DataTypes.STRING, allowNull: false },
		type: { type: DataTypes.ENUM("free", "paid"), allowNull: false },
		image: { type: DataTypes.STRING, allowNull: false },
	})

	return Template
}
