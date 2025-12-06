import React, { useState, useEffect } from "react"
import {
	FiUser,
	FiMail,
	FiX,
	FiAlertCircle,
	FiCheck,
	FiStar,
	FiZap,
	FiBriefcase,
	FiGlobe,
} from "react-icons/fi"
import { FaUserCircle } from "react-icons/fa"
import { useRouter } from "next/navigation"

interface ProfileModalProps {
	isOpen: boolean
	onClose: () => void
	userProfile: any
	loading: boolean
	error: string | null
	onUpdateProfile: (data: any) => Promise<boolean>
	profileModalTranslations: any
}

const ProfileModal: React.FC<ProfileModalProps> = ({
	isOpen,
	onClose,
	userProfile,
	loading,
	error,
	onUpdateProfile,
	profileModalTranslations,
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedProfile, setEditedProfile] = useState<any>(null)
	const [saveLoading, setSaveLoading] = useState(false)
	const [saveError, setSaveError] = useState<string | null>(null)
	const [activeTab, setActiveTab] = useState<"profile" | "billing">("profile")
	const router = useRouter()

	useEffect(() => {
		if (userProfile) {
			setEditedProfile({ ...userProfile })
		}
	}, [userProfile])

	const handleClose = () => {
		if (saveLoading) return

		if (isEditing) {
			if (window.confirm("You have unsaved changes. Close anyway?")) {
				setIsEditing(false)
				onClose()
			}
		} else {
			onClose()
		}
	}

	const handleSave = async () => {
		if (!editedProfile || !userProfile) return

		setSaveLoading(true)
		setSaveError(null)

		try {
			const updateData: any = {}

			if (editedProfile.firstName !== userProfile.firstName) {
				updateData.firstName = editedProfile.firstName
			}

			if (editedProfile.lastName !== userProfile.lastName) {
				updateData.lastName = editedProfile.lastName
			}

			const success = await onUpdateProfile(updateData)

			if (success) {
				setIsEditing(false)
			} else {
				setSaveError("Failed to save changes. Please try again.")
			}
		} catch (error) {
			setSaveError("An unexpected error occurred. Please try again.")
		} finally {
			setSaveLoading(false)
		}
	}

	const handleViewPlans = () => {
		onClose()
		router.push("/pricing")
	}

	const handleUpgradePlan = (plan: string) => {
		console.log(`Upgrading to ${plan} plan`)
		// TODO: Integrar con Stripe
		alert(`Upgrading to ${plan} plan - Stripe integration coming soon!`)
	}

	const getPlanColor = (planType: string) => {
		switch (planType) {
			case "enterprise":
				return "bg-gradient-to-r from-purple-600 to-indigo-600"
			case "premium":
				return "bg-gradient-to-r from-pink-600 to-rose-600"
			case "basic":
				return "bg-gradient-to-r from-blue-600 to-cyan-600"
			case "free":
			default:
				return "bg-gradient-to-r from-gray-600 to-gray-700"
		}
	}

	const getPlanIcon = (planType: string) => {
		switch (planType) {
			case "enterprise":
				return <FiGlobe className="text-white" size={20} />
			case "premium":
				return <FiStar className="text-white" size={20} />
			case "basic":
				return <FiBriefcase className="text-white" size={20} />
			case "free":
			default:
				return <FiZap className="text-white" size={20} />
		}
	}

	const getPlanName = (planType: string) => {
		switch (planType) {
			case "enterprise":
				return (
					profileModalTranslations.billing.enterprise_plan.name || "Enterprise"
				)
			case "premium":
				return profileModalTranslations.billing.premium_plan.name || "Premium"
			case "basic":
				return profileModalTranslations.billing.basic_plan.name || "Basic"
			case "free":
			default:
				return profileModalTranslations.billing.free_plan.name || "Free"
		}
	}

	const getPlanFeatures = (planType: string) => {
		const features = {
			free: [
				profileModalTranslations.billing.free_plan.features[0],
				profileModalTranslations.billing.free_plan.features[1],
				profileModalTranslations.billing.free_plan.features[2],
			],
			basic: [
				profileModalTranslations.billing.basic_plan.features[0],
				profileModalTranslations.billing.basic_plan.features[1],
				profileModalTranslations.billing.basic_plan.features[2],
				profileModalTranslations.billing.basic_plan.features[3],
			],
			premium: [
				profileModalTranslations.billing.premium_plan.features[0],
				profileModalTranslations.billing.premium_plan.features[1],
				profileModalTranslations.billing.premium_plan.features[2],
				profileModalTranslations.billing.premium_plan.features[3],
				profileModalTranslations.billing.premium_plan.features[4],
			],
			enterprise: [
				profileModalTranslations.billing.enterprise_plan.features[0],
				profileModalTranslations.billing.enterprise_plan.features[1],
				profileModalTranslations.billing.enterprise_plan.features[2],
				profileModalTranslations.billing.enterprise_plan.features[3],
				profileModalTranslations.billing.enterprise_plan.features[4],
			],
		}
		return features[planType as keyof typeof features] || features.free
	}

	if (!isOpen) return null

	return (
		<>
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300" />

			<div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
					{/* Header */}
					<div className="bg-gradient-to-r from-cyan-600 to-cyan-800 p-6 relative">
						<button
							onClick={handleClose}
							className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
							aria-label="Close"
						>
							<FiX size={24} />
						</button>

						{userProfile ? (
							<div className="flex items-center space-x-4">
								<div className="bg-white/20 p-3 rounded-full">
									<FaUserCircle size={48} className="text-white" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">
										{userProfile.firstName} {userProfile.lastName}
									</h2>
									<p className="text-white/80 flex items-center gap-2 mt-1">
										<FiMail size={14} />
										{userProfile.email}
									</p>
								</div>
							</div>
						) : null}
					</div>

					{/* Tabs */}
					<div className="border-b border-gray-200">
						<div className="flex">
							<button
								onClick={() => setActiveTab("profile")}
								className={`flex-1 py-4 text-center font-medium transition-colors ${
									activeTab === "profile"
										? "text-blue-600 border-b-2 border-blue-600"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								{profileModalTranslations.tabs.profile_info || "Profile Info"}
							</button>
							<button
								onClick={() => setActiveTab("billing")}
								className={`flex-1 py-4 text-center font-medium transition-colors ${
									activeTab === "billing"
										? "text-blue-600 border-b-2 border-blue-600"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								{profileModalTranslations.tabs.plan_billing ||
									"Billing & Plans"}
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="p-6 overflow-y-auto max-h-[50vh]">
						{activeTab === "profile" ? (
							<>
								{error || saveError ? (
									<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
										<FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
										<p className="text-red-700 text-sm">{error || saveError}</p>
									</div>
								) : null}

								{loading ? (
									<div className="space-y-6">
										<div className="space-y-4">
											{[1, 2, 3, 4].map((i) => (
												<div key={i} className="space-y-2">
													<div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
													<div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
												</div>
											))}
										</div>
									</div>
								) : userProfile && editedProfile ? (
									<div className="space-y-6">
										{/* Current Plan Summary */}
										<div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border p-4">
											<div className="flex justify-between items-center">
												<div>
													<p className="text-sm text-gray-600">
														{profileModalTranslations.profile.current_plan ||
															"Current Plan"}
													</p>
													<p className="text-xl font-bold text-gray-900">
														{getPlanName(userProfile.planType)}{" "}
														{profileModalTranslations.profile.plan || "Plan"}
													</p>
												</div>
												<button
													onClick={() => setActiveTab("billing")}
													className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
												>
													{profileModalTranslations.profile.change_plan ||
														"Change Plan"}
												</button>
											</div>
										</div>

										{/* Profile Form */}
										<div className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
														<FiUser size={16} />
														{profileModalTranslations.profile.first_name ||
															"First Name"}
													</label>
													{isEditing ? (
														<input
															type="text"
															value={editedProfile.firstName || ""}
															onChange={(e) =>
																setEditedProfile({
																	...editedProfile,
																	firstName: e.target.value,
																})
															}
															className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
															disabled={saveLoading}
														/>
													) : (
														<div className="px-4 py-3 bg-gray-50 rounded-lg border">
															{userProfile.firstName || "Not set"}
														</div>
													)}
												</div>

												<div className="space-y-2">
													<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
														<FiUser size={16} />
														{profileModalTranslations.profile.last_name ||
															"Last Name"}
													</label>
													{isEditing ? (
														<input
															type="text"
															value={editedProfile.lastName || ""}
															onChange={(e) =>
																setEditedProfile({
																	...editedProfile,
																	lastName: e.target.value,
																})
															}
															className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
															disabled={saveLoading}
														/>
													) : (
														<div className="px-4 py-3 bg-gray-50 rounded-lg border">
															{userProfile.lastName || "Not set"}
														</div>
													)}
												</div>
											</div>

											<div className="space-y-2">
												<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
													<FiMail size={16} />
													{profileModalTranslations.profile.email ||
														"Email Address"}
												</label>
												<div className="px-4 py-3 bg-gray-50 rounded-lg border text-gray-600">
													{userProfile.email}
												</div>
												<p className="text-xs text-gray-500">
													{profileModalTranslations.profile
														.email_cannot_change || "Email cannot be changed"}
												</p>
											</div>
										</div>
									</div>
								) : (
									<div className="text-center py-8">
										<FiAlertCircle
											className="mx-auto text-gray-400 mb-3"
											size={48}
										/>
										<p className="text-gray-600">
											{profileModalTranslations.profile.loading_error ||
												"Unable to load profile data"}
										</p>
									</div>
								)}
							</>
						) : (
							/* Billing & Plans Tab */
							<div className="space-y-6">
								{/* Current Plan Card */}
								<div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div
												className={`p-3 rounded-lg ${getPlanColor(
													userProfile?.planType || "free"
												)}`}
											>
												{getPlanIcon(userProfile?.planType || "free")}
											</div>
											<div>
												<h3 className="text-lg font-bold text-gray-900">
													{getPlanName(userProfile?.planType || "free")}{" "}
													{profileModalTranslations.profile.plan || "Plan"}
												</h3>
												<p
													className={`${
														userProfile?.downloadsRemaining === 0
															? "text-red-600"
															: "text-gray-600"
													}`}
												>
													{userProfile?.planType === "free"
														? profileModalTranslations.profile
																.downloads_remaining || 1
														: "Unlimited downloads"}{" "}
													{userProfile?.downloadsRemaining}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-2xl font-bold text-gray-900">
												{userProfile?.planType === "free"
													? profileModalTranslations.billing.free_plan.name
													: userProfile?.planType === "basic"
													? "$9.99/mo"
													: userProfile?.planType === "premium"
													? "$19.99/mo"
													: "Custom"}
											</p>
											<p className="text-sm text-gray-600">
												{profileModalTranslations.profile.current_plan ||
													"Current plan"}
											</p>
										</div>
									</div>

									<div className="space-y-2">
										<h4 className="font-medium text-gray-700">
											{profileModalTranslations.profile.plan_features ||
												"Plan Features:"}
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
											{getPlanFeatures(userProfile?.planType || "free").map(
												(feature, index) => (
													<div key={index} className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">{feature}</span>
													</div>
												)
											)}
										</div>
									</div>
								</div>

								{/* Available Plans */}
								<div>
									<h3 className="text-lg font-bold text-gray-900 mb-4">
										{profileModalTranslations.billing.available_plans ||
											"Available Plans"}
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{/* Free Plan */}
										<div
											className={`flex flex-col h-full border rounded-xl p-6 ${
												userProfile?.planType === "free"
													? "border-blue-500 bg-blue-50"
													: "border-gray-200"
											}`}
										>
											{/* Header */}
											<div className="flex items-center gap-3 mb-4">
												<div className="p-2 bg-gray-600 rounded-lg">
													<FiZap className="text-white" size={20} />
												</div>
												<div>
													<h4 className="font-bold text-gray-900">
														{profileModalTranslations.billing.free_plan.name ||
															"Free"}
													</h4>
													<p className="text-sm text-gray-600">
														{profileModalTranslations.billing.free_plan
															.description || "For individuals"}
													</p>
												</div>
											</div>

											{/* Price */}
											<p className="text-3xl font-bold text-gray-900 mb-4">
												$0
												<span className="text-sm text-gray-600">
													/{profileModalTranslations.billing.month || "month"}
												</span>
											</p>

											{/* Features */}
											<div className="flex-grow mb-6">
												<ul className="space-y-2">
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.free_plan
																.features[0] || "1 Resume Download"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.free_plan
																.features[1] || "3 Templates"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.free_plan
																.features[2] || "Basic Support"}
														</span>
													</li>
												</ul>
											</div>

											{/* Button */}
											<div className="mt-auto">
												<button
													onClick={() =>
														userProfile?.planType !== "free" &&
														handleUpgradePlan("free")
													}
													disabled={userProfile?.planType === "free"}
													className={`w-full py-2 rounded-lg font-medium ${
														userProfile?.planType === "free"
															? "bg-gray-100 text-gray-400 cursor-default"
															: "bg-gray-200 text-gray-800 hover:bg-gray-300"
													}`}
												>
													{userProfile?.planType === "free"
														? profileModalTranslations.profile.current_plan ||
														  "Current Plan"
														: "Downgrade"}
												</button>
											</div>
										</div>

										{/* Basic Plan */}
										<div
											className={`flex flex-col h-full border rounded-xl p-6 ${
												userProfile?.planType === "basic"
													? "border-blue-500 bg-blue-50"
													: "border-gray-200"
											}`}
										>
											{/* Header */}
											<div className="flex items-center gap-3 mb-4">
												<div className="p-2 bg-blue-600 rounded-lg">
													<FiBriefcase className="text-white" size={20} />
												</div>
												<div>
													<h4 className="font-bold text-gray-900">
														{profileModalTranslations.billing.basic_plan.name ||
															"Basic"}
													</h4>
													<p className="text-sm text-gray-600">
														{profileModalTranslations.billing.basic_plan
															.description || "For professionals"}
													</p>
												</div>
											</div>

											{/* Price */}
											<p className="text-3xl font-bold text-gray-900 mb-4">
												{profileModalTranslations.billing.basic_plan.price ||
													"$9.99"}
												<span className="text-sm text-gray-600">
													/{profileModalTranslations.billing.month || "month"}
												</span>
											</p>

											{/* Features */}
											<div className="flex-grow mb-6">
												<ul className="space-y-2">
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.basic_plan
																.features[0] || "5 Resume Downloads"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.basic_plan
																.features[1] || "10 Templates"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.basic_plan
																.features[2] || "Priority Support"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.basic_plan
																.features[3] || "No Ads"}
														</span>
													</li>
												</ul>
											</div>

											{/* Button */}
											<div className="mt-auto">
												<button
													onClick={() =>
														userProfile?.planType !== "basic" &&
														handleUpgradePlan("basic")
													}
													disabled={userProfile?.planType === "basic"}
													className={`w-full py-2 rounded-lg font-medium ${
														userProfile?.planType === "basic"
															? "bg-blue-100 text-blue-400 cursor-default"
															: "bg-blue-600 text-white hover:bg-blue-700"
													}`}
												>
													{userProfile?.planType === "basic"
														? profileModalTranslations.billing.current_plan ||
														  "Current Plan"
														: profileModalTranslations.billing
																.upgrade_to_basic || "Upgrade to Basic"}
												</button>
											</div>
										</div>

										{/* Premium Plan */}
										<div
											className={`flex flex-col h-full border rounded-xl p-6 ${
												userProfile?.planType === "premium"
													? "border-blue-500 bg-blue-50"
													: "border-gray-200"
											}`}
										>
											{/* Header */}
											<div className="flex items-center gap-3 mb-4">
												<div className="p-2 bg-pink-600 rounded-lg">
													<FiStar className="text-white" size={20} />
												</div>
												<div>
													<h4 className="font-bold text-gray-900">
														{profileModalTranslations.billing.premium_plan
															.name || "Premium"}
													</h4>
													<p className="text-sm text-gray-600">
														{profileModalTranslations.billing.premium_plan
															.description || "For power users"}
													</p>
												</div>
											</div>

											{/* Price */}
											<p className="text-3xl font-bold text-gray-900 mb-4">
												{profileModalTranslations.billing.premium_plan.price ||
													"$19.99"}
												<span className="text-sm text-gray-600">
													/{profileModalTranslations.billing.month || "month"}
												</span>
											</p>

											{/* Features */}
											<div className="flex-grow mb-6">
												<ul className="space-y-2">
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.premium_plan
																.features[0] || "Unlimited Downloads"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.premium_plan
																.features[1] || "All Templates"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.premium_plan
																.features[2] || "AI Features"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.premium_plan
																.features[3] || "Export to DOCX"}
														</span>
													</li>
													<li className="flex items-center gap-2">
														<FiCheck className="text-green-500" />
														<span className="text-sm">
															{profileModalTranslations.billing.premium_plan
																.features[4] || "Priority Support"}
														</span>
													</li>
												</ul>
											</div>

											{/* Button*/}
											<div className="mt-auto">
												<button
													onClick={() =>
														userProfile?.planType !== "premium" &&
														handleUpgradePlan("premium")
													}
													disabled={userProfile?.planType === "premium"}
													className={`w-full py-2 rounded-lg font-medium ${
														userProfile?.planType === "premium"
															? "bg-pink-100 text-pink-400 cursor-default"
															: "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:opacity-90"
													}`}
												>
													{userProfile?.planType === "premium"
														? profileModalTranslations.billing.current_plan ||
														  "Current Plan"
														: profileModalTranslations.billing
																.upgrade_to_premium || "Upgrade to Premium"}
												</button>
											</div>
										</div>
									</div>
								</div>

								{/* View All Plans Button */}
								<div className="text-center pt-4">
									<button
										onClick={handleViewPlans}
										className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
									>
										{profileModalTranslations.billing.view_all_plans ||
											"View detailed comparison of all plans"}
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Footer */}
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
											profileModalTranslations.buttons.save_changes ||
											"Save Changes"
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
										{profileModalTranslations.buttons.edit_profile ||
											"Edit Profile"}
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
									{profileModalTranslations.buttons.view_all_plans ||
										"View Plans"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default ProfileModal
