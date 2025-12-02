module.exports = (sequelize, DataTypes) => {
	const Resume = sequelize.define("Resume", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: { type: DataTypes.UUID, allowNull: false },
		title: { type: DataTypes.STRING, allowNull: false },
		fileUrl: { type: DataTypes.STRING, allowNull: false },
		templateId: { type: DataTypes.UUID, allowNull: false },
	})

	Resume.associate = (models) => {
		Resume.belongsTo(models.User, { foreignKey: "userId", as: "user" })
		Resume.belongsTo(models.Template, {
			foreignKey: "templateId",
			as: "template",
		})
	}

	return Resume
}
