module.exports = (sequelize, DataTypes) => {
	const Resume = sequelize.define("Resume", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: { type: DataTypes.UUID, allowNull: false },
		title: { type: DataTypes.STRING, allowNull: false },
		fileUrl: { type: DataTypes.STRING, allowNull: true },
		pdfUrl: { type: DataTypes.STRING, allowNull: true },
		templateId: { type: DataTypes.UUID, allowNull: false },

		fileName: { type: DataTypes.STRING, allowNull: true },
		fileFormat: { type: DataTypes.ENUM("pdf", "docx"), allowNull: false },
		fileSize: { type: DataTypes.INTEGER, allowNull: true },
		jobTitle: { type: DataTypes.STRING, allowNull: true },
		firstName: { type: DataTypes.STRING, allowNull: true },
		lastName: { type: DataTypes.STRING, allowNull: true },

		resumeData: { type: DataTypes.JSON, allowNull: true },
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
