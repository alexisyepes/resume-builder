"use client"

import { useState } from "react"
import {
	FiCheck,
	FiX,
	FiStar,
	FiZap,
	FiBriefcase,
	FiGlobe,
} from "react-icons/fi"
import { useRouter } from "next/navigation"
import { useResumeContext } from "@/contexts/useResumeContext"

const PricingPage = () => {
	const { t } = useResumeContext()
	const tAny = t as any
	const pricingTranslations = tAny?.resume_builder?.pages?.pricing

	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	)
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
	const router = useRouter()

	const staticPlanData = {
		free: {
			icon: FiZap,
			color: "from-gray-600 to-gray-700",
			monthlyPrice: 0,
			yearlyPrice: 0,
		},
		basic: {
			icon: FiBriefcase,
			color: "from-blue-600 to-cyan-600",
			monthlyPrice: 9.99,
			yearlyPrice: 95.99,
		},
		premium: {
			icon: FiStar,
			color: "from-pink-600 to-rose-600",
			monthlyPrice: 19.99,
			yearlyPrice: 191.99,
		},
		enterprise: {
			icon: FiGlobe,
			color: "from-purple-600 to-indigo-600",
			monthlyPrice: null,
			yearlyPrice: null,
		},
	}

	const getPlanTranslation = (planId: string) => {
		const planIndex =
			{
				free: 0,
				basic: 1,
				premium: 2,
				enterprise: 3,
			}[planId] || 0

		const translatedPlan = pricingTranslations?.plans?.plans?.[planIndex]

		return {
			name:
				translatedPlan?.name ||
				(planId === "free"
					? "Free"
					: planId === "basic"
					? "Basic"
					: planId === "premium"
					? "Premium"
					: "Enterprise"),
			description:
				translatedPlan?.description ||
				(planId === "free"
					? "Perfect for trying out"
					: planId === "basic"
					? "For job seekers"
					: planId === "premium"
					? "For power users"
					: "For teams & companies"),
			features: translatedPlan?.features || getDefaultFeatures(planId),
			cta:
				translatedPlan?.cta ||
				(planId === "free"
					? "Get Started Free"
					: planId === "basic"
					? "Choose Basic"
					: planId === "premium"
					? "Choose Premium"
					: "Contact Sales"),
			popular: translatedPlan?.popular || planId === "basic",
		}
	}

	const getDefaultFeatures = (planId: string) => {
		switch (planId) {
			case "free":
				return [
					{ text: "1 Resume Download", included: true },
					{ text: "3 Professional Templates", included: true },
					{ text: "Basic AI Suggestions", included: true },
					{ text: "Email Support", included: true },
					{ text: "Unlimited Downloads", included: false },
					{ text: "All Templates", included: false },
					{ text: "Advanced AI Features", included: false },
					{ text: "Priority Support", included: false },
					{ text: "No Ads", included: false },
				]
			case "basic":
				return [
					{ text: "5 Resume Downloads per month", included: true },
					{ text: "10 Professional Templates", included: true },
					{ text: "Basic AI Suggestions", included: true },
					{ text: "Priority Email Support", included: true },
					{ text: "No Ads", included: true },
					{ text: "Unlimited Downloads", included: false },
					{ text: "All Templates", included: false },
					{ text: "Advanced AI Features", included: false },
					{ text: "Phone Support", included: false },
				]
			case "premium":
				return [
					{ text: "Unlimited Resume Downloads", included: true },
					{ text: "All Professional Templates", included: true },
					{ text: "Advanced AI Writing Assistant", included: true },
					{ text: "Priority Phone & Email Support", included: true },
					{ text: "No Ads", included: true },
					{ text: "Export to PDF & DOCX", included: true },
					{ text: "ATS Optimization", included: true },
					{ text: "Resume Analytics", included: true },
					{ text: "Custom Branding", included: false },
				]
			case "enterprise":
				return [
					{ text: "Everything in Premium", included: true },
					{ text: "Team Collaboration", included: true },
					{ text: "Custom Template Design", included: true },
					{ text: "Dedicated Account Manager", included: true },
					{ text: "White Label Solution", included: true },
					{ text: "API Access", included: true },
					{ text: "SSO & Advanced Security", included: true },
					{ text: "Custom Workflows", included: true },
					{ text: "Training & Onboarding", included: true },
				]
			default:
				return []
		}
	}

	const planIds = ["free", "basic", "premium", "enterprise"]

	const featuresComparison =
		pricingTranslations?.comparison_table?.featuresComparison || []

	const faqQuestions = pricingTranslations?.faq?.questions || []

	const handleSelectPlan = (planId: string) => {
		setSelectedPlan(planId)
		if (planId === "enterprise") {
			router.push("/contact")
		} else {
			alert(`Selected ${planId} plan - Stripe integration coming soon!`)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
				{/* Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						{pricingTranslations?.title || "Choose Your Perfect Plan"}
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
						{pricingTranslations?.subtitle ||
							"Whether you're a job seeker, professional, or enterprise, we have a plan that fits your needs."}
					</p>

					{/* Billing Toggle */}
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
					<p className="text-sm text-gray-500">
						{pricingTranslations?.billing?.no_contract ||
							"No long-term contracts. Cancel anytime."}
					</p>
				</div>

				{/* Plans Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{planIds.map((planId) => {
						const staticData =
							staticPlanData[planId as keyof typeof staticPlanData]
						const translation = getPlanTranslation(planId)
						const IconComponent = staticData.icon

						return (
							<div
								key={planId}
								className={`relative flex flex-col h-full rounded-2xl border-2 p-8 transition-all hover:shadow-xl ${
									translation.popular
										? "border-blue-500 shadow-lg transform scale-105"
										: "border-gray-200"
								}`}
							>
								{translation.popular && (
									<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
										<span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
											{pricingTranslations?.plans?.most_popular ||
												"Most Popular"}
										</span>
									</div>
								)}

								{/* Header section */}
								<div className="mb-6">
									<div
										className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${staticData.color} mb-4`}
									>
										<IconComponent className="text-white" size={24} />
									</div>
									<h3 className="text-2xl font-bold text-gray-900">
										{translation.name}
									</h3>
									<p className="text-gray-600 mt-1">
										{translation.description}
									</p>
								</div>

								{/* Pricing section */}
								<div className="mb-6">
									{staticData.monthlyPrice !== null ? (
										<>
											<div className="flex items-baseline">
												<span className="text-4xl font-bold text-gray-900">
													$
													{billingCycle === "monthly"
														? staticData.monthlyPrice
														: staticData.yearlyPrice}
												</span>
												<span className="text-gray-600 ml-2">
													/{billingCycle === "monthly" ? "month" : "year"}
												</span>
											</div>
											{billingCycle === "yearly" &&
												staticData.yearlyPrice > 0 && (
													<p className="text-sm text-gray-500 mt-1">
														{pricingTranslations?.plans?.billed_annually_a ||
															"Billed annually ($"}
														{(staticData.yearlyPrice / 12).toFixed(2)}
														{pricingTranslations?.plans?.billed_annually_b ||
															"/month)"}
													</p>
												)}
										</>
									) : (
										<div className="text-2xl font-bold text-gray-900">
											{pricingTranslations?.plans?.custom_pricing ||
												"Custom Pricing"}
										</div>
									)}
								</div>

								{/* Features section - Esto empujará el botón hacia abajo */}
								<div className="flex-grow mb-8">
									<ul className="space-y-3">
										{translation.features
											.slice(0, 5)
											.map((feature: any, index: number) => (
												<li key={index} className="flex items-center">
													{feature.included ? (
														<FiCheck className="text-green-500 mr-3 flex-shrink-0" />
													) : (
														<FiX className="text-gray-300 mr-3 flex-shrink-0" />
													)}
													<span
														className={
															feature.included
																? "text-gray-700"
																: "text-gray-400"
														}
													>
														{feature.text}
													</span>
												</li>
											))}
									</ul>
								</div>

								<div className="mt-auto">
									<button
										onClick={() => handleSelectPlan(planId)}
										className={`w-full py-3 rounded-lg font-medium transition-all ${
											translation.popular
												? "bg-gradient-to-r from-cyan-600 to-cyan-800 text-white hover:opacity-90"
												: planId === "free"
												? "bg-gray-100 text-gray-900 hover:bg-gray-200"
												: "bg-gray-900 text-white hover:bg-gray-800"
										}`}
									>
										{translation.cta}
									</button>
								</div>
							</div>
						)
					})}
				</div>

				{/* Feature Comparison Table */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
						{pricingTranslations?.comparison_table?.header ||
							"Compare All Features"}
					</h2>
					<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
						<div className="grid grid-cols-5 border-b border-gray-200">
							<div className="p-4 font-medium text-gray-700">
								{pricingTranslations?.comparison_table?.feature || "Feature"}
							</div>
							<div className="p-4 text-center font-medium">
								{pricingTranslations?.comparison_table?.plans?.free || "Free"}
							</div>
							<div className="p-4 text-center font-medium">
								{pricingTranslations?.comparison_table?.plans?.basic || "Basic"}
							</div>
							<div className="p-4 text-center font-medium">
								{pricingTranslations?.comparison_table?.plans?.premium ||
									"Premium"}
							</div>
							<div className="p-4 text-center font-medium">
								{pricingTranslations?.comparison_table?.plans?.enterprise ||
									"Enterprise"}
							</div>
						</div>
						{featuresComparison.map((feature: any, index: number) => (
							<div
								key={index}
								className={`grid grid-cols-5 ${
									index % 2 === 0 ? "bg-gray-50" : "bg-white"
								}`}
							>
								<div className="p-4 text-gray-700">{feature.name}</div>
								<div className="p-4 text-center">{feature.free}</div>
								<div className="p-4 text-center">{feature.basic}</div>
								<div className="p-4 text-center">{feature.premium}</div>
								<div className="p-4 text-center">{feature.enterprise}</div>
							</div>
						))}
					</div>
				</div>

				{/* FAQ Section */}
				<div className="max-w-3xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
						{pricingTranslations?.faq?.header || "Frequently Asked Questions"}
					</h2>
					<div className="space-y-4">
						{faqQuestions.map((faq: any, index: number) => (
							<div
								key={index}
								className="border border-gray-200 rounded-lg p-6"
							>
								<h3 className="font-medium text-gray-900 mb-2">
									{faq.question}
								</h3>
								<p className="text-gray-600">{faq.answer}</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className="mt-16 text-center">
					<div className="bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-2xl p-12 text-white">
						<h2 className="text-3xl font-bold mb-4">
							{pricingTranslations?.faq?.cta_section?.title ||
								"Ready to elevate your career?"}
						</h2>
						<p className="text-xl mb-8 opacity-90">
							{pricingTranslations?.faq?.cta_section?.subtitle ||
								"Join thousands of professionals who found their dream job with our resume builder."}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								onClick={() => router.push("/signin")}
								className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
							>
								{pricingTranslations?.faq?.cta_section?.start_free_trial ||
									"Start Free Trial"}
							</button>
							<button
								onClick={() => router.push("/contact")}
								className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
							>
								{pricingTranslations?.faq?.cta_section?.schedule_demo ||
									"Schedule a Demo"}
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default PricingPage
