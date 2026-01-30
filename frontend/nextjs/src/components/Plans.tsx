import { useState } from "react";
import {
	PRICING_BASIC_PLAN_MONTHLY,
	PRICING_BASIC_PLAN_YEARLY,
	PRICING_PREMIUM_PLAN_MONTHLY,
	PRICING_PREMIUM_PLAN_YEARLY,
} from "@/constants";
import { useResumeContext } from "@/contexts/useResumeContext";
import { FiCheck, FiX, FiStar, FiZap, FiBriefcase } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import { useConfirm } from "./ConfirmWindow";
import { SERVER_RESPONSE_MESSAGES } from "../../shared/response-codes";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const stripePriceIds = {
	basic: {
		monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY,
		yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY,
	},
	premium: {
		monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_MONTHLY,
		yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_YEARLY,
	},
};

export default function Plans({
	billingCycle,
	getPlanTranslation,
	selectedPlan,
	isInModal,
}) {
	const { t, isAuthenticated, apiBaseUrl, user } = useResumeContext();

	const userId = (user?.id as string) || null;
	const { confirm } = useConfirm();

	const { fetchUserProfile } = useProfile(userId, apiBaseUrl);
	const tAny = t as any;
	const pricingTranslations = tAny?.resume_builder?.pages?.pricing;
	const serverResponseTranslations = tAny?.resume_builder?.server_responses;
	const confirmQuestionsTranslations = tAny?.resume_builder?.confirm_questions;
	const planIds = ["free", "basic", "premium"];

	const [showCheckout, setShowCheckout] = useState(false);
	const [clientSecret, setClientSecret] = useState("");
	const [isLoading, setIsLoading] = useState<string | null>(null);
	const [checkoutPlan, setCheckoutPlan] = useState<string>("");

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
			monthlyPrice: PRICING_BASIC_PLAN_MONTHLY,
			yearlyPrice: PRICING_BASIC_PLAN_YEARLY,
		},
		premium: {
			icon: FiStar,
			color: "from-pink-600 to-rose-600",
			monthlyPrice: PRICING_PREMIUM_PLAN_MONTHLY,
			yearlyPrice: PRICING_PREMIUM_PLAN_YEARLY,
		},
	};

	const handlePlanUpgrade = async (planId: string) => {
		if (planId === "free") {
			handleFreePlan(planId);
			return;
		}

		if (!isAuthenticated) {
			window.location.href = "/signin";
			return;
		}

		setIsLoading(planId);
		setCheckoutPlan(planId);

		try {
			const planPrices = stripePriceIds[planId as keyof typeof stripePriceIds];
			if (!planPrices) {
				throw new Error(`No Stripe prices configured for plan: ${planId}`);
			}

			const priceId =
				billingCycle === "monthly" ? planPrices.monthly : planPrices.yearly;

			if (!priceId) {
				throw new Error(`Price ID not found for ${planId} (${billingCycle})`);
			}

			const response = await fetch(
				`${apiBaseUrl}/payments/create-checkout-session`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						priceId,
						userId: user?.id,
						planType: planId,
						billingCycle,
						customerEmail: user.email,
					}),
				},
			);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Error creating checkout session");
			}

			const { clientSecret } = await response.json();
			setClientSecret(clientSecret);
			setShowCheckout(true);
		} catch (error) {
			console.error("Error creating checkout:", error);
			alert(
				error instanceof Error ? error.message : "Error processing request",
			);
		} finally {
			setIsLoading(null);
		}
	};

	const handleFreePlan = async (planId: string) => {
		if (!isAuthenticated) {
			window.location.href = "/signin";
			return;
		}

		if (user.planType === "free") {
			toast.warn(tAny?.resume_builder?.general.user_already_on_free_plan);
			return;
		}

		const confirmation = await confirm({
			title: confirmQuestionsTranslations.confirm_action,
			message: confirmQuestionsTranslations.confirm_free_downgrade,
			confirmText: confirmQuestionsTranslations.confirm_yes,
			cancelText: confirmQuestionsTranslations.confirm_cancel,
			variant: "danger",
		});

		if (!confirmation) {
			return;
		}

		setIsLoading(planId);

		try {
			const response = await fetch(`${apiBaseUrl}/users/change-to-free-plan`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					plan: "free",
					action: SERVER_RESPONSE_MESSAGES.DOWNGRADE_TO_FREE,
				}),
			});

			const data = await response.json();
			const { daysRemaining, downloadsRemaining, message } = data;
			await fetchUserProfile();

			if (!response.ok) {
				throw new Error(data.error || "Error changing plan");
			}

			const serverResponse =
				message === SERVER_RESPONSE_MESSAGES.DOWNGRADE_TO_FREE
					? serverResponseTranslations.success_plan_change_and_downloads_remaining(
							downloadsRemaining,
							daysRemaining,
						)
					: serverResponseTranslations.cancel_subscription_success;

			toast.success(serverResponse || "Successfully changed to Free plan!");
		} catch (error) {
			console.error("Error:", error);
			alert(error instanceof Error ? error.message : "Error changing plan");
		} finally {
			setIsLoading(null);
		}
	};

	const getButtonText = (planId: string, translation: any) => {
		if (isLoading === planId) {
			return (
				<span className="flex items-center justify-center">
					<svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
							fill="none"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					Processing...
				</span>
			);
		}

		if (isAuthenticated && user.planType === planId) {
			return pricingTranslations?.plans?.current_plan || "Current Plan";
		}

		return translation.cta;
	};

	const isButtonDisabled = (planId: string) => {
		return isLoading !== null || (isAuthenticated && user.planType === planId);
	};

	return (
		<>
			{/* Modal Stripe Checkout */}
			{showCheckout && clientSecret && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
					<div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
						<div className="flex justify-between items-center p-6 border-b">
							<div>
								<h3 className="text-xl font-bold text-gray-900">
									Complete your {checkoutPlan} subscription
								</h3>
								<p className="text-gray-600 text-sm mt-1">
									Billed {billingCycle === "monthly" ? "monthly" : "annually"}
								</p>
							</div>
							<button
								onClick={() => setShowCheckout(false)}
								className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
								aria-label="Close checkout"
							>
								<FiX size={24} />
							</button>
						</div>

						<div className="p-6">
							<EmbeddedCheckoutProvider
								stripe={stripePromise}
								options={{ clientSecret }}
							>
								<EmbeddedCheckout />
							</EmbeddedCheckoutProvider>
						</div>

						<div className="p-6 border-t bg-gray-50">
							<p className="text-sm text-gray-600 text-center">
								Your payment is secure and encrypted. Cancel anytime.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Plans */}
			<div
				className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16`}
			>
				{planIds.map((planId) => {
					const staticData =
						staticPlanData[planId as keyof typeof staticPlanData];
					const translation = getPlanTranslation(planId);
					const IconComponent = staticData.icon;
					const isCurrentPlan = isAuthenticated && user.planType === planId;

					return (
						<div
							key={planId}
							className={`relative flex flex-col h-full rounded-2xl border-2 p-8 transition-all hover:shadow-xl ${
								(translation.popular && !isInModal) || selectedPlan === planId
									? "border-blue-500 shadow-lg transform scale-105"
									: "border-gray-200"
							} ${isCurrentPlan ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
						>
							{/* Badge Popular */}
							{translation.popular && !isInModal && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<span className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white px-4 py-1 rounded-full text-sm font-medium">
										{pricingTranslations?.plans?.most_popular || "Most Popular"}
									</span>
								</div>
							)}

							{/* Badge Current Plan */}
							{isCurrentPlan && (
								<div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
									<span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center min-w-[140px] justify-center">
										<FiCheck className="mr-1" size={16} />
										{pricingTranslations?.plans?.current_plan || "Current Plan"}
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
								<p className="text-gray-600 mt-1">{translation.description}</p>
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
											Number(staticData.yearlyPrice) > 0 && (
												<div className="mt-2">
													<p className="text-sm text-gray-500">
														{pricingTranslations?.plans?.billed_annually_a ||
															"Billed annually ($"}
														{(Number(staticData.yearlyPrice) / 12).toFixed(2)}
														{pricingTranslations?.plans?.billed_annually_b ||
															"/month)"}
													</p>
													<p className="text-sm text-emerald-600 font-medium mt-1">
														Save $
														{(
															Number(staticData.monthlyPrice) * 12 -
															Number(staticData.yearlyPrice)
														).toFixed(2)}{" "}
														per year
													</p>
												</div>
											)}
									</>
								) : (
									<div className="text-2xl font-bold text-gray-900">
										{pricingTranslations?.plans?.custom_pricing ||
											"Custom Pricing"}
									</div>
								)}
							</div>

							{/* Features section */}
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
														feature.included ? "text-gray-700" : "text-gray-400"
													}
												>
													{feature.text}
												</span>
											</li>
										))}
								</ul>
							</div>

							{/* Button */}
							<div className="mt-auto">
								<button
									onClick={() => handlePlanUpgrade(planId)}
									disabled={isButtonDisabled(planId)}
									className={`w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
										translation.popular
											? "bg-gradient-to-r from-cyan-600 to-cyan-800 text-white hover:opacity-90"
											: planId === "free"
												? "bg-gray-100 text-gray-900 hover:bg-gray-200"
												: "bg-gray-900 text-white hover:bg-gray-800"
									}`}
								>
									{getButtonText(planId, translation)}
								</button>

								{isAuthenticated &&
									user.planType === planId &&
									planId !== "free" && (
										<p className="text-xs text-gray-500 text-center mt-2">
											{pricingTranslations.billing.next_billing}:
											{DateTime.fromISO(user.subscriptionEndDate).toFormat(
												"yyyy-mm-dd",
											) || "N/A"}
										</p>
									)}
							</div>
						</div>
					);
				})}
			</div>

			<div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
				<div className="flex items-start">
					<div className="flex-shrink-0">
						<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
							<FiCheck className="text-blue-600" size={16} />
						</div>
					</div>
					<div className="ml-4">
						<h4 className="text-sm font-medium text-blue-800">
							{pricingTranslations?.security_title || "Secure & Flexible"}
						</h4>
						<ul className="mt-2 space-y-1 text-sm text-blue-700">
							<li className="flex items-center">
								<FiCheck className="mr-2" size={14} />
								{pricingTranslations?.security_points?.[0] ||
									"Secure payment processing with Stripe"}
							</li>
							<li className="flex items-center">
								<FiCheck className="mr-2" size={14} />
								{pricingTranslations?.security_points?.[1] || "Cancel anytime"}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
