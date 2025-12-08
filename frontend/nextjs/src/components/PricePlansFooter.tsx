export default function PricePlansFooter({
	activeTab,
	userProfile,
	loading,
	isEditing,
	saveLoading,
	profileModalTranslations,
	handleSave,
	setIsEditing,
	handleClose,
	handleViewPlans,
}) {
	return (
		<div className="border-t border-gray-200 p-6">
			{activeTab === "profile" && userProfile && !loading ? (
				isEditing ? (
					<div className="flex gap-3">
						<button
							onClick={() => setIsEditing(false)}
							disabled={saveLoading}
							className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
						>
							{profileModalTranslations.buttons.cancel || "Cancel"}
						</button>
						<button
							onClick={handleSave}
							disabled={saveLoading}
							className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
						>
							{saveLoading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
									{profileModalTranslations.buttons.saving || "Saving..."}
								</>
							) : (
								profileModalTranslations.buttons.save_changes || "Save Changes"
							)}
						</button>
					</div>
				) : (
					<div className="flex gap-3">
						<button
							onClick={() => setIsEditing(true)}
							disabled={loading}
							className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
						>
							{profileModalTranslations.buttons.edit_profile || "Edit Profile"}
						</button>
						<button
							onClick={handleClose}
							disabled={loading}
							className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
						>
							{profileModalTranslations.buttons.close || "Close"}
						</button>
					</div>
				)
			) : (
				<div className="flex justify-between">
					<button
						onClick={handleClose}
						className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
					>
						{profileModalTranslations.buttons.close || "Close"}
					</button>
					<button
						onClick={handleViewPlans}
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
					>
						{profileModalTranslations.buttons.view_all_plans || "View Plans"}
					</button>
				</div>
			)}
		</div>
	)
}
