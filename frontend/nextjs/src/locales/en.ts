import { FiBriefcase, FiGlobe, FiStar, FiZap } from "react-icons/fi"

export default {
	greeting: "Hello world",
	resume_builder: {
		navigation: {
			about: "about",
			services: "services",
			pricing: "pricing",
			contact: "contact",
			signin: "sign in",
			dashboard: "Dashboard",
			logout: "Logout",
			home: "home",
		},
		labels: {
			general: {
				build_your_resume: "Build your resume",
				edit: "edit",
				layout: "layout",
				next: "next",
				reset_all_inputs: "Reset all inputs",
				confirm_clear_inputs:
					"Are you sure you want to reset all your inputs? You will lose any progress you've made.",
				add_more_sections: "Add more Sections",
				template_selector: {
					selected_template: "Selected Template",
					download: "Download",
					write: "Write",
					choose_layout: "Choose a Layout",
					synch_content: "Sync Content",
				},
			},
			personal_information: {
				title: "Personal Information",
				upload_photo: "Upload Photo",
				choose_file: "Choose File",
				no_file_chosen: "No file chosen",
				remove_photo: "remove photo",
				add_photo: "add photo",
				first_name: "first name",
				last_name: "last name",
				job_title: "job title",
				job_title_placeholder: "Project manager",
			},
			contact_information: {
				title: "Contact Information",
				email: "Email",
				phone: "Phone",
				address: "Address",
				city_post_code: "City, State/Province and Postal Code",
			},
			professional_summary: {
				title: "Professional summary",
				description:
					"List your professional title, years of experience, and highlight your most notable accomplishments, and our AI generator will help you create it.",
				cta_1: "Generating...",
				cta_2: "Generate with AI",
				counter: {
					time_left: "Time Left to regenerate text:",
					num_of_tries_left: "Number of Ai generations left:",
				},
			},
			skills: {
				title: "Skills",
				add_skill: "Add skill",
				add_skill_below: "Add skill below",
				placeholder: "Attention to detail...",
				info: "Select an option below based on your job title, or enter your own above.",
				cta_1: "Generate",
				cta_2: "Regenerate",
				cta_3: "Suggestions",
			},
			employment_history: {
				title: "Employment History",
				title_2: "Start with your most recent position",
				company: "Company",
				role: "Role",
				year: "Year (e.g., 2020 - Present)",
				responsibilities: "Responsibilities (each on a new line)",
				cta: "Add employment history",
			},
			education: {
				title: "Education",
				institution: "Institution",
				degree: "Degree",
				year: "Year / Date",
				cta: "Add Education",
			},
			links: {
				title: "Links",
				name: "Name (e.g., Portfolio)",
				url: "Url (e.g., https://www.yourwebsite.com)",
				cta: "Add Link",
			},
			hobbies: {
				title: "Hobbies",
				cta: "Add hobby",
			},
			certifications: {
				title: "Certifications",
				institution: "Institution",
				name: "Certification Name",
				year: "Year / Date",
				cta: "Add Certifications",
			},
			references: {
				title: "References",
				name: "Reference Full Name",
				company_name: "Company Name",
				email_phone: "Email / Phone-number",
				cta: "Add Reference",
			},
			languages: {
				title: "Languages",
				placeholder: "E.g., Spanish, Portuguese...",
				cta: "Add Language",
			},
			custom_section: {
				title: "Custom Section",
				header: "Header",
				subheader: "Sub Header",
				content: "Content",
				cta: "Add Custom Section",
			},
		},
		pages: {
			home: {
				title: "Create Your Professional Resume Easily",
				description:
					"Build a standout resume in minutes with our AI-powered resume builder.",
				cta_builder: "Start Building",
				cta_templates: "Browse Templates",
				features: {
					customization: "Easy Customization",
					customization_description:
						"Tailor your resume with customizable sections and layouts.",
					ai_assistance: "AI Assistance",
					ai_assistance_description:
						"Let AI help you craft a compelling professional summary.",
					export_options: "Multiple Export Options",
					export_options_description:
						"Download your resume in PDF or Word formats.",
				},
				testimonials: {
					testimonials_title: "What Our Users Say",
					testimonials_description:
						"See how our resume builder has helped professionals achieve their career goals.",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"This resume builder made it so easy to create a professional resume in minutes!",
					testimonial_2_name: "David Lee",
					testimonial_2_text:
						"I landed my dream job thanks to this tool! Highly recommended.",
				},
				how_it_works: {
					title: "How It Works",
					description:
						"Follow these simple steps to create your perfect resume.",
					steps: [
						{
							title: "Choose a Template",
							description:
								"Select from a variety of professional resume templates.",
						},
						{
							title: "Fill in Your Details",
							description:
								"Enter your information and let our AI enhance your content.",
						},
						{
							title: "Download & Apply",
							description:
								"Export your resume and start applying for jobs with confidence.",
						},
					],
				},
				faq: {
					title: "Frequently Asked Questions",
					questions: [
						{
							question: "Is the resume builder free to use?",
							answer: "Yes! You can create and download your resume for free.",
						},
						{
							question: "Can I edit my resume after creating it?",
							answer:
								"Of course! You can make changes anytime before downloading.",
						},
						{
							question: "What file formats can I export my resume in?",
							answer: "You can export your resume in PDF and Word formats.",
						},
					],
				},
				final_cta: {
					title: "Get Started Today!",
					description:
						"Create your professional resume in minutes and land your dream job.",
					cta_text: "Build My Resume",
				},
				demo_animation: {
					generating_text: "...generating your resume",
					cloud_sync: "Cloud Sync",
					ai_analysis: "AI Analysis",
					analytics: "Analytics",
					default_first_name: "John",
					default_last_name: "Connor",
					default_job_title: "Project manager",
				},
			},
			templates: {
				choose_from_many: "Choose from hundreds of templates",
			},
			about: {
				title: "About Us",
				subtitle: "We are revolutionizing the way resumes are built using AI.",
				mission: {
					title: "Our Mission",
					description:
						"Our mission is to empower job seekers with tools that make resume building effortless, efficient, and effective. We leverage AI to help you stand out in a competitive job market.",
				},
				our_values_title: "Our Values",
				whyChooseUs_title: "Why Choose Us",
				values: [
					{
						icon: "FaLightbulb",
						title: "Innovation",
						description:
							"We constantly innovate to provide cutting-edge solutions for resume building.",
					},
					{
						icon: "FaUsers",
						title: "User-Centric",
						description:
							"Our tools are designed with the user in mind, ensuring a seamless experience.",
					},
					{
						icon: "FaHandshake",
						title: "Integrity",
						description:
							"We believe in transparency and honesty in everything we do.",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "AI-Powered",
						description:
							"Our platform uses advanced AI to create resumes that stand out to employers.",
					},
					{
						icon: "FaClock",
						title: "Save Time",
						description: "Build a professional resume in minutes, not hours.",
					},
					{
						icon: "FaUserCheck",
						title: "Tailored for You",
						description:
							"Customize your resume for specific job roles and industries.",
					},
				],
			},
			signin: {
				title: "Log in",
				firstName: "First Name",
				lastName: "Last Name",
				email: "Email",
				password: "Password",
				confirm_password: "Confirm Password",
				cta: "Log in",
				no_account: "Don't have an account yet",
				register: "Register",
				or: "or",
				signup_with_google: "Sign up with Google",
				already_an_account: "Already have an account",
				invalid_credentials: "Invalid credentials",
				account_exists:
					"There is already an account associated with your email",
				cta_forgot_password: "Click on forgot password",
				try_again: "Please try again",
				forgot_password: "Forgot Password",
				errors: {
					validation: "You must enter email and password",
					passwords_no_match: "Passwords do not match",
					auth_failed: "Authentication failed. Please try again",
					google_auth_failed: "Google sign-in failed. Please try again",
					all_fields_required: "All fields are required",
					password_min_length: "Password must be at least 8 characters",
					email_exists: "Email already exists",
					invalid_credentials: "Invalid email or password",
				},
			},
			services: {
				title: "Build Your Dream Career",
				subtitle:
					"Leverage AI to create the perfect resume and boost your career.",
				services: [
					{
						icon: "FaFileAlt",
						title: "AI-Powered Resume Builder",
						description:
							"Create professional, ATS-friendly resumes in minutes with our AI-driven resume builder.",
					},
					{
						icon: "FaEdit",
						title: "Resume Customization",
						description:
							"Tailor your resume for specific job roles and industries with expert recommendations.",
					},
					{
						icon: "FaChartLine",
						title: "Career Insights",
						description:
							"Get actionable insights to improve your resume and increase your chances of landing interviews.",
					},
					{
						icon: "FaDownload",
						title: "Download & Apply",
						description:
							"Easily download your resume and start applying to your dream jobs.",
					},
				],
				testimonials: [
					{
						quote:
							"This AI resume builder helped me land my dream job! Highly recommended.",
						author: "John Doe",
						role: "Software Engineer",
					},
					{
						quote:
							"The customization options are fantastic. My resume looks professional and polished.",
						author: "Jane Smith",
						role: "Marketing Manager",
					},
				],
				pricing: [
					{
						title: "Basic",
						price: "Free",
						features: ["1 Resume", "Basic Templates", "Limited Customization"],
						cta: "Get Started",
					},
					{
						title: "Pro",
						price: "$4.99/month",
						features: [
							"Unlimited Resumes",
							"Premium Templates",
							"Advanced Customization",
							"Career Insights",
						],
						cta: "Subscribe",
					},
				],
				get_started: "Get Started for Free",
				what_our_users_say: "What our users say",
				create_resume_in_minutes:
					"Create a professional resume in minutes with our AI-powered tools.",
				pricing_plans: "Pricing Plans",
			},
			pricing: {
				title: "Choose Your Perfect Plan",
				subtitle:
					"Whether you're a job seeker, professional, or enterprise, we have aplan that fits your needs.",
				billing: {
					monthly: "Monthly",
					yearly: "Yearly",
					save_20: "Save 20%",
					no_contract: "No long-term contracts. Cancel anytime.",
				},
				plans: {
					most_popular: "Most Popular",
					billed_annually_a: "Billed annually ($",
					billed_annually_b: "/month)",
					custom_pricing: "Custom Pricing",
					plans: [
						{
							id: "free",
							name: "Free",
							description: "Perfect for trying out",
							monthlyPrice: 0,
							yearlyPrice: 0,
							icon: FiZap,
							color: "from-gray-600 to-gray-700",
							features: [
								{ text: "1 Resume Download", included: true },
								{ text: "3 Professional Templates", included: true },
								{ text: "Basic AI Suggestions", included: true },
								{ text: "Email Support", included: true },
								{ text: "Unlimited Downloads", included: false },
								{ text: "All Templates", included: false },
								{ text: "Advanced AI Features", included: false },
								{ text: "Priority Support", included: false },
								{ text: "No Ads", included: false },
							],
							cta: "Get Started Free",
							popular: false,
						},
						{
							id: "basic",
							name: "Basic",
							description: "For job seekers",
							monthlyPrice: 4.99,
							yearlyPrice: 47.9, // 20% discount
							icon: FiBriefcase,
							color: "from-blue-600 to-cyan-600",
							features: [
								{ text: "5 Resume Downloads per month", included: true },
								{ text: "10 Professional Templates", included: true },
								{ text: "Basic AI Suggestions", included: true },
								{ text: "Priority Email Support", included: true },
								{ text: "No Ads", included: true },
								{ text: "Unlimited Downloads", included: false },
								{ text: "All Templates", included: false },
								{ text: "Advanced AI Features", included: false },
								{ text: "Phone Support", included: false },
							],
							cta: "Choose Basic",
							popular: true,
						},
						{
							id: "premium",
							name: "Premium",
							description: "For power users",
							monthlyPrice: 19.99,
							yearlyPrice: 191.99, // 20% discount
							icon: FiStar,
							color: "from-pink-600 to-rose-600",
							features: [
								{ text: "Unlimited Resume Downloads", included: true },
								{ text: "All Professional Templates", included: true },
								{ text: "Advanced AI Writing Assistant", included: true },
								{ text: "Priority Phone & Email Support", included: true },
								{ text: "No Ads", included: true },
								{ text: "Export to PDF & DOCX", included: true },
								{ text: "ATS Optimization", included: true },
								{ text: "Resume Analytics", included: true },
								{ text: "Custom Branding", included: false },
							],
							cta: "Choose Premium",
							popular: false,
						},
						{
							id: "enterprise",
							name: "Enterprise",
							description: "For teams & companies",
							monthlyPrice: null,
							yearlyPrice: null,
							icon: FiGlobe,
							color: "from-purple-600 to-indigo-600",
							features: [
								{ text: "Everything in Premium", included: true },
								{ text: "Team Collaboration", included: true },
								{ text: "Custom Template Design", included: true },
								{ text: "Dedicated Account Manager", included: true },
								{ text: "White Label Solution", included: true },
								{ text: "API Access", included: true },
								{ text: "SSO & Advanced Security", included: true },
								{ text: "Custom Workflows", included: true },
								{ text: "Training & Onboarding", included: true },
							],
							cta: "Contact Sales",
							popular: false,
						},
					],
				},
				comparison_table: {
					header: "Compare All Features",
					feature: "Feature",
					plans: {
						free: "Free",
						basic: "Basic",
						premium: "Premium",
						enterprise: "Enterprise",
					},
					featuresComparison: [
						{
							name: "Resume Downloads",
							free: "1",
							basic: "5/month",
							premium: "Unlimited",
							enterprise: "Unlimited",
						},
						{
							name: "Templates",
							free: "3",
							basic: "10",
							premium: "All",
							enterprise: "Custom + All",
						},
						{
							name: "AI Writing Assistant",
							free: "Basic",
							basic: "Basic",
							premium: "Advanced",
							enterprise: "Advanced",
						},
						{
							name: "Export Formats",
							free: "PDF",
							basic: "PDF",
							premium: "PDF, DOCX",
							enterprise: "PDF, DOCX, HTML",
						},
						{
							name: "Support",
							free: "Email",
							basic: "Priority Email",
							premium: "Phone & Email",
							enterprise: "Dedicated",
						},
						{
							name: "Team Collaboration",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Yes",
						},
						{
							name: "Custom Branding",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Yes",
						},
						{
							name: "API Access",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Yes",
						},
					],
				},
				faq: {
					header: "Frequently Asked Questions",
					questions: [
						{
							question: "Can I switch plans at any time?",
							answer:
								"Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
						},
						{
							question: "Is there a free trial?",
							answer:
								"The Free plan is always free. Paid plans come with a 14-day free trial.",
						},
						{
							question: "What payment methods do you accept?",
							answer:
								"We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.",
						},
						{
							question: "Can I cancel my subscription?",
							answer: "Yes, you can cancel anytime. No questions asked.",
						},
						{
							question: "Do you offer discounts for students or nonprofits?",
							answer: "Yes! Contact our sales team for special pricing.",
						},
					],
					cta_section: {
						title: "Ready to elevate your career?",
						subtitle:
							"Join thousands of professionals who found their dream job with our resume builder.",
						start_free_trial: "Start Free Trial",
						schedule_demo: "Schedule a Demo",
					},
				},
			},
			contact: {
				title: "Contact Us",
				subtitle:
					"Have questions? We're here to help! Contact us and we'll get back to you as soon as possible.",
				form: {
					title: "Send Us a Message",
					name_label: "Full Name",
					name_placeholder: "John Doe",
					email_label: "Email Address",
					email_placeholder: "john@example.com",
					subject_label: "Subject",
					subject_placeholder: "How can we help you?",
					message_label: "Message",
					message_placeholder: "Tell us more about your inquiry...",
					submit_button: "Send Message",
					sending: "Sending...",
					success_message:
						"Thank you for your message! We'll get back to you soon.",
					error_message:
						"There was an error sending the message. Please try again.",
				},
				info: {
					email_title: "Email",
					email: "support@resbuilder.com",
					phone_title: "Phone",
					phone: "+1 (555) 123-4567",
					address_title: "Address",
					address: "Resume Street 123, Suite 100\nToronto, CA 94107",
					hours_title: "Business Hours",
					hours:
						"Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM",
				},
				location_title: "Our Location",
				location_description:
					"We're located in the heart of Toronto. Visit us during our business hours.",
				faq_title: "Frequently Asked Questions",
				faqs: [
					{
						question: "How can I get technical support?",
						answer:
							"For technical support, email our support team at support@resbuilder.com or use the contact form above.",
					},
					{
						question: "Do you offer enterprise solutions?",
						answer:
							"Yes! Contact our sales team for customized enterprise solutions and volume discounts.",
					},
					{
						question: "How long does it take to receive a response?",
						answer: "We typically respond within 24 hours on business days.",
					},
				],
				cta_title: "Ready to Get Started?",
				cta_subtitle:
					"Create your professional resume today and take the next step in your career.",
				cta_button1: "Start Free Trial",
				cta_button2: "View Pricing Plans",
			},
		},
		profile_modal: {
			title: "Profile",
			tabs: {
				profile_info: "Profile Information",
				plan_billing: "Plan & Billing",
			},
			profile: {
				current_plan: "Current Plan",
				change_plan: "Change Plan",
				first_name: "First Name",
				last_name: "Last Name",
				email_address: "Email Address",
				email_cannot_change: "Email cannot be changed",
				not_set: "Not set",
				loading_error: "Unable to load profile data",
				downloads_remaining: "Downloads remaining:",
				unlimited_downloads: "Unlimited downloads",
				plan_features: "Plan Features:",
				plan: "Plan",
			},
			billing: {
				current_plan_label: "Current plan",
				available_plans: "Available Plans",
				month: "month",
				free_plan: {
					name: "Free",
					description: "For individuals",
					price: "$0",
					features: ["1 Resume Download", "3 Templates", "Basic Support"],
				},
				basic_plan: {
					name: "Basic",
					description: "For professionals",
					price: "$4.99",
					price_mo: "$4.99/mo",
					features: [
						"5 Resume Downloads",
						"10 Templates",
						"Priority Support",
						"No Ads",
					],
				},
				premium_plan: {
					name: "Premium",
					description: "For power users",
					price: "$4.99",
					price_mo: "$4.99/mo",
					features: [
						"Unlimited Downloads",
						"All Templates",
						"AI Features",
						"Export to DOCX",
						"Priority Support",
					],
				},
				enterprise_plan: {
					name: "Enterprise",
					description: "For teams & companies",
					price: "Custom",
					features: [
						"Everything in Premium",
						"Team Collaboration",
						"Custom Templates",
						"Dedicated Support",
						"White Label",
					],
				},
				view_all_plans: "View detailed comparison of all plans",
				downgrade: "Downgrade",
				upgrade_to_basic: "Upgrade to Basic",
				upgrade_to_premium: "Upgrade to Premium",
				current_plan_text: "Current Plan",
			},
			buttons: {
				close: "Close",
				edit_profile: "Edit Profile",
				cancel: "Cancel",
				save_changes: "Save Changes",
				saving: "Saving...",
				view_all_plans: "View All Plans",
			},
			alerts: {
				unsaved_changes: "You have unsaved changes. Close anyway?",
				save_success: "Changes saved successfully!",
				save_error: "Failed to save changes. Please try again.",
				unexpected_error: "An unexpected error occurred. Please try again.",
			},
			plan_names: {
				free: "Free",
				basic: "Basic",
				premium: "Premium",
				enterprise: "Enterprise",
			},
		},
		template_names: {
			classic: "classic",
			classic_ats: "classic-ats",
			elegant: "elegant",
			modern: "modern",
			minimalist: "minimalist",
			student: "student",
		},
		footer: "2025 AI Resume Builder. All rights reserved.",
		general: {
			software_on_large_screens:
				"This Software can only be used on larger screens (tablets, laptops, desktops). Please switch to a larger device to use the Resume Builder",
			tab_selector: "Tab Selector",
			input_selector: "Input Selector",
			preview_selector: "Preview Selector",
			instructional_message:
				"Select one of the tabs above to start building your resume",
			organize_sections: "Organize resume sections",
			fill_in_information: "Fill in your information",
			preview_your_resume: "Preview your resume",
		},
	},
}
