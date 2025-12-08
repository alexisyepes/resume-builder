import { FiZap, FiBriefcase, FiStar, FiCheck } from "react-icons/fi"

export default function Plans({
	profileModalTranslations,
	userProfile,
	isAuthenticated,
	handleUpgradePlan,
}: any) {
	return (
		<div>
			<h3 className="text-lg font-bold text-gray-900 mb-4">
				{profileModalTranslations.billing.available_plans || "Available Plans"}
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
								{profileModalTranslations.billing.free_plan.name || "Free"}
							</h4>
							<p className="text-sm text-gray-600">
								{profileModalTranslations.billing.free_plan.description ||
									"For individuals"}
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
									{profileModalTranslations.billing.free_plan.features[0] ||
										"1 Resume Download"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.free_plan.features[1] ||
										"3 Templates"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.free_plan.features[2] ||
										"Basic Support"}
								</span>
							</li>
						</ul>
					</div>

					{/* Button */}
					<div className="mt-auto">
						{isAuthenticated ? (
							<button
								onClick={() =>
									userProfile?.planType !== "free" && handleUpgradePlan("free")
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
						) : (
							<button
								onClick={() =>
									userProfile?.planType !== "free" && handleUpgradePlan("free")
								}
								className={`w-full py-2 rounded-lg font-medium ${
									userProfile?.planType === "free"
										? "bg-gray-200 text-gray-400 cursor-default"
										: "bg-gray-300 text-gray-800 hover:bg-gray-300"
								}`}
							>
								{profileModalTranslations.billing.free_plan.name}
							</button>
						)}
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
								{profileModalTranslations.billing.basic_plan.name || "Basic"}
							</h4>
							<p className="text-sm text-gray-600">
								{profileModalTranslations.billing.basic_plan.description ||
									"For professionals"}
							</p>
						</div>
					</div>

					{/* Price */}
					<p className="text-3xl font-bold text-gray-900 mb-4">
						{profileModalTranslations.billing.basic_plan.price || "$9.99"}
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
									{profileModalTranslations.billing.basic_plan.features[0] ||
										"5 Resume Downloads"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.basic_plan.features[1] ||
										"10 Templates"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.basic_plan.features[2] ||
										"Priority Support"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.basic_plan.features[3] ||
										"No Ads"}
								</span>
							</li>
						</ul>
					</div>

					{/* Button */}
					{isAuthenticated ? (
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
									: profileModalTranslations.billing.upgrade_to_basic ||
									  "Upgrade to Basic"}
							</button>
						</div>
					) : (
						<button
							onClick={() =>
								userProfile?.planType !== "basic" && handleUpgradePlan("free")
							}
							className={`w-full py-2 rounded-lg font-medium ${
								userProfile?.planType === "basic"
									? "bg-blue-100 text-blue-400 cursor-default"
									: "bg-blue-600 text-white hover:bg-blue-700"
							}`}
						>
							{profileModalTranslations.billing.basic_plan.name}
						</button>
					)}
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
								{profileModalTranslations.billing.premium_plan.name ||
									"Premium"}
							</h4>
							<p className="text-sm text-gray-600">
								{profileModalTranslations.billing.premium_plan.description ||
									"For power users"}
							</p>
						</div>
					</div>

					{/* Price */}
					<p className="text-3xl font-bold text-gray-900 mb-4">
						{profileModalTranslations.billing.premium_plan.price || "$19.99"}
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
									{profileModalTranslations.billing.premium_plan.features[0] ||
										"Unlimited Downloads"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.premium_plan.features[1] ||
										"All Templates"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.premium_plan.features[2] ||
										"AI Features"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.premium_plan.features[3] ||
										"Export to DOCX"}
								</span>
							</li>
							<li className="flex items-center gap-2">
								<FiCheck className="text-green-500" />
								<span className="text-sm">
									{profileModalTranslations.billing.premium_plan.features[4] ||
										"Priority Support"}
								</span>
							</li>
						</ul>
					</div>

					{/* Button*/}
					{isAuthenticated ? (
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
									: profileModalTranslations.billing.upgrade_to_premium ||
									  "Upgrade to Premium"}
							</button>
						</div>
					) : (
						<button
							onClick={() =>
								userProfile?.planType !== "premium" && handleUpgradePlan("free")
							}
							className={`w-full py-2 rounded-lg font-medium ${
								userProfile?.planType === "premium"
									? "bg-pink-100 text-pink-400 cursor-default"
									: "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:opacity-90"
							}`}
						>
							{profileModalTranslations.billing.premium_plan.name}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
