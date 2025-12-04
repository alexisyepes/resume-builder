// migrations/XXXXXX-add-plan-fields-to-users.js
"use strict"

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Users", "planType", {
			type: Sequelize.ENUM("free", "basic", "premium", "enterprise"),
			defaultValue: "free",
			allowNull: false,
		})

		await queryInterface.addColumn("Users", "subscriptionStatus", {
			type: Sequelize.ENUM("active", "canceled", "past_due", "trialing"),
			defaultValue: "active",
			allowNull: false,
		})

		await queryInterface.addColumn("Users", "downloadsRemaining", {
			type: Sequelize.INTEGER,
			defaultValue: 1,
		})

		await queryInterface.addColumn("Users", "totalDownloads", {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		})

		await queryInterface.addColumn("Users", "subscriptionId", {
			type: Sequelize.STRING,
			allowNull: true,
		})

		await queryInterface.addColumn("Users", "subscriptionEndDate", {
			type: Sequelize.DATE,
			allowNull: true,
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Users", "planType")
		await queryInterface.removeColumn("Users", "subscriptionStatus")
		await queryInterface.removeColumn("Users", "downloadsRemaining")
		await queryInterface.removeColumn("Users", "totalDownloads")
		await queryInterface.removeColumn("Users", "subscriptionId")
		await queryInterface.removeColumn("Users", "subscriptionEndDate")

		// Eliminar los tipos ENUM
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_Users_planType";'
		)
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_Users_subscriptionStatus";'
		)
	},
}
