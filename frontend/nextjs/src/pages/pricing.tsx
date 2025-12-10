"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useResumeContext } from "@/contexts/useResumeContext"
import { useProfile } from "@/hooks/useProfile"
import { usePlansContext } from "@/contexts/plansContext"

import BillingToggle from "@/components/BillingToggle"
import Plans from "@/components/Plans"

const PricingPage = () => {
	const { t, user, apiBaseUrl } = useResumeContext()
	const tAny = t as any
	const pricingTranslations = tAny?.resume_builder?.pages?.pricing
	const userId = (user?.id as string) || null
	const { setSelectedPlan } = usePlansContext()

	const { openModal } = useProfile(userId, apiBaseUrl)

	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	)
	const router = useRouter()

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

	const featuresComparison =
		pricingTranslations?.comparison_table?.featuresComparison || []

	const faqQuestions = pricingTranslations?.faq?.questions || []

	const handleSelectPlan = (planId: string) => {
		setSelectedPlan(planId)
		if (planId === "enterprise") {
			router.push("/contact")
		} else {
			openModal()
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
					<BillingToggle
						billingCycle={billingCycle}
						setBillingCycle={setBillingCycle}
						pricingTranslations={pricingTranslations}
					/>

					<p className="text-sm text-gray-500">
						{pricingTranslations?.billing?.no_contract ||
							"No long-term contracts. Cancel anytime."}
					</p>
				</div>

				{/* Plans Grid */}
				<Plans
					isInModal={false}
					selectedPlan={null}
					billingCycle={billingCycle}
					getPlanTranslation={getPlanTranslation}
					userProfile={useProfile}
				/>

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
