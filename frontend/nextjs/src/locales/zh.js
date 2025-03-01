export default {
	greeting: "你好，世界",
	resume_builder: {
		navigation: {
			about: "关于我们",
			services: "服务",
			contact: "联系我们",
		},
		labels: {
			general: {
				edit: "编辑",
				layout: "布局",
				next: "下一步",
				reset_all_inputs: "重置所有输入",
				confirm_clear_inputs: "您确定要重置所有输入吗？您的所有进度都将丢失。",
				add_more_sections: "添加更多部分",
				template_selector: {
					selected_template: "已选择的模板",
					download: "下载",
					write: "书写",
					choose_layout: "选择布局",
				},
			},
			personal_information: {
				title: "个人信息",
				upload_photo: "上传照片",
				choose_file: "选择文件",
				no_file_chosen: "未选择文件",
				remove_photo: "删除照片",
				add_photo: "添加照片",
				first_name: "名字",
				last_name: "姓氏",
				job_title: "职位",
				job_title_placeholder: "项目经理",
			},
			contact_information: {
				title: "联系方式",
				email: "电子邮件",
				phone: "电话",
				address: "地址",
				city_post_code: "城市、省/州和邮政编码",
			},
			professional_summary: {
				title: "职业摘要",
				description:
					"列出您的职业名称、工作年限，并突出您的主要成就，我们的 AI 生成器将帮助您创建它。",
				cta_1: "正在生成...",
				cta_2: "使用 AI 生成",
				counter: {
					time_left: "重新生成文本的剩余时间:",
					num_of_tries_left: "剩余的AI生成次数：",
				},
			},
			skills: {
				title: "技能",
				add_skill: "添加技能",
				add_skill_below: "在下方添加技能",
				placeholder: "注重细节...",
				info: "根据您的职位选择下面的选项，或在上方输入自己的技能。",
				cta_1: "生成",
				cta_2: "重新生成",
				cta_3: "建议",
			},
			employment_history: {
				title: "工作经历",
				title_2: "从最近的职位开始",
				company: "公司",
				role: "职位",
				year: "年份 (例如, 2020 - 至今)",
				responsibilities: "职责 (每项换一行)",
				cta: "添加工作经历",
			},
			education: {
				title: "教育背景",
				institution: "学校/机构",
				degree: "学位",
				year: "年份 / 日期",
				cta: "添加教育经历",
			},
			links: {
				title: "链接",
				name: "名称 (例如, 个人作品集)",
				url: "网址 (例如, https://www.yourwebsite.com)",
				cta: "添加链接",
			},
			hobbies: {
				title: "兴趣爱好",
				cta: "添加兴趣爱好",
			},
			certifications: {
				title: "证书",
				institution: "机构",
				name: "证书名称",
				year: "年份 / 日期",
				cta: "添加证书",
			},
			references: {
				title: "推荐人",
				name: "推荐人姓名",
				company_name: "公司名称",
				email_phone: "邮箱 / 电话号码",
				cta: "添加推荐人",
			},
			languages: {
				title: "语言",
				placeholder: "例如：西班牙语，葡萄牙语...",
				cta: "添加语言",
			},
			custom_section: {
				title: "自定义部分",
				header: "标题",
				subheader: "副标题",
				content: "内容",
				cta: "添加自定义部分",
			},
		},
		pages: {
			home: {
				title: "轻松创建您的专业简历",
				description: "使用我们的 AI 驱动简历生成器，在几分钟内创建出色的简历。",
				cta_builder: "开始创建",
				cta_templates: "浏览模板",
				features: {
					customization: "轻松自定义",
					customization_description: "使用可定制的部分和布局来调整您的简历。",
					ai_assistance: "AI 辅助",
					ai_assistance_description: "让 AI 帮助您撰写引人注目的专业摘要。",
					export_options: "多种导出选项",
					export_options_description: "以 PDF 或 Word 格式下载您的简历。",
				},
				testimonials: {
					testimonials_title: "我们的用户怎么说",
					testimonials_description:
						"看看我们的简历生成器如何帮助专业人士实现他们的职业目标。",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"这个简历生成器让我能够在几分钟内轻松创建一份专业简历！",
					testimonial_2_name: "David Lee",
					testimonial_2_text: "多亏了这个工具，我找到了理想的工作！强烈推荐。",
				},
				how_it_works: {
					title: "工作原理",
					description: "按照以下简单步骤创建完美的简历。",
					steps: [
						{
							title: "选择模板",
							description: "从各种专业简历模板中选择。",
						},
						{
							title: "填写您的详细信息",
							description: "输入您的信息，让我们的AI优化您的内容。",
						},
						{
							title: "下载并申请",
							description: "导出您的简历，自信地开始申请工作。",
						},
					],
				},
				faq: {
					title: "常见问题",
					questions: [
						{
							question: "简历生成器是免费的吗？",
							answer: "是的！您可以免费创建和下载您的简历。",
						},
						{
							question: "创建简历后我可以编辑它吗？",
							answer: "当然！在下载之前，您可以随时进行更改。",
						},
						{
							question: "我可以将简历导出为哪些文件格式？",
							answer: "您可以将简历导出为PDF和Word格式。",
						},
					],
				},
				final_cta: {
					title: "立即开始！",
					description: "几分钟内创建您的专业简历，找到您的梦想工作。",
					cta_text: "创建我的简历",
				},
			},
			templates: {
				choose_from_many: "从数百个模板中选择",
			},
			about: {
				title: "关于我们",
				subtitle: "我们正在利用人工智能彻底改变简历的制作方式。",
				mission: {
					title: "我们的使命",
					description:
						"我们的使命是为求职者提供工具，使简历制作变得轻松、高效和有力。我们利用人工智能帮助您在竞争激烈的就业市场中脱颖而出。",
				},
				values: [
					{
						icon: "FaLightbulb",
						title: "创新",
						description: "我们不断创新，提供最前沿的简历制作解决方案。",
					},
					{
						icon: "FaUsers",
						title: "以用户为中心",
						description: "我们的工具以用户体验为核心，确保流畅的使用体验。",
					},
					{
						icon: "FaHandshake",
						title: "诚信",
						description: "我们在所有事务中坚持透明和诚实的原则。",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "人工智能驱动",
						description:
							"我们的平台利用先进的人工智能技术，帮助您的简历在招聘者面前脱颖而出。",
					},
					{
						icon: "FaClock",
						title: "节省时间",
						description: "几分钟内即可创建专业简历，而非数小时。",
					},
					{
						icon: "FaUserCheck",
						title: "为您量身定制",
						description: "根据具体职位和行业定制您的简历。",
					},
				],
			},
		},
		template_names: {
			classic: "经典",
			classic_ats: "经典 ATS",
			elegant: "优雅",
			modern: "现代",
		},
	},
}
