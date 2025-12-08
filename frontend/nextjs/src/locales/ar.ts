export default {
	greeting: "مرحبا بالعالم",
	resume_builder: {
		navigation: {
			about: "معلومات عنا",
			services: "الخدمات",
			pricing: "التسعير",
			contact: "اتصل بنا",
			signin: "تسجيل الدخول",
			dashboard: "لوحة التحكم",
			logout: "تسجيل الخروج",
			home: "الرئيسية",
		},
		profile_modal: {
			title: "الملف الشخصي",
			tabs: {
				profile_info: "معلومات الملف الشخصي",
				plan_billing: "الخطة والفوترة",
			},
			profile: {
				current_plan: "الخطة الحالية",
				change_plan: "تغيير الخطة",
				first_name: "الاسم الأول",
				last_name: "اسم العائلة",
				email_address: "البريد الإلكتروني",
				email_cannot_change: "لا يمكن تغيير البريد الإلكتروني",
				not_set: "غير مضبوط",
				loading_error: "غير قادر على تحميل بيانات الملف الشخصي",
				downloads_remaining: "التحميلات المتبقية:",
				unlimited_downloads: "تحميلات غير محدودة",
				plan_features: "مميزات الخطة:",
				plan: "الخطة",
			},
			billing: {
				current_plan_label: "الخطة الحالية",
				available_plans: "الخطط المتاحة",
				month: "شهر",
				free_plan: {
					name: "مجاني",
					description: "للفرد",
					price: "$0",
					features: ["تحميل سيرة ذاتية واحدة", "3 قوالب", "دعم أساسي"],
				},
				basic_plan: {
					name: "أساسي",
					description: "للمحترفين",
					price: "$9.99",
					price_mo: "$9.99/شهر",
					features: [
						"5 تحميلات سيرة ذاتية",
						"10 قوالب",
						"دعم ذو أولوية",
						"بدون إعلانات",
					],
				},
				premium_plan: {
					name: "متميز",
					description: "للمستخدمين المتقدمين",
					price: "$19.99",
					price_mo: "$19.99/شهر",
					features: [
						"تحميلات غير محدودة",
						"جميع القوالب",
						"مميزات الذكاء الاصطناعي",
						"تصدير إلى DOCX",
						"دعم ذو أولوية",
					],
				},
				enterprise_plan: {
					name: "مؤسسة",
					description: "للفرق والشركات",
					price: "مخصص",
					features: [
						"كل شيء في المتميز",
						"تعاون الفريق",
						"قوالب مخصصة",
						"دعم مخصص",
						"وايت ليبل",
					],
				},
				view_all_plans: "عرض مقارنة مفصلة لجميع الخطط",
				downgrade: "تخفيض",
				upgrade_to_basic: "الترقية إلى الأساسي",
				upgrade_to_premium: "الترقية إلى المتميز",
				current_plan_text: "الخطة الحالية",
			},
			buttons: {
				close: "إغلاق",
				edit_profile: "تعديل الملف الشخصي",
				cancel: "إلغاء",
				save_changes: "حفظ التغييرات",
				saving: "جارٍ الحفظ...",
				view_all_plans: "عرض جميع الخطط",
			},
			alerts: {
				unsaved_changes: "لديك تغييرات غير محفوظة. هل تريد الإغلاق على أي حال؟",
				save_success: "تم حفظ التغييرات بنجاح!",
				save_error: "فشل في حفظ التغييرات. يرجى المحاولة مرة أخرى.",
				unexpected_error: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
			},
			plan_names: {
				free: "مجاني",
				basic: "أساسي",
				premium: "متميز",
				enterprise: "مؤسسة",
			},
		},

		labels: {
			general: {
				build_your_resume: "أنشئ سيرتك الذاتية",
				edit: "تعديل",
				layout: "التخطيط",
				next: "التالي",
				reset_all_inputs: "إعادة تعيين جميع المدخلات",
				confirm_clear_inputs:
					"هل أنت متأكد أنك تريد إعادة تعيين جميع المدخلات؟ ستفقد أي تقدم أحرزته.",
				add_more_sections: "إضافة المزيد من الأقسام",
				template_selector: {
					selected_template: "القالب المحدد",
					download: "تحميل",
					write: "كتابة",
					choose_layout: "اختر تخطيطًا",
					synch_content: "مزامنة المحتوى",
				},
			},
			personal_information: {
				title: "المعلومات الشخصية",
				upload_photo: "رفع صورة",
				choose_file: "اختر ملف",
				no_file_chosen: "لم يتم اختيار ملف",
				remove_photo: "إزالة الصورة",
				add_photo: "إضافة صورة",
				first_name: "الاسم الأول",
				last_name: "اسم العائلة",
				job_title: "المسمى الوظيفي",
				job_title_placeholder: "مدير المشروع",
			},
			contact_information: {
				title: "معلومات الاتصال",
				email: "البريد الإلكتروني",
				phone: "الهاتف",
				address: "العنوان",
				city_post_code: "المدينة، الولاية/المقاطعة والرمز البريدي",
			},
			professional_summary: {
				title: "الملخص المهني",
				description:
					"قم بإدخال مسمى وظيفتك، عدد سنوات خبرتك، وأبرز إنجازاتك، وسيساعدك مولد الذكاء الاصطناعي في إنشائه.",
				cta_1: "جارٍ التوليد...",
				cta_2: "إنشاء باستخدام الذكاء الاصطناعي",
				counter: {
					time_left: "الوقت المتبقي لإعادة إنشاء النص:",
					num_of_tries_left: "عدد محاولات توليد الذكاء الاصطناعي المتبقية:",
				},
			},
			skills: {
				title: "المهارات",
				add_skill: "إضافة مهارة",
				add_skill_below: "إضافة مهارة أدناه",
				placeholder: "الاهتمام بالتفاصيل...",
				info: "اختر خيارًا أدناه بناءً على مسمى وظيفتك، أو أدخل مهارتك الخاصة أعلاه.",
				cta_1: "إنشاء",
				cta_2: "إعادة الإنشاء",
				cta_3: "اقتراحات",
			},
			employment_history: {
				title: "تاريخ التوظيف",
				title_2: "ابدأ بأحدث وظيفة لديك",
				company: "الشركة",
				role: "الدور الوظيفي",
				year: "السنة (مثال: 2020 - حتى الآن)",
				responsibilities: "المسؤوليات (كل واحدة في سطر جديد)",
				cta: "إضافة تاريخ التوظيف",
			},
			education: {
				title: "التعليم",
				institution: "المؤسسة التعليمية",
				degree: "الدرجة العلمية",
				year: "السنة / التاريخ",
				cta: "إضافة التعليم",
			},
			links: {
				title: "الروابط",
				name: "الاسم (مثال: معرض الأعمال)",
				url: "الرابط (مثال: https://www.yourwebsite.com)",
				cta: "إضافة رابط",
			},
			hobbies: {
				title: "الهوايات",
				cta: "إضافة هواية",
			},
			certifications: {
				title: "الشهادات",
				institution: "المؤسسة",
				name: "اسم الشهادة",
				year: "السنة / التاريخ",
				cta: "إضافة شهادة",
			},
			references: {
				title: "المراجع",
				name: "الاسم الكامل للمرجع",
				company_name: "اسم الشركة",
				email_phone: "البريد الإلكتروني / رقم الهاتف",
				cta: "إضافة مرجع",
			},
			languages: {
				title: "اللغات",
				placeholder: "مثال: الإسبانية، البرتغالية...",
				cta: "إضافة لغة",
			},
			custom_section: {
				title: "قسم مخصص",
				header: "العنوان",
				subheader: "العنوان الفرعي",
				content: "المحتوى",
				cta: "إضافة قسم مخصص",
			},
		},
		pages: {
			home: {
				title: "قم بإنشاء سيرتك الذاتية المهنية بسهولة",
				description:
					"قم بإنشاء سيرة ذاتية مميزة في دقائق باستخدام منشئ السير الذاتية المدعوم بالذكاء الاصطناعي.",
				cta_builder: "ابدأ الآن",
				cta_templates: "تصفح القوالب",
				features: {
					customization: "تخصيص سهل",
					customization_description:
						"قم بتخصيص سيرتك الذاتية بأقسام وتخطيطات قابلة للتعديل.",
					ai_assistance: "مساعدة الذكاء الاصطناعي",
					ai_assistance_description:
						"دع الذكاء الاصطناعي يساعدك في إنشاء ملخص احترافي مقنع.",
					export_options: "خيارات تصدير متعددة",
					export_options_description:
						"قم بتنزيل سيرتك الذاتية بصيغة PDF أو Word.",
				},
				testimonials: {
					testimonials_title: "ماذا يقول مستخدمونا",
					testimonials_description:
						"اكتشف كيف ساعد منشئ السيرة الذاتية الخاص بنا المحترفين في تحقيق أهدافهم المهنية.",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"جعل منشئ السيرة الذاتية هذا من السهل جدًا إنشاء سيرة ذاتية احترافية في دقائق!",
					testimonial_2_name: "David Lee",
					testimonial_2_text:
						"لقد حصلت على وظيفة أحلامي بفضل هذه الأداة! أنصح بها بشدة.",
				},
				how_it_works: {
					title: "كيف يعمل",
					description:
						"اتبع هذه الخطوات البسيطة لإنشاء سيرتك الذاتية المثالية.",
					steps: [
						{
							title: "اختر قالبًا",
							description:
								"اختر من بين مجموعة متنوعة من قوالب السيرة الذاتية الاحترافية.",
						},
						{
							title: "املأ تفاصيلك",
							description:
								"أدخل معلوماتك ودع الذكاء الاصطناعي لدينا يحسن محتواك.",
						},
						{
							title: "قم بالتنزيل وابدأ التقديم",
							description:
								"قم بتصدير سيرتك الذاتية وابدأ في التقديم للوظائف بثقة.",
						},
					],
				},
				faq: {
					title: "الأسئلة الشائعة",
					questions: [
						{
							question: "هل منشئ السيرة الذاتية مجاني؟",
							answer: "نعم! يمكنك إنشاء وتحميل سيرتك الذاتية مجانًا.",
						},
						{
							question: "هل يمكنني تعديل سيرتي الذاتية بعد إنشائها؟",
							answer: "بالطبع! يمكنك تعديلها في أي وقت قبل تنزيلها.",
						},
						{
							question: "ما هي الصيغ التي يمكنني تصدير سيرتي الذاتية بها؟",
							answer: "يمكنك تصدير سيرتك الذاتية بصيغتي PDF و Word.",
						},
					],
				},
				final_cta: {
					title: "ابدأ اليوم!",
					description:
						"قم بإنشاء سيرتك الذاتية الاحترافية في دقائق واحصل على وظيفة أحلامك.",
					cta_text: "أنشئ سيرتي الذاتية",
				},
				demo_animation: {
					generating_text: "...جاري إنشاء سيرتك الذاتية",
					cloud_sync: "مزامنة السحابة",
					ai_analysis: "التحليل بالذكاء الاصطناعي",
					analytics: "التحليلات",
					default_first_name: "أحمد",
					default_last_name: "محمد",
					default_job_title: "مدير مشاريع",
				},
			},
			templates: {
				choose_from_many: "اختر من بين مئات القوالب",
			},
			about: {
				title: "من نحن",
				subtitle:
					"نحن نحدث ثورة في طريقة إنشاء السير الذاتية باستخدام الذكاء الاصطناعي.",
				mission: {
					title: "مهمتنا",
					description:
						"مهمتنا هي تمكين الباحثين عن عمل من خلال أدوات تجعل إنشاء السيرة الذاتية سهلاً وفعالاً وناجحاً. نحن نستخدم الذكاء الاصطناعي لمساعدتك على التميز في سوق العمل التنافسي.",
				},
				our_values_title: "قيمنا",
				whyChooseUs_title: "لماذا تختارنا",
				values: [
					{
						icon: "FaLightbulb",
						title: "الابتكار",
						description:
							"نحن نبتكر باستمرار لتقديم حلول متطورة لإنشاء السير الذاتية.",
					},
					{
						icon: "FaUsers",
						title: "تركيز على المستخدم",
						description:
							"تم تصميم أدواتنا مع وضع المستخدم في الاعتبار لضمان تجربة سلسة.",
					},
					{
						icon: "FaHandshake",
						title: "النزاهة",
						description: "نحن نؤمن بالشفافية والصدق في كل ما نقوم به.",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "مدعوم بالذكاء الاصطناعي",
						description:
							"يستخدم نظامنا الذكاء الاصطناعي المتقدم لإنشاء سير ذاتية تجذب انتباه أصحاب العمل.",
					},
					{
						icon: "FaClock",
						title: "توفير الوقت",
						description:
							"قم بإنشاء سيرة ذاتية احترافية في دقائق بدلاً من ساعات.",
					},
					{
						icon: "FaUserCheck",
						title: "مصمم خصيصًا لك",
						description:
							"قم بتخصيص سيرتك الذاتية وفقًا للأدوار الوظيفية والصناعات المختلفة.",
					},
				],
			},
			signin: {
				title: "تسجيل الدخول",
				firstName: "الاسم الأول",
				lastName: "اسم العائلة",
				email: "البريد الإلكتروني",
				password: "كلمة المرور",
				confirm_password: "تأكيد كلمة المرور",
				cta: "تسجيل الدخول",
				no_account: "ليس لديك حساب بعد؟",
				register: "تسجيل",
				or: "أو",
				signup_with_google: "سجل باستخدام جوجل",
				already_an_account: "هل لديك حساب بالفعل؟",
				invalid_credentials: "بيانات الاعتماد غير صالحة",
				account_exists: "هناك بالفعل حساب مرتبط ببريدك الإلكتروني",
				cta_forgot_password: "اضغط على نسيت كلمة المرور",
				try_again: "يرجى المحاولة مرة أخرى",
				forgot_password: "نسيت كلمة المرور",
				errors: {
					validation: "يجب إدخال البريد الإلكتروني وكلمة المرور",
					passwords_no_match: "كلمات المرور غير متطابقة",
					auth_failed: "فشل المصادقة. يرجى المحاولة مرة أخرى",
					google_auth_failed:
						"فشل تسجيل الدخول عبر جوجل. يرجى المحاولة مرة أخرى",
					all_fields_required: "جميع الحقول مطلوبة",
					password_min_length: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
					email_exists: "البريد الإلكتروني موجود بالفعل",
					invalid_credentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
				},
			},
			services: {
				title: "ابنِ مسيرتك المهنية الأحلام",
				subtitle:
					"استخدم الذكاء الاصطناعي لإنشاء السيرة الذاتية المثالية وتعزيز مسيرتك المهنية.",
				services: [
					{
						icon: "FaFileAlt",
						title: "منشئ السير الذاتية بالذكاء الاصطناعي",
						description:
							"أنشئ سير ذاتية احترافية متوافقة مع أنظمة التتبع (ATS) في دقائق باستخدام منشئ السير الذاتية المدعوم بالذكاء الاصطناعي.",
					},
					{
						icon: "FaEdit",
						title: "تخصيص السيرة الذاتية",
						description:
							"صمم سيرتك الذاتية لوظائف ومجالات محددة مع توصيات الخبراء.",
					},
					{
						icon: "FaChartLine",
						title: "رؤى مهنية",
						description:
							"احصل على رؤى قابلة للتطبيق لتحسين سيرتك الذاتية وزيادة فرصك في الحصول على المقابلات.",
					},
					{
						icon: "FaDownload",
						title: "تحميل والتقديم",
						description:
							"حمّل سيرتك الذاتية بسهولة وابدأ بالتقديم إلى وظائف أحلامك.",
					},
				],
				testimonials: [
					{
						quote:
							"ساعدني منشئ السير الذاتية هذا بالذكاء الاصطناعي في الحصول على وظيفة أحلامي! موصى به بشدة.",
						author: "جون دو",
						role: "مهندس برمجيات",
					},
					{
						quote: "خيارات التخصيص رائعة. سيرتي الذاتية تبدو احترافية ومصقولة.",
						author: "جين سميث",
						role: "مديرة تسويق",
					},
				],
				pricing: [
					{
						title: "اساسي",
						price: "مجاني",
						features: ["سيرة ذاتية واحدة", "قوالب أساسية", "تخصيص محدود"],
						cta: "ابدأ الآن",
					},
					{
						title: "احترافي",
						price: "9.99 دولار/شهر",
						features: [
							"سير ذاتية غير محدودة",
							"قوالب مميزة",
							"تخصيص متقدم",
							"رؤى مهنية",
						],
						cta: "اشترك",
					},
				],
				get_started: "ابدأ مجانًا",
				what_our_users_say: "ما يقوله مستخدمونا",
				create_resume_in_minutes:
					"أنشئ سيرة ذاتية احترافية في دقائق باستخدام أدواتنا المدعومة بالذكاء الاصطناعي.",
				pricing_plans: "الباقات السعرية",
			},
			pricing: {
				title: "اختر خطتك المثالية",
				subtitle:
					"سواء كنت باحثًا عن عمل، محترفًا أو مؤسسة، لدينا خطة تناسب احتياجاتك.",
				billing: {
					monthly: "شهري",
					yearly: "سنوي",
					save_20: "وفر 20%",
					no_contract: "لا عقود طويلة الأجل. إلغاء في أي وقت.",
				},
				plans: {
					most_popular: "الأكثر شعبية",
					billed_annually_a: "فاتورة سنوية ($",
					billed_annually_b: "/شهر)",
					custom_pricing: "تسعير مخصص",
					plans: [
						{
							name: "مجاني",
							description: "مثالي للتجربة",
							features: [
								{ text: "تحميل سيرة ذاتية واحدة", included: true },
								{ text: "3 قوالب احترافية", included: true },
								{ text: "اقتراحات ذكاء اصطناعي أساسية", included: true },
								{ text: "دعم عبر البريد الإلكتروني", included: true },
								{ text: "تحميلات غير محدودة", included: false },
								{ text: "جميع القوالب", included: false },
								{ text: "ميزات الذكاء الاصطناعي المتقدمة", included: false },
								{ text: "دعم ذو أولوية", included: false },
								{ text: "بدون إعلانات", included: false },
							],
							cta: "ابدأ مجانًا",
						},
						{
							name: "أساسي",
							description: "لباحثي العمل",
							features: [
								{ text: "5 تحميلات سيرة ذاتية شهريًا", included: true },
								{ text: "10 قوالب احترافية", included: true },
								{ text: "اقتراحات ذكاء اصطناعي أساسية", included: true },
								{ text: "دعم ذو أولوية عبر البريد الإلكتروني", included: true },
								{ text: "بدون إعلانات", included: true },
								{ text: "تحميلات غير محدودة", included: false },
								{ text: "جميع القوالب", included: false },
								{ text: "ميزات الذكاء الاصطناعي المتقدمة", included: false },
								{ text: "دعم هاتفي", included: false },
							],
							cta: "اختر الأساسي",
						},
						{
							name: "متميز",
							description: "للمستخدمين المتقدمين",
							features: [
								{ text: "تحميلات سيرة ذاتية غير محدودة", included: true },
								{ text: "جميع القوالب الاحترافية", included: true },
								{ text: "مساعد كتابة ذكاء اصطناعي متقدم", included: true },
								{ text: "دعم ذو أولوية هاتفي وبريد إلكتروني", included: true },
								{ text: "بدون إعلانات", included: true },
								{ text: "تصدير إلى PDF و DOCX", included: true },
								{ text: "تحسين ATS", included: true },
								{ text: "تحليلات السيرة الذاتية", included: true },
								{ text: "العلامة التجارية المخصصة", included: false },
							],
							cta: "اختر المتميز",
						},
						{
							name: "مؤسسة",
							description: "للفرق والشركات",
							features: [
								{ text: "كل شيء في المتميز", included: true },
								{ text: "تعاون الفريق", included: true },
								{ text: "تصميم قوالب مخصص", included: true },
								{ text: "مدير حساب مخصص", included: true },
								{ text: "حل White Label", included: true },
								{ text: "وصول إلى API", included: true },
								{ text: "SSO وأمان متقدم", included: true },
								{ text: "سير عمل مخصصة", included: true },
								{ text: "تدريب وتسليم", included: true },
							],
							cta: "اتصل بالمبيعات",
						},
					],
				},
				comparison_table: {
					header: "قارن جميع الميزات",
					feature: "الميزة",
					plans: {
						free: "مجاني",
						basic: "أساسي",
						premium: "متميز",
						enterprise: "مؤسسة",
					},
					featuresComparison: [
						{
							name: "تحميلات السيرة الذاتية",
							free: "1",
							basic: "5/شهر",
							premium: "غير محدود",
							enterprise: "غير محدود",
						},
						{
							name: "القوالب",
							free: "3",
							basic: "10",
							premium: "الكل",
							enterprise: "مخصص + الكل",
						},
						{
							name: "مساعد الكتابة بالذكاء الاصطناعي",
							free: "أساسي",
							basic: "أساسي",
							premium: "متقدم",
							enterprise: "متقدم",
						},
						{
							name: "صيغ التصدير",
							free: "PDF",
							basic: "PDF",
							premium: "PDF, DOCX",
							enterprise: "PDF, DOCX, HTML",
						},
						{
							name: "الدعم",
							free: "بريد إلكتروني",
							basic: "بريد إلكتروني ذو أولوية",
							premium: "هاتف وبريد إلكتروني",
							enterprise: "مخصص",
						},
						{
							name: "تعاون الفريق",
							free: "لا",
							basic: "لا",
							premium: "لا",
							enterprise: "نعم",
						},
						{
							name: "علامة تجارية مخصصة",
							free: "لا",
							basic: "لا",
							premium: "لا",
							enterprise: "نعم",
						},
						{
							name: "وصول إلى API",
							free: "لا",
							basic: "لا",
							premium: "لا",
							enterprise: "نعم",
						},
					],
				},
				faq: {
					header: "الأسئلة الشائعة",
					questions: [
						{
							question: "هل يمكنني تغيير الخطة في أي وقت؟",
							answer:
								"نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات سارية المفعول فورًا.",
						},
						{
							question: "هل هناك نسخة تجريبية مجانية؟",
							answer:
								"الخطة المجانية دائمًا مجانية. الخطط المدفوعة تأتي مع نسخة تجريبية مجانية لمدة 14 يومًا.",
						},
						{
							question: "ما هي طرق الدفع التي تقبلونها؟",
							answer:
								"نقبل جميع بطاقات الائتمان الرئيسية (Visa، MasterCard، American Express) وPayPal.",
						},
						{
							question: "هل يمكنني إلغاء اشتراكي؟",
							answer: "نعم، يمكنك الإلغاء في أي وقت. دون أسئلة.",
						},
						{
							question: "هل تقدمون خصومات للطلاب أو المنظمات غير الربحية؟",
							answer: "نعم! اتصل بفريق المبيعات للحصول على أسعار خاصة.",
						},
					],
					cta_section: {
						title: "مستعد لرفع مستوى مسيرتك المهنية؟",
						subtitle:
							"انضم إلى آلاف المحترفين الذين وجدوا وظيفة أحلامهم باستخدام منشئ السير الذاتية الخاص بنا.",
						start_free_trial: "ابدأ النسخة التجريبية المجانية",
						schedule_demo: "جدولة عرض توضيحي",
					},
				},
			},
			contact: {
				title: "اتصل بنا",
				subtitle:
					"هل لديك أسئلة؟ نحن هنا للمساعدة! اتصل بنا وسنرد عليك في أقرب وقت ممكن.",
				form: {
					title: "أرسل لنا رسالة",
					name_label: "الاسم الكامل",
					name_placeholder: "أحمد محمد",
					email_label: "البريد الإلكتروني",
					email_placeholder: "ahmed@example.com",
					subject_label: "الموضوع",
					subject_placeholder: "كيف يمكننا مساعدتك؟",
					message_label: "الرسالة",
					message_placeholder: "أخبرنا المزيد عن استفسارك...",
					submit_button: "إرسال الرسالة",
					sending: "جارٍ الإرسال...",
					success_message: "شكرًا لرسالتك! سنرد عليك قريبًا.",
					error_message: "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
				},
				info: {
					email_title: "البريد الإلكتروني",
					email: "support@resbuilder.com",
					phone_title: "الهاتف",
					phone: "+1 (555) 123-4567",
					address_title: "العنوان",
					address: "123 شارع السوق، الطابق 5، تورونتو، أونتاريو، M5H 2N2، كندا",
					hours_title: "ساعات العمل",
					hours:
						"الاثنين - الجمعة: 9:00 صباحًا - 6:00 مساءً\nالسبت: 10:00 صباحًا - 2:00 مساءً",
				},
				location_title: "موقعنا",
				location_description:
					"نحن موجودون في قلب تورونتو. زورنا خلال ساعات العمل.",
				faq_title: "الأسئلة الشائعة",
				faqs: [
					{
						question: "كيف يمكنني الحصول على الدعم الفني؟",
						answer:
							"للحصول على الدعم الفني، أرسل بريدًا إلكترونيًا إلى فريق الدعم لدينا على support@resbuilder.com أو استخدم نموذج الاتصال أعلاه.",
					},
					{
						question: "هل تقدمون حلولًا للمؤسسات؟",
						answer:
							"نعم! اتصل بفريق المبيعات لدينا للحصول على حلول مؤسسية مخصصة وخصومات على الكميات.",
					},
					{
						question: "كم من الوقت يستغرق تلقي رد؟",
						answer: "عادةً ما نرد في غضون 24 ساعة في أيام العمل.",
					},
				],
				cta_title: "مستعد للبدء؟",
				cta_subtitle:
					"أنشئ سيرتك الذاتية الاحترافية اليوم واتخذ الخطوة التالية في مسيرتك المهنية.",
				cta_button1: "ابدأ النسخة التجريبية المجانية",
				cta_button2: "عرض خطط الأسعار",
			},
		},
		template_names: {
			classic: "كلاسيكي",
			classic_ats: "كلاسيكي ATS",
			elegant: "أنيق",
			modern: "حديث",
			minimalist: "بسيط",
			student: "طالب",
		},
		footer: "2025 منشئ السير الذاتية بالذكاء الاصطناعي. جميع الحقوق محفوظة.",
		general: {
			software_on_large_screens:
				"هذا البرنامج يمكن استخدامه فقط على الشاشات الكبيرة (الأجهزة اللوحية، أجهزة الكمبيوتر المحمولة، أجهزة الكمبيوتر المكتبية). يرجى التبديل إلى جهاز أكبر لاستخدام منشئ السير الذاتية",
			tab_selector: "محدد علامات التبويب",
			input_selector: "محدد الإدخال",
			preview_selector: "محدد المعاينة",
			instructional_message:
				"حدد إحدى علامات التبويب أعلاه لبدء إنشاء سيرتك الذاتية",
			organize_sections: "تنظيم أقسام السيرة الذاتية",
			fill_in_information: "املأ معلوماتك",
			preview_your_resume: "معاينة سيرتك الذاتية",
		},
	},
}
