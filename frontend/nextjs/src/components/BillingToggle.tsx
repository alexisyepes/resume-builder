export default function BillingToggle({
	billingCycle,
	setBillingCycle,
	pricingTranslations,
}) {
	return (
		<div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-2">
			<button
				onClick={() => setBillingCycle("monthly")}
				className={`px-6 py-2 rounded-md font-medium transition-colors ${
					billingCycle === "monthly"
						? "bg-white text-gray-900 shadow"
						: "text-gray-600 hover:text-gray-900"
				}`}
			>
				{pricingTranslations?.billing?.monthly || "Monthly"}
			</button>
			<button
				onClick={() => setBillingCycle("yearly")}
				className={`px-6 py-2 rounded-md font-medium transition-colors ${
					billingCycle === "yearly"
						? "bg-white text-gray-900 shadow"
						: "text-gray-600 hover:text-gray-900"
				}`}
			>
				{pricingTranslations?.billing?.yearly || "Yearly"}{" "}
				{pricingTranslations?.billing?.save_20 && (
					<span className="ml-1 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
						{pricingTranslations.billing.save_20}
					</span>
				)}
			</button>
		</div>
	)
}
