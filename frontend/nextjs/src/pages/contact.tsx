"use client"

import { useState, FormEvent } from "react"
import {
	FiMail,
	FiPhone,
	FiMapPin,
	FiClock,
	FiSend,
	FiCheckCircle,
	FiAlertCircle,
} from "react-icons/fi"
import { useResumeContext } from "@/contexts/useResumeContext"

const ContactPage = () => {
	const { t } = useResumeContext()
	const tAny = t as any
	const contactTranslations = tAny?.resume_builder?.pages?.contact || {}
	const labels = tAny?.resume_builder?.labels || {}
	const navigation = tAny?.resume_builder?.navigation || {}

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	})

	const [formStatus, setFormStatus] = useState<{
		type: "idle" | "success" | "error"
		message: string
	}>({ type: "idle", message: "" })

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setFormStatus({ type: "idle", message: "" })

		try {
			// Simulates network request
			await new Promise((resolve) => setTimeout(resolve, 1500))

			// @TODO:
			// const response = await fetch('/api/contact', {
			//   method: 'POST',
			//   body: JSON.stringify(formData),
			// })

			setFormStatus({
				type: "success",
				message:
					contactTranslations?.form?.success_message ||
					"¡Gracias por tu mensaje! Te responderemos pronto.",
			})

			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			})
		} catch (error) {
			setFormStatus({
				type: "error",
				message:
					contactTranslations?.form?.error_message ||
					"There was an error sending the message. Please try again.",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	// Contact information
	const contactInfo = [
		{
			icon: FiMail,
			title: contactTranslations?.info?.email_title || "Email",
			content: contactTranslations?.info?.email || "support@resumebuilder.com",
			link: "mailto:support@resumebuilder.com",
		},
		{
			icon: FiPhone,
			title: contactTranslations?.info?.phone_title || "Phone",
			content: contactTranslations?.info?.phone || "+1 (555) 123-4567",
			link: "tel:+123123123",
		},
		{
			icon: FiMapPin,
			title: contactTranslations?.info?.address_title || "Address",
			content:
				contactTranslations?.info?.address ||
				"123 Resume Street, Suite 100\nToronto, ON M5H 2N2\nCanada",
		},
		{
			icon: FiClock,
			title: contactTranslations?.info?.hours_title || "Business Hours",
			content:
				contactTranslations?.info?.hours ||
				"Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM",
		},
	]

	// Preguntas frecuentes de contacto
	const faqs = contactTranslations?.faqs || [
		{
			question:
				contactTranslations?.faq1_question ||
				"How can I get technical support?",
			answer:
				contactTranslations?.faq1_answer ||
				"For technical support, please email our support team at support@resumebuilder.com or use the contact form above.",
		},
		{
			question:
				contactTranslations?.faq2_question ||
				"Do you offer enterprise solutions?",
			answer:
				contactTranslations?.faq2_answer ||
				"Yes! Contact our sales team for custom enterprise solutions and volume discounts.",
		},
		{
			question:
				contactTranslations?.faq3_question ||
				"How long does it take to get a response?",
			answer:
				contactTranslations?.faq3_answer ||
				"We typically respond within 24 hours on business days.",
		},
	]

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
				{/* Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						{contactTranslations?.title || navigation?.contact || "Contact Us"}
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
						{contactTranslations?.subtitle ||
							"Have questions? We're here to help! Get in touch with our team and we'll respond as soon as possible."}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					<div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							{contactTranslations?.form?.title || "Send us a Message"}
						</h2>

						{formStatus.type !== "idle" && (
							<div
								className={`mb-6 p-4 rounded-lg flex items-start ${
									formStatus.type === "success"
										? "bg-green-50 text-green-800 border border-green-200"
										: "bg-red-50 text-red-800 border border-red-200"
								}`}
							>
								{formStatus.type === "success" ? (
									<FiCheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
								) : (
									<FiAlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
								)}
								<p className="text-sm">{formStatus.message}</p>
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										{contactTranslations?.form?.name_label || "Full Name"}
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder={
											contactTranslations?.form?.name_placeholder || "John Doe"
										}
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										{contactTranslations?.form?.email_label || "Email Address"}
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder={
											contactTranslations?.form?.email_placeholder ||
											"john@example.com"
										}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									{contactTranslations?.form?.subject_label || "Subject"}
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder={
										contactTranslations?.form?.subject_placeholder ||
										"How can we help you?"
									}
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									{contactTranslations?.form?.message_label || "Message"}
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={6}
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
									placeholder={
										contactTranslations?.form?.message_placeholder ||
										"Tell us more about your inquiry..."
									}
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
									isSubmitting
										? "bg-blue-400 cursor-not-allowed"
										: "bg-blue-600 hover:bg-blue-700"
								} text-white`}
							>
								{isSubmitting ? (
									<>
										<span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
										{contactTranslations?.form?.sending || "Sending..."}
									</>
								) : (
									<>
										<FiSend className="mr-2" />
										{contactTranslations?.form?.submit_button || "Send Message"}
									</>
								)}
							</button>
						</form>
					</div>

					<div className="space-y-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{contactInfo.map((info, index) => (
								<div
									key={index}
									className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
								>
									<div className="flex items-start">
										<div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
											<info.icon size={20} />
										</div>
										<div>
											<h3 className="font-medium text-gray-900 mb-1">
												{info.title}
											</h3>
											{info.link ? (
												<a
													href={info.link}
													className="text-gray-600 hover:text-blue-600 transition-colors whitespace-pre-line"
												>
													{info.content}
												</a>
											) : (
												<p className="text-gray-600 whitespace-pre-line">
													{info.content}
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Map or Image */}
						<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								{contactTranslations?.location_title || "Our Location"}
							</h3>
							<div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
								{/* Possible Google Maps map or an image */}
								<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
									<FiMapPin className="text-blue-500" size={48} />
								</div>
							</div>
							<p className="text-gray-600 text-sm">
								{contactTranslations?.location_description ||
									"We're located in the heart of San Francisco. Feel free to visit us during business hours."}
							</p>
						</div>

						{/* Frequently Asked Questions */}
						<div className="bg-white rounded-2xl border border-gray-200 p-8">
							<h3 className="text-xl font-bold text-gray-900 mb-6">
								{contactTranslations?.faq_title || "Frequently Asked Questions"}
							</h3>
							<div className="space-y-4">
								{faqs.map((faq: any, index: number) => (
									<div
										key={index}
										className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
									>
										<h4 className="font-medium text-gray-900 mb-2">
											{faq.question}
										</h4>
										<p className="text-gray-600 text-sm">{faq.answer}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="text-center">
					<div className="bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-2xl p-12 text-white">
						<h2 className="text-3xl font-bold mb-4">
							{contactTranslations?.cta_title || "Ready to Get Started?"}
						</h2>
						<p className="text-xl mb-8 opacity-90">
							{contactTranslations?.cta_subtitle ||
								"Create your professional resume today and take the next step in your career journey."}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								onClick={() => (window.location.href = "/signup")}
								className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
							>
								{contactTranslations?.cta_button1 || "Start Free Trial"}
							</button>
							<button
								onClick={() => (window.location.href = "/pricing")}
								className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
							>
								{contactTranslations?.cta_button2 || "View Pricing Plans"}
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default ContactPage
