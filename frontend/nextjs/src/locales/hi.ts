export default {
	greeting: "नमस्ते दुनिया",
	resume_builder: {
		navigation: {
			about: "हमारे बारे में",
			services: "सेवाएँ",
			pricing: "मूल्य निर्धारण",
			contact: "संपर्क करें",
			signin: "साइन इन",
			dashboard: "डैशबोर्ड",
			logout: "लॉग आउट",
			home: "होम",
		},
		profile_modal: {
			title: "प्रोफाइल",
			tabs: {
				profile_info: "प्रोफाइल जानकारी",
				plan_billing: "योजना और बिलिंग",
			},
			profile: {
				current_plan: "वर्तमान योजना",
				change_plan: "योजना बदलें",
				first_name: "पहला नाम",
				last_name: "उपनाम",
				email_address: "ईमेल पता",
				email_cannot_change: "ईमेल बदला नहीं जा सकता",
				not_set: "सेट नहीं",
				loading_error: "प्रोफाइल डेटा लोड करने में असमर्थ",
				downloads_remaining: "शेष डाउनलोड:",
				unlimited_downloads: "असीमित डाउनलोड",
				plan_features: "योजना सुविधाएँ:",
				plan: "योजना",
			},
			billing: {
				current_plan_label: "वर्तमान योजना",
				available_plans: "उपलब्ध योजनाएं",
				month: "माह",
				free_plan: {
					name: "मुफ्त",
					description: "व्यक्तियों के लिए",
					price: "$0",
					features: ["1 रेज़्यूमे डाउनलोड", "3 टेम्प्लेट", "बेसिक सपोर्ट"],
				},
				basic_plan: {
					name: "बेसिक",
					description: "पेशेवरों के लिए",
					price: "$9.99",
					price_mo: "$9.99/माह",
					features: [
						"5 रेज़्यूमे डाउनलोड",
						"10 टेम्प्लेट",
						"प्राथमिकता सपोर्ट",
						"कोई विज्ञापन नहीं",
					],
				},
				premium_plan: {
					name: "प्रीमियम",
					description: "पावर यूज़र्स के लिए",
					price: "$19.99",
					price_mo: "$19.99/माह",
					features: [
						"असीमित डाउनलोड",
						"सभी टेम्प्लेट",
						"एआई सुविधाएँ",
						"DOCX में निर्यात",
						"प्राथमिकता सपोर्ट",
					],
				},
				enterprise_plan: {
					name: "एंटरप्राइज़",
					description: "टीमों और कंपनियों के लिए",
					price: "कस्टम",
					features: [
						"प्रीमियम में सब कुछ",
						"टीम सहयोग",
						"कस्टम टेम्प्लेट",
						"समर्पित सपोर्ट",
						"व्हाइट लेबल",
					],
				},
				view_all_plans: "सभी योजनाओं की विस्तृत तुलना देखें",
				downgrade: "डाउनग्रेड",
				upgrade_to_basic: "बेसिक में अपग्रेड करें",
				upgrade_to_premium: "प्रीमियम में अपग्रेड करें",
				current_plan_text: "वर्तमान योजना",
			},
			buttons: {
				close: "बंद करें",
				edit_profile: "प्रोफाइल संपादित करें",
				cancel: "रद्द करें",
				save_changes: "परिवर्तन सहेजें",
				saving: "सहेजा जा रहा है...",
				view_all_plans: "सभी योजनाएं देखें",
			},
			alerts: {
				unsaved_changes: "आपके पास असहेजित परिवर्तन हैं। फिर भी बंद करें?",
				save_success: "परिवर्तन सफलतापूर्वक सहेजे गए!",
				save_error: "परिवर्तन सहेजने में विफल। कृपया पुनः प्रयास करें।",
				unexpected_error: "एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।",
			},
			plan_names: {
				free: "मुफ्त",
				basic: "बेसिक",
				premium: "प्रीमियम",
				enterprise: "एंटरप्राइज़",
			},
		},

		labels: {
			general: {
				build_your_resume: "अपना रेज़्यूमे बनाएं",
				edit: "संपादित करें",
				layout: "डिज़ाइन",
				next: "अगला",
				reset_all_inputs: "सभी इनपुट रीसेट करें",
				confirm_clear_inputs:
					"क्या आप वाकई सभी इनपुट रीसेट करना चाहते हैं? आप अपनी सारी प्रगति खो देंगे।",
				add_more_sections: "अधिक अनुभाग जोड़ें",
				template_selector: {
					selected_template: "चयनित टेम्पलेट",
					download: "डाउनलोड",
					write: "लिखें",
					choose_layout: "लेआउट चुनें",
					synch_content: "सामग्री सिंक करें",
				},
			},
			personal_information: {
				title: "व्यक्तिगत जानकारी",
				upload_photo: "फोटो अपलोड करें",
				choose_file: "फ़ाइल चुनें",
				no_file_chosen: "कोई फ़ाइल चयनित नहीं",
				remove_photo: "फोटो हटाएं",
				add_photo: "फोटो जोड़ें",
				first_name: "पहला नाम",
				last_name: "अंतिम नाम",
				job_title: "पदनाम",
				job_title_placeholder: "परियोजना प्रबंधक",
			},
			contact_information: {
				title: "संपर्क जानकारी",
				email: "ईमेल",
				phone: "फ़ोन",
				address: "पता",
				city_post_code: "शहर, राज्य/प्रांत और डाक कोड",
			},
			professional_summary: {
				title: "व्यावसायिक सारांश",
				description:
					"अपना पेशेवर शीर्षक, अनुभव के वर्ष, और अपनी सबसे प्रमुख उपलब्धियों को सूचीबद्ध करें, और हमारा एआई जेनरेटर आपकी इसमें सहायता करेगा।",
				cta_1: "जनरेट किया जा रहा है...",
				cta_2: "एआई से जनरेट करें",
				counter: {
					time_left: "पाठ को पुनः जनरेट करने के लिए शेष समय:",
					num_of_tries_left: "बचे हुए AI जनरेशन की संख्या:",
				},
			},
			skills: {
				title: "कौशल",
				add_skill: "कौशल जोड़ें",
				add_skill_below: "नीचे कौशल जोड़ें",
				placeholder: "विवरण पर ध्यान...",
				info: "अपने नौकरी के शीर्षक के अनुसार नीचे एक विकल्प चुनें, या ऊपर अपना खुद का दर्ज करें।",
				cta_1: "जनरेट करें",
				cta_2: "पुनः जनरेट करें",
				cta_3: "सुझाव",
			},
			employment_history: {
				title: "रोजगार इतिहास",
				title_2: "अपनी सबसे हाल की स्थिति से शुरू करें",
				company: "कंपनी",
				role: "भूमिका",
				year: "वर्ष (जैसे, 2020 - वर्तमान)",
				responsibilities: "जिम्मेदारियाँ (प्रत्येक नई पंक्ति में)",
				cta: "रोजगार इतिहास जोड़ें",
			},
			education: {
				title: "शिक्षा",
				institution: "संस्थान",
				degree: "डिग्री",
				year: "वर्ष / तिथि",
				cta: "शिक्षा जोड़ें",
			},
			links: {
				title: "लिंक",
				name: "नाम (जैसे, पोर्टफोलियो)",
				url: "Url (जैसे, https://www.yourwebsite.com)",
				cta: "लिंक जोड़ें",
			},
			hobbies: {
				title: "शौक",
				cta: "शौक जोड़ें",
			},
			certifications: {
				title: "प्रमाणपत्र",
				institution: "संस्थान",
				name: "प्रमाणपत्र का नाम",
				year: "वर्ष / तिथि",
				cta: "प्रमाणपत्र जोड़ें",
			},
			references: {
				title: "संदर्भ",
				name: "पूरा नाम",
				company_name: "कंपनी का नाम",
				email_phone: "ईमेल / फोन नंबर",
				cta: "संदर्भ जोड़ें",
			},
			languages: {
				title: "भाषाएँ",
				placeholder: "उदा., स्पैनिश, पुर्तगाली...",
				cta: "भाषा जोड़ें",
			},
			custom_section: {
				title: "कस्टम अनुभाग",
				header: "शीर्षक",
				subheader: "उपशीर्षक",
				content: "सामग्री",
				cta: "कस्टम अनुभाग जोड़ें",
			},
		},
		pages: {
			home: {
				title: "अपना पेशेवर रिज़्यूमे आसानी से बनाएं",
				description:
					"हमारे AI-संचालित रिज़्यूमे जनरेटर का उपयोग करके मिनटों में एक उत्कृष्ट रिज़्यूमे बनाएं।",
				cta_builder: "शुरू करें",
				cta_templates: "टेम्पलेट्स ब्राउज़ करें",
				features: {
					customization: "आसान अनुकूलन",
					customization_description:
						"अपने रिज़्यूमे को अनुकूलित करने के लिए अनुभाग और लेआउट संपादित करें।",
					ai_assistance: "AI सहायता",
					ai_assistance_description:
						"AI की मदद से एक प्रभावी पेशेवर सारांश बनाएं।",
					export_options: "विभिन्न निर्यात विकल्प",
					export_options_description:
						"अपने रिज़्यूमे को PDF या Word फ़ॉर्मेट में डाउनलोड करें।",
				},
				testimonials: {
					testimonials_title: "हमारे उपयोगकर्ता क्या कहते हैं",
					testimonials_description:
						"देखें कि हमारे रिज़्यूमे बिल्डर ने पेशेवरों को उनके करियर के लक्ष्य प्राप्त करने में कैसे मदद की।",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"इस रिज़्यूमे बिल्डर ने मिनटों में एक पेशेवर रिज़्यूमे बनाना बेहद आसान बना दिया!",
					testimonial_2_name: "David Lee",
					testimonial_2_text:
						"इस टूल की मदद से मुझे मेरी सपनों की नौकरी मिल गई! अत्यधिक अनुशंसित।",
				},
				how_it_works: {
					title: "यह कैसे काम करता है",
					description:
						"अपना परफेक्ट रिज़्यूमे बनाने के लिए इन आसान चरणों का पालन करें।",
					steps: [
						{
							title: "एक टेम्पलेट चुनें",
							description:
								"विभिन्न प्रोफेशनल रिज़्यूमे टेम्पलेट्स में से चुनें।",
						},
						{
							title: "अपनी जानकारी भरें",
							description:
								"अपनी जानकारी दर्ज करें और हमारी एआई आपकी सामग्री को सुधारने में मदद करेगी।",
						},
						{
							title: "डाउनलोड करें और आवेदन करें",
							description:
								"अपने रिज़्यूमे को एक्सपोर्ट करें और आत्मविश्वास के साथ नौकरियों के लिए आवेदन करें।",
						},
					],
				},
				faq: {
					title: "अक्सर पूछे जाने वाले प्रश्न",
					questions: [
						{
							question:
								"क्या रिज़्यूमे बिल्डर मुफ्त में उपयोग किया जा सकता है?",
							answer:
								"हाँ! आप अपना रिज़्यूमे मुफ्त में बना और डाउनलोड कर सकते हैं।",
						},
						{
							question:
								"क्या मैं रिज़्यूमे बनाने के बाद इसे संपादित कर सकता हूँ?",
							answer:
								"बिल्कुल! आप इसे डाउनलोड करने से पहले किसी भी समय संपादित कर सकते हैं।",
						},
						{
							question:
								"मैं अपने रिज़्यूमे को किस फॉर्मेट में एक्सपोर्ट कर सकता हूँ?",
							answer:
								"आप अपने रिज़्यूमे को PDF और Word फॉर्मेट में एक्सपोर्ट कर सकते हैं।",
						},
					],
				},
				final_cta: {
					title: "आज ही शुरू करें!",
					description:
						"कुछ ही मिनटों में अपना पेशेवर रिज़्यूमे बनाएं और अपनी पसंद की नौकरी पाएं।",
					cta_text: "मेरा रिज़्यूमे बनाएं",
				},
				demo_animation: {
					generating_text: "...आपका रेज़्यूमे जेनरेट हो रहा है",
					cloud_sync: "क्लाउड सिंक",
					ai_analysis: "एआई विश्लेषण",
					analytics: "विश्लेषिकी",
					default_first_name: "राहुल",
					default_last_name: "शर्मा",
					default_job_title: "परियोजना प्रबंधक",
				},
			},
			templates: {
				choose_from_many: "सैकड़ों टेम्पलेट्स में से चुनें",
			},
			about: {
				title: "हमारे बारे में",
				subtitle:
					"हम एआई का उपयोग करके रिज़्यूमे बनाने के तरीके में क्रांति ला रहे हैं।",
				mission: {
					title: "हमारा मिशन",
					description:
						"हमारा मिशन नौकरी चाहने वालों को ऐसे उपकरण प्रदान करना है जो रिज़्यूमे बनाना आसान, प्रभावी और कुशल बनाते हैं। हम आपको प्रतिस्पर्धी नौकरी बाजार में अलग पहचान दिलाने के लिए एआई का उपयोग करते हैं।",
				},
				our_values_title: "हमारे मूल्य",
				whyChooseUs_title: "हमें क्यों चुनें",
				values: [
					{
						icon: "FaLightbulb",
						title: "नवाचार",
						description:
							"हम लगातार नवाचार करते हैं ताकि उन्नत रिज़्यूमे निर्माण समाधान प्रदान कर सकें।",
					},
					{
						icon: "FaUsers",
						title: "उपयोगकर्ता-केंद्रित",
						description:
							"हमारे टूल उपयोगकर्ता को ध्यान में रखकर डिज़ाइन किए गए हैं, जिससे एक सहज अनुभव सुनिश्चित होता है।",
					},
					{
						icon: "FaHandshake",
						title: "ईमानदारी",
						description:
							"हम हर चीज़ में पारदर्शिता और ईमानदारी में विश्वास रखते हैं।",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "एआई-संचालित",
						description:
							"हमारा प्लेटफार्म उन्नत एआई का उपयोग करता है ताकि आपका रिज़्यूमे नियोक्ताओं का ध्यान आकर्षित कर सके।",
					},
					{
						icon: "FaClock",
						title: "समय बचाएं",
						description: "मिनटों में पेशेवर रिज़्यूमे बनाएं, घंटों में नहीं।",
					},
					{
						icon: "FaUserCheck",
						title: "आपके लिए अनुकूलित",
						description:
							"विशिष्ट नौकरी भूमिकाओं और उद्योगों के लिए अपने रिज़्यूमे को अनुकूलित करें।",
					},
				],
			},
			signin: {
				title: "लॉग इन करें",
				firstName: "पहला नाम",
				lastName: "उपनाम",
				email: "ईमेल",
				password: "पासवर्ड",
				confirm_password: "पासवर्ड की पुष्टि करें",
				cta: "लॉग इन करें",
				no_account: "अभी तक कोई खाता नहीं है",
				register: "रजिस्टर करें",
				or: "या",
				signup_with_google: "Google के साथ साइन अप करें",
				already_an_account: "पहले से ही एक खाता है",
				invalid_credentials: "अमान्य प्रमाण पत्र",
				account_exists: "पहले से ही आपके ईमेल से जुड़ा एक खाता मौजूद है",
				cta_forgot_password: "पासवर्ड भूल गए पर क्लिक करें",
				try_again: "कृपया पुनः प्रयास करें",
				forgot_password: "पासवर्ड भूल गए",
				errors: {
					validation: "आपको ईमेल और पासवर्ड दर्ज करना होगा",
					passwords_no_match: "पासवर्ड मेल नहीं खा रहे हैं",
					auth_failed: "प्रमाणीकरण विफल। कृपया पुनः प्रयास करें",
					google_auth_failed: "Google साइन-इन विफल। कृपया पुनः प्रयास करें",
					all_fields_required: "सभी फ़ील्ड आवश्यक हैं",
					password_min_length: "पासवर्ड कम से कम 8 वर्णों का होना चाहिए",
					email_exists: "ईमेल पहले से मौजूद है",
					invalid_credentials: "अमान्य ईमेल या पासवर्ड",
				},
			},
			services: {
				title: "अपना सपनों का करियर बनाएं",
				subtitle:
					"बेहतरीन रेज़्यूमे बनाने और अपने करियर को बढ़ावा देने के लिए AI का उपयोग करें।",
				services: [
					{
						icon: "FaFileAlt",
						title: "AI-संचालित रेज़्यूमे बिल्डर",
						description:
							"हमारे AI-चालित रेज़्यूमे बिल्डर के साथ मिनटों में पेशेवर, ATS-अनुकूल रेज़्यूमे बनाएं।",
					},
					{
						icon: "FaEdit",
						title: "रेज़्यूमे अनुकूलन",
						description:
							"विशेषज्ञ सिफारिशों के साथ विशिष्ट नौकरी भूमिकाओं और उद्योगों के लिए अपना रेज़्यूमे तैयार करें।",
					},
					{
						icon: "FaChartLine",
						title: "करियर अंतर्दृष्टि",
						description:
							"अपना रेज़्यूमे बेहतर बनाने और इंटरव्यू पाने की संभावना बढ़ाने के लिए कार्रवाई योग्य अंतर्दृष्टि प्राप्त करें।",
					},
					{
						icon: "FaDownload",
						title: "डाउनलोड और आवेदन करें",
						description:
							"आसानी से अपना रेज़्यूमे डाउनलोड करें और अपनी सपनों की नौकरियों के लिए आवेदन करना शुरू करें।",
					},
				],
				testimonials: [
					{
						quote:
							"इस AI रेज़्यूमे बिल्डर ने मुझे मेरी सपनों की नौकरी पाने में मदद की! अत्यधिक अनुशंसित।",
						author: "जॉन डो",
						role: "सॉफ्टवेयर इंजीनियर",
					},
					{
						quote:
							"अनुकूलन विकल्प शानदार हैं। मेरा रेज़्यूमे पेशेवर और परिष्कृत दिखता है।",
						author: "जेन स्मिथ",
						role: "मार्केटिंग मैनेजर",
					},
				],
				pricing: [
					{
						title: "बेसिक",
						price: "मुफ्त",
						features: ["1 रेज़्यूमे", "बेसिक टेम्प्लेट्स", "सीमित अनुकूलन"],
						cta: "शुरू करें",
					},
					{
						title: "प्रो",
						price: "$9.99/माह",
						features: [
							"असीमित रेज़्यूमे",
							"प्रीमियम टेम्प्लेट्स",
							"उन्नत अनुकूलन",
							"करियर अंतर्दृष्टि",
						],
						cta: "सदस्यता लें",
					},
				],
				get_started: "मुफ्त में शुरू करें",
				what_our_users_say: "हमारे उपयोगकर्ता क्या कहते हैं",
				create_resume_in_minutes:
					"हमारे AI-संचालित टूल के साथ मिनटों में एक पेशेवर रेज़्यूमे बनाएं।",
				pricing_plans: "मूल्य योजनाएं",
			},
			pricing: {
				title: "अपना सही प्लान चुनें",
				subtitle:
					"चाहे आप नौकरी ढूंढ रहे हों, पेशेवर हों या उद्यम, हमारे पास आपकी आवश्यकताओं के अनुरूप एक प्लान है।",
				billing: {
					monthly: "मासिक",
					yearly: "वार्षिक",
					save_20: "20% बचत",
					no_contract: "कोई लंबे समय के अनुबंध नहीं। कभी भी रद्द करें।",
				},
				plans: {
					most_popular: "सबसे लोकप्रिय",
					billed_annually_a: "वार्षिक बिल ($",
					billed_annually_b: "/माह)",
					custom_pricing: "कस्टम मूल्य निर्धारण",
					plans: [
						{
							name: "मुफ्त",
							description: "आज़माने के लिए बिल्कुल सही",
							features: [
								{ text: "1 रेज़्यूमे डाउनलोड", included: true },
								{ text: "3 पेशेवर टेम्प्लेट", included: true },
								{ text: "बेसिक एआई सुझाव", included: true },
								{ text: "ईमेल सपोर्ट", included: true },
								{ text: "असीमित डाउनलोड", included: false },
								{ text: "सभी टेम्प्लेट", included: false },
								{ text: "उन्नत एआई सुविधाएँ", included: false },
								{ text: "प्राथमिकता सपोर्ट", included: false },
								{ text: "कोई विज्ञापन नहीं", included: false },
							],
							cta: "मुफ्त में शुरू करें",
						},
						{
							name: "बेसिक",
							description: "नौकरी चाहने वालों के लिए",
							features: [
								{ text: "प्रति माह 5 रेज़्यूमे डाउनलोड", included: true },
								{ text: "10 पेशेवर टेम्प्लेट", included: true },
								{ text: "बेसिक एआई सुझाव", included: true },
								{ text: "प्राथमिकता ईमेल सपोर्ट", included: true },
								{ text: "कोई विज्ञापन नहीं", included: true },
								{ text: "असीमित डाउनलोड", included: false },
								{ text: "सभी टेम्प्लेट", included: false },
								{ text: "उन्नत एआई सुविधाएँ", included: false },
								{ text: "फोन सपोर्ट", included: false },
							],
							cta: "बेसिक चुनें",
						},
						{
							name: "प्रीमियम",
							description: "पावर यूज़र्स के लिए",
							features: [
								{ text: "असीमित रेज़्यूमे डाउनलोड", included: true },
								{ text: "सभी पेशेवर टेम्प्लेट", included: true },
								{ text: "उन्नत एआई राइटिंग असिस्टेंट", included: true },
								{ text: "प्राथमिकता फोन और ईमेल सपोर्ट", included: true },
								{ text: "कोई विज्ञापन नहीं", included: true },
								{ text: "PDF और DOCX में निर्यात", included: true },
								{ text: "एटीएस ऑप्टिमाइज़ेशन", included: true },
								{ text: "रेज़्यूमे एनालिटिक्स", included: true },
								{ text: "कस्टम ब्रांडिंग", included: false },
							],
							cta: "प्रीमियम चुनें",
						},
						{
							name: "एंटरप्राइज़",
							description: "टीमों और कंपनियों के लिए",
							features: [
								{ text: "प्रीमियम में सब कुछ", included: true },
								{ text: "टीम सहयोग", included: true },
								{ text: "कस्टम टेम्प्लेट डिज़ाइन", included: true },
								{ text: "समर्पित अकाउंट मैनेजर", included: true },
								{ text: "व्हाइट लेबल समाधान", included: true },
								{ text: "एपीआई एक्सेस", included: true },
								{ text: "SSO और उन्नत सुरक्षा", included: true },
								{ text: "कस्टम वर्कफ़्लो", included: true },
								{ text: "प्रशिक्षण और ऑनबोर्डिंग", included: true },
							],
							cta: "बिक्री से संपर्क करें",
						},
					],
				},
				comparison_table: {
					header: "सभी सुविधाओं की तुलना करें",
					feature: "सुविधा",
					plans: {
						free: "मुफ्त",
						basic: "बेसिक",
						premium: "प्रीमियम",
						enterprise: "एंटरप्राइज़",
					},
					featuresComparison: [
						{
							name: "रेज़्यूमे डाउनलोड",
							free: "1",
							basic: "5/माह",
							premium: "असीमित",
							enterprise: "असीमित",
						},
						{
							name: "टेम्प्लेट",
							free: "3",
							basic: "10",
							premium: "सभी",
							enterprise: "कस्टम + सभी",
						},
						{
							name: "एआई राइटिंग असिस्टेंट",
							free: "बेसिक",
							basic: "बेसिक",
							premium: "उन्नत",
							enterprise: "उन्नत",
						},
						{
							name: "एक्सपोर्ट फॉर्मेट",
							free: "PDF",
							basic: "PDF",
							premium: "PDF, DOCX",
							enterprise: "PDF, DOCX, HTML",
						},
						{
							name: "सपोर्ट",
							free: "ईमेल",
							basic: "प्राथमिकता ईमेल",
							premium: "फोन और ईमेल",
							enterprise: "समर्पित",
						},
						{
							name: "टीम सहयोग",
							free: "नहीं",
							basic: "नहीं",
							premium: "नहीं",
							enterprise: "हाँ",
						},
						{
							name: "कस्टम ब्रांडिंग",
							free: "नहीं",
							basic: "नहीं",
							premium: "नहीं",
							enterprise: "हाँ",
						},
						{
							name: "एपीआई एक्सेस",
							free: "नहीं",
							basic: "नहीं",
							premium: "नहीं",
							enterprise: "हाँ",
						},
					],
				},
				faq: {
					header: "अक्सर पूछे जाने वाले प्रश्न",
					questions: [
						{
							question: "क्या मैं किसी भी समय प्लान बदल सकता हूँ?",
							answer:
								"हां, आप किसी भी समय अपना प्लान अपग्रेड या डाउनग्रेड कर सकते हैं। परिवर्तन तुरंत प्रभावी हो जाते हैं।",
						},
						{
							question: "क्या कोई मुफ्त परीक्षण है?",
							answer:
								"मुफ्त प्लान हमेशा मुफ्त है। भुगतान वाले प्लान 14 दिनों के निःशुल्क परीक्षण के साथ आते हैं।",
						},
						{
							question: "आप कौन से भुगतान तरीके स्वीकार करते हैं?",
							answer:
								"हम सभी प्रमुख क्रेडिट कार्ड (Visa, MasterCard, American Express) और PayPal स्वीकार करते हैं।",
						},
						{
							question: "क्या मैं अपनी सदस्यता रद्द कर सकता हूँ?",
							answer:
								"हां, आप किसी भी समय रद्द कर सकते हैं। कोई सवाल नहीं पूछा जाएगा।",
						},
						{
							question:
								"क्या आप छात्रों या गैर-लाभकारी संगठनों के लिए छूट प्रदान करते हैं?",
							answer:
								"हाँ! विशेष मूल्य के लिए हमारी बिक्री टीम से संपर्क करें।",
						},
					],
					cta_section: {
						title: "अपना करियर बढ़ाने के लिए तैयार हैं?",
						subtitle:
							"हजारों पेशेवरों में शामिल हों जिन्होंने हमारे रेज़्यूमे बिल्डर से अपनी सपनों की नौकरी पाई।",
						start_free_trial: "निःशुल्क परीक्षण शुरू करें",
						schedule_demo: "डेमो शेड्यूल करें",
					},
				},
			},
			contact: {
				title: "संपर्क करें",
				subtitle:
					"प्रश्न हैं? हम मदद के लिए यहां हैं! हमसे संपर्क करें और हम जल्द से जल्द आपको जवाब देंगे।",
				form: {
					title: "हमें संदेश भेजें",
					name_label: "पूरा नाम",
					name_placeholder: "राहुल शर्मा",
					email_label: "ईमेल पता",
					email_placeholder: "rahul@example.com",
					subject_label: "विषय",
					subject_placeholder: "हम आपकी कैसे मदद कर सकते हैं?",
					message_label: "संदेश",
					message_placeholder: "अपनी पूछताछ के बारे में हमें और बताएं...",
					submit_button: "संदेश भेजें",
					sending: "भेजा जा रहा है...",
					success_message:
						"आपके संदेश के लिए धन्यवाद! हम जल्द ही आपको जवाब देंगे।",
					error_message:
						"संदेश भेजते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
				},
				info: {
					email_title: "ईमेल",
					email: "support@resbuilder.com",
					phone_title: "फोन",
					phone: "+1 (555) 123-4567",
					address_title: "पता",
					address: "123 मेन स्ट्रीट, टोरंटो, ON M5H 2N2, कनाडा",
					hours_title: "कार्य घंटे",
					hours:
						"सोमवार - शुक्रवार: सुबह 9:00 - शाम 6:00\nशनिवार: सुबह 10:00 - दोपहर 2:00",
				},
				location_title: "हमारा स्थान",
				location_description:
					"हम टोरंटो के दिल में स्थित हैं। हमारे कार्य घंटों के दौरान हमें मिलने आएं।",
				faq_title: "अक्सर पूछे जाने वाले प्रश्न",
				faqs: [
					{
						question: "मुझे तकनीकी सहायता कैसे मिल सकती है?",
						answer:
							"तकनीकी सहायता के लिए, हमारी सहायता टीम को support@resbuilder.com पर ईमेल करें या ऊपर दिए गए संपर्क फॉर्म का उपयोग करें।",
					},
					{
						question: "क्या आप उद्यम समाधान प्रदान करते हैं?",
						answer:
							"हाँ! अनुकूलित उद्यम समाधान और थोक छूट के लिए हमारी बिक्री टीम से संपर्क करें।",
					},
					{
						question: "उत्तर प्राप्त करने में कितना समय लगता है?",
						answer:
							"हम आमतौर पर कार्य दिवसों पर 24 घंटों के भीतर जवाब देते हैं।",
					},
				],
				cta_title: "शुरू करने के लिए तैयार हैं?",
				cta_subtitle:
					"आज ही अपना पेशेवर रेज़्यूमे बनाएं और अपने करियर में अगला कदम उठाएं।",
				cta_button1: "निःशुल्क परीक्षण शुरू करें",
				cta_button2: "मूल्य योजनाएं देखें",
			},
		},
		template_names: {
			classic: "क्लासिक",
			classic_ats: "क्लासिक ATS",
			elegant: "शालीन",
			modern: "आधुनिक",
			minimalist: "न्यूनतमवादी",
			student: "छात्र",
		},
		footer: "2025 AI रेज़्यूमे बिल्डर. सर्वाधिकार सुरक्षित.",
		general: {
			software_on_large_screens:
				"यह सॉफ्टवेयर केवल बड़ी स्क्रीन (टैबलेट, लैपटॉप, डेस्कटॉप) पर उपयोग किया जा सकता है। कृपया रेज़्यूमे बिल्डर का उपयोग करने के लिए बड़े डिवाइस पर स्विच करें",
			tab_selector: "टैब चयनकर्ता",
			input_selector: "इनपुट चयनकर्ता",
			preview_selector: "पूर्वावलोकन चयनकर्ता",
			instructional_message:
				"अपना रेज़्यूमे बनाना शुरू करने के लिए ऊपर दिए गए टैब में से एक चुनें",
			organize_sections: "रेज़्यूमे सेक्शन व्यवस्थित करें",
			fill_in_information: "अपनी जानकारी भरें",
			preview_your_resume: "अपने रेज़्यूमे का पूर्वावलोकन करें",
		},
	},
}
