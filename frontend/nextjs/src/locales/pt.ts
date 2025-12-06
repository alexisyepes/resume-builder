export default {
	greeting: "Olá mundo",
	resume_builder: {
		navigation: {
			about: "Sobre",
			services: "Serviços",
			pricing: "Preços",
			contact: "Contato",
			signin: "Entrar",
			dashboard: "Painel de Controle",
			logout: "Sair",
			home: "Início",
		},
		profile_modal: {
			title: "Perfil",
			tabs: {
				profile_info: "Informações do Perfil",
				plan_billing: "Plano e Cobrança",
			},
			profile: {
				current_plan: "Plano Atual",
				change_plan: "Mudar Plano",
				first_name: "Nome",
				last_name: "Sobrenome",
				email_address: "Endereço de Email",
				email_cannot_change: "Email não pode ser alterado",
				not_set: "Não definido",
				loading_error: "Não foi possível carregar dados do perfil",
				downloads_remaining: "Downloads restantes:",
				unlimited_downloads: "Downloads ilimitados",
				plan_features: "Recursos do Plano:",
				plan: "Plano",
			},
			billing: {
				current_plan_label: "Plano atual",
				available_plans: "Planos Disponíveis",
				month: "mês",
				free_plan: {
					name: "Grátis",
					description: "Para indivíduos",
					price: "$0",
					features: ["1 Download de Currículo", "3 Modelos", "Suporte Básico"],
				},
				basic_plan: {
					name: "Básico",
					description: "Para profissionais",
					price: "$9.99/mês",
					price_mo: "$9.99/mês",
					features: [
						"5 Downloads de Currículo",
						"10 Modelos",
						"Suporte Prioritário",
						"Sem Anúncios",
					],
				},
				premium_plan: {
					name: "Premium",
					description: "Para usuários avançados",
					price: "$19.99",
					price_mo: "$19.99/mês",
					features: [
						"Downloads Ilimitados",
						"Todos os Modelos",
						"Recursos de IA",
						"Exportar para DOCX",
						"Suporte Prioritário",
					],
				},
				enterprise_plan: {
					name: "Empresa",
					description: "Para equipes e empresas",
					price: "Personalizado",
					features: [
						"Tudo do Premium",
						"Colaboração em Equipe",
						"Modelos Personalizados",
						"Suporte Dedicado",
						"White Label",
					],
				},
				view_all_plans: "Ver comparação detalhada de todos os planos",
				downgrade: "Downgrade",
				upgrade_to_basic: "Upgrade para Básico",
				upgrade_to_premium: "Upgrade para Premium",
				current_plan_text: "Plano Atual",
			},
			buttons: {
				close: "Fechar",
				edit_profile: "Editar Perfil",
				cancel: "Cancelar",
				save_changes: "Salvar Alterações",
				saving: "Salvando...",
				view_all_plans: "Ver Todos os Planos",
			},
			alerts: {
				unsaved_changes: "Você tem alterações não salvas. Fechar mesmo assim?",
				save_success: "Alterações salvas com sucesso!",
				save_error: "Falha ao salvar alterações. Por favor, tente novamente.",
				unexpected_error:
					"Ocorreu um erro inesperado. Por favor, tente novamente.",
			},
			plan_names: {
				free: "Grátis",
				basic: "Básico",
				premium: "Premium",
				enterprise: "Empresa",
			},
		},
		labels: {
			general: {
				build_your_resume: "Construa seu currículo",
				edit: "Editar",
				layout: "Design",
				next: "Próximo",
				reset_all_inputs: "Redefinir todas as entradas",
				confirm_clear_inputs:
					"Tem certeza de que deseja redefinir todas as entradas? Você perderá todo o progresso feito.",
				add_more_sections: "Adicionar mais seções",
				template_selector: {
					selected_template: "Modelo Selecionado",
					download: "Baixar",
					write: "Escrever",
					choose_layout: "Escolher um layout",
					synch_content: "Sincronizar Conteúdo",
				},
			},
			personal_information: {
				title: "Informações Pessoais",
				upload_photo: "Enviar foto",
				choose_file: "Escolher arquivo",
				no_file_chosen: "Nenhum arquivo escolhido",
				remove_photo: "remover foto",
				add_photo: "adicionar foto",
				first_name: "nome",
				last_name: "sobrenome",
				job_title: "cargo",
				job_title_placeholder: "Gerente de projetos",
			},
			contact_information: {
				title: "Informações de Contato",
				email: "E-mail",
				phone: "Telefone",
				address: "Endereço",
				city_post_code: "Cidade, Estado/Província e Código Postal",
			},
			professional_summary: {
				title: "Resumo profissional",
				description:
					"Liste seu cargo profissional, anos de experiência e destaque suas conquistas mais notáveis. Nosso gerador de IA ajudará você a criá-lo.",
				cta_1: "Gerando...",
				cta_2: "Gerar com IA",
				counter: {
					time_left: "Tempo restante para regenerar o texto:",
					num_of_tries_left: "Número de gerações de IA restantes:",
				},
			},
			skills: {
				title: "Habilidades",
				add_skill: "Adicionar habilidade",
				add_skill_below: "Adicionar habilidade abaixo",
				placeholder: "Atenção aos detalhes...",
				info: "Selecione uma opção abaixo com base no seu cargo ou insira a sua acima.",
				cta_1: "Gerar",
				cta_2: "Regenerar",
				cta_3: "Sugestões",
			},
			employment_history: {
				title: "Histórico Profissional",
				title_2: "Comece com sua posição mais recente",
				company: "Empresa",
				role: "Cargo",
				year: "Ano (ex., 2020 - Presente)",
				responsibilities: "Responsabilidades (cada uma em uma nova linha)",
				cta: "Adicionar histórico profissional",
			},
			education: {
				title: "Educação",
				institution: "Instituição",
				degree: "Grau",
				year: "Ano / Data",
				cta: "Adicionar Educação",
			},
			links: {
				title: "Links",
				name: "Nome (ex., Portfólio)",
				url: "Url (ex., https://www.seusite.com)",
				cta: "Adicionar Link",
			},
			hobbies: {
				title: "Hobbies",
				cta: "Adicionar hobby",
			},
			certifications: {
				title: "Certificações",
				institution: "Instituição",
				name: "Nome da Certificação",
				year: "Ano / Data",
				cta: "Adicionar Certificação",
			},
			references: {
				title: "Referências",
				name: "Nome Completo da Referência",
				company_name: "Nome da Empresa",
				email_phone: "E-mail / Telefone",
				cta: "Adicionar Referência",
			},
			languages: {
				title: "Idiomas",
				placeholder: "Ex., Espanhol, Francês...",
				cta: "Adicionar Idioma",
			},
			custom_section: {
				title: "Seção Personalizada",
				header: "Cabeçalho",
				subheader: "Subtítulo",
				content: "Conteúdo",
				cta: "Adicionar Seção Personalizada",
			},
		},
		pages: {
			home: {
				title: "Crie seu currículo profissional facilmente",
				description:
					"Construa um currículo de destaque em minutos com nosso gerador de currículos com IA.",
				cta_builder: "Começar",
				cta_templates: "Explorar modelos",
				features: {
					customization: "Personalização fácil",
					customization_description:
						"Personalize seu currículo com seções e layouts editáveis.",
					ai_assistance: "Assistência com IA",
					ai_assistance_description:
						"Deixe a IA ajudar você a criar um resumo profissional convincente.",
					export_options: "Múltiplas opções de exportação",
					export_options_description:
						"Baixe seu currículo nos formatos PDF ou Word.",
				},
				testimonials: {
					testimonials_title: "O que nossos usuários dizem",
					testimonials_description:
						"Veja como nosso criador de currículos ajudou profissionais a alcançar seus objetivos de carreira.",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"Este criador de currículos tornou muito fácil criar um currículo profissional em minutos!",
					testimonial_2_name: "David Lee",
					testimonial_2_text:
						"Consegui o emprego dos meus sonhos graças a esta ferramenta! Altamente recomendado.",
				},
				how_it_works: {
					title: "Como Funciona",
					description:
						"Siga estes passos simples para criar seu currículo perfeito.",
					steps: [
						{
							title: "Escolha um Modelo",
							description:
								"Selecione entre uma variedade de modelos de currículos profissionais.",
						},
						{
							title: "Preencha Seus Dados",
							description:
								"Insira suas informações e deixe nossa IA aprimorar seu conteúdo.",
						},
						{
							title: "Baixe e Candidate-se",
							description:
								"Exporte seu currículo e comece a se candidatar com confiança.",
						},
					],
				},
				faq: {
					title: "Perguntas Frequentes",
					questions: [
						{
							question: "O gerador de currículos é gratuito?",
							answer:
								"Sim! Você pode criar e baixar seu currículo gratuitamente.",
						},
						{
							question: "Posso editar meu currículo depois de criá-lo?",
							answer:
								"Claro! Você pode fazer alterações a qualquer momento antes de baixá-lo.",
						},
						{
							question: "Em quais formatos posso exportar meu currículo?",
							answer: "Você pode exportá-lo em formatos PDF e Word.",
						},
					],
				},
				final_cta: {
					title: "Comece Agora!",
					description:
						"Crie seu currículo profissional em minutos e conquiste o emprego dos seus sonhos.",
					cta_text: "Criar Meu Currículo",
				},
				demo_animation: {
					generating_text: "...gerando seu currículo",
					cloud_sync: "Sincronização na Nuvem",
					ai_analysis: "Análise com IA",
					analytics: "Análises",
					default_first_name: "João",
					default_last_name: "Silva",
					default_job_title: "Gerente de Projetos",
				},
			},
			templates: {
				choose_from_many: "Escolha entre centenas de modelos",
			},
			about: {
				title: "Sobre Nós",
				subtitle:
					"Estamos revolucionando a forma como os currículos são criados com IA.",
				mission: {
					title: "Nossa Missão",
					description:
						"Nossa missão é capacitar os candidatos a emprego com ferramentas que tornam a criação de currículos fácil, eficiente e eficaz. Utilizamos IA para ajudá-lo a se destacar em um mercado de trabalho competitivo.",
				},
				our_values_title: "Nossos Valores",
				whyChooseUs_title: "Por Que Nos Escolher",
				values: [
					{
						icon: "FaLightbulb",
						title: "Inovação",
						description:
							"Estamos sempre inovando para oferecer soluções avançadas na criação de currículos.",
					},
					{
						icon: "FaUsers",
						title: "Foco no Usuário",
						description:
							"Nossas ferramentas são projetadas pensando no usuário, garantindo uma experiência intuitiva.",
					},
					{
						icon: "FaHandshake",
						title: "Integridade",
						description:
							"Acreditamos na transparência e na honestidade em tudo o que fazemos.",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "Impulsionado por IA",
						description:
							"Nossa plataforma usa IA avançada para criar currículos que chamam a atenção dos empregadores.",
					},
					{
						icon: "FaClock",
						title: "Economize Tempo",
						description:
							"Crie um currículo profissional em minutos, não em horas.",
					},
					{
						icon: "FaUserCheck",
						title: "Feito para Você",
						description:
							"Personalize seu currículo para funções e setores específicos.",
					},
				],
			},
			signin: {
				title: "Entrar",
				firstName: "Nome",
				lastName: "Sobrenome",
				email: "Email",
				password: "Senha",
				confirm_password: "Confirmar Senha",
				cta: "Entrar",
				no_account: "Ainda não tem uma conta",
				register: "Registrar",
				or: "ou",
				signup_with_google: "Cadastre-se com o Google",
				already_an_account: "Já tem uma conta",
				invalid_credentials: "Credenciais inválidas",
				account_exists: "Já existe uma conta associada ao seu email",
				cta_forgot_password: "Clique em esqueci a senha",
				try_again: "Por favor, tente novamente",
				forgot_password: "Esqueci a senha",
				errors: {
					validation: "Você deve inserir email e senha",
					passwords_no_match: "As senhas não coincidem",
					auth_failed: "Falha na autenticação. Por favor, tente novamente",
					google_auth_failed:
						"Falha no login do Google. Por favor, tente novamente",
					all_fields_required: "Todos os campos são obrigatórios",
					password_min_length: "A senha deve ter pelo menos 8 caracteres",
					email_exists: "O email já existe",
					invalid_credentials: "Email ou senha inválidos",
				},
			},
			services: {
				title: "Construa Sua Carreira dos Sonhos",
				subtitle:
					"Use a IA para criar o currículo perfeito e impulsione sua carreira.",
				services: [
					{
						icon: "FaFileAlt",
						title: "Construtor de Currículo com IA",
						description:
							"Crie currículos profissionais e compatíveis com ATS em minutos com nosso construtor de currículo baseado em IA.",
					},
					{
						icon: "FaEdit",
						title: "Personalização de Currículo",
						description:
							"Adapte seu currículo para funções e setores específicos com recomendações de especialistas.",
					},
					{
						icon: "FaChartLine",
						title: "Insights de Carreira",
						description:
							"Obtenha insights acionáveis para melhorar seu currículo e aumentar suas chances de conseguir entrevistas.",
					},
					{
						icon: "FaDownload",
						title: "Baixar e Aplicar",
						description:
							"Baixe seu currículo facilmente e comece a se candidatar aos empregos dos seus sonhos.",
					},
				],
				testimonials: [
					{
						quote:
							"Este construtor de currículo com IA me ajudou a conseguir meu emprego dos sonhos! Altamente recomendado.",
						author: "John Doe",
						role: "Engenheiro de Software",
					},
					{
						quote:
							"As opções de personalização são fantásticas. Meu currículo parece profissional e polido.",
						author: "Jane Smith",
						role: "Gerente de Marketing",
					},
				],
				pricing: [
					{
						title: "Básico",
						price: "Grátis",
						features: [
							"1 Currículo",
							"Modelos Básicos",
							"Personalização Limitada",
						],
						cta: "Começar",
					},
					{
						title: "Pro",
						price: "R$9,99/mês",
						features: [
							"Currículos Ilimitados",
							"Modelos Premium",
							"Personalização Avançada",
							"Insights de Carreira",
						],
						cta: "Assinar",
					},
				],
				get_started: "Começar de Graça",
				what_our_users_say: "O que nossos usuários dizem",
				create_resume_in_minutes:
					"Crie um currículo profissional em minutos com nossas ferramentas com IA.",
				pricing_plans: "Planos de Preços",
			},
			pricing: {
				title: "Escolha Seu Plano Perfeito",
				subtitle:
					"Seja você um candidato a emprego, profissional ou empresa, temos um plano que atende às suas necessidades.",
				billing: {
					monthly: "Mensal",
					yearly: "Anual",
					save_20: "Economize 20%",
					no_contract:
						"Sem contratos de longo prazo. Cancele a qualquer momento.",
				},
				plans: {
					most_popular: "Mais Popular",
					billed_annually_a: "Cobrado anualmente ($",
					billed_annually_b: "/mês)",
					custom_pricing: "Preço Personalizado",
					plans: [
						{
							name: "Grátis",
							description: "Perfeito para experimentar",
							features: [
								{ text: "1 Download de Currículo", included: true },
								{ text: "3 Modelos Profissionais", included: true },
								{ text: "Sugestões Básicas de IA", included: true },
								{ text: "Suporte por Email", included: true },
								{ text: "Downloads Ilimitados", included: false },
								{ text: "Todos os Modelos", included: false },
								{ text: "Recursos Avançados de IA", included: false },
								{ text: "Suporte Prioritário", included: false },
								{ text: "Sem Anúncios", included: false },
							],
							cta: "Começar de Graça",
						},
						{
							name: "Básico",
							description: "Para candidatos a emprego",
							features: [
								{ text: "5 Downloads de Currículo por mês", included: true },
								{ text: "10 Modelos Profissionais", included: true },
								{ text: "Sugestões Básicas de IA", included: true },
								{ text: "Suporte Prioritário por Email", included: true },
								{ text: "Sem Anúncios", included: true },
								{ text: "Downloads Ilimitados", included: false },
								{ text: "Todos os Modelos", included: false },
								{ text: "Recursos Avançados de IA", included: false },
								{ text: "Suporte por Telefone", included: false },
							],
							cta: "Escolher Básico",
						},
						{
							name: "Premium",
							description: "Para usuários avançados",
							features: [
								{ text: "Downloads de Currículo Ilimitados", included: true },
								{ text: "Todos os Modelos Profissionais", included: true },
								{ text: "Assistente de Redação IA Avançado", included: true },
								{
									text: "Suporte Prioritário por Telefone e Email",
									included: true,
								},
								{ text: "Sem Anúncios", included: true },
								{ text: "Exportar para PDF e DOCX", included: true },
								{ text: "Otimização ATS", included: true },
								{ text: "Análises de Currículo", included: true },
								{ text: "Marca Personalizada", included: false },
							],
							cta: "Escolher Premium",
						},
						{
							name: "Empresa",
							description: "Para equipes e empresas",
							features: [
								{ text: "Tudo do Premium", included: true },
								{ text: "Colaboração em Equipe", included: true },
								{ text: "Design de Modelos Personalizados", included: true },
								{ text: "Gerente de Conta Dedicado", included: true },
								{ text: "Solução White Label", included: true },
								{ text: "Acesso à API", included: true },
								{ text: "SSO e Segurança Avançada", included: true },
								{ text: "Fluxos de Trabalho Personalizados", included: true },
								{ text: "Treinamento e Integração", included: true },
							],
							cta: "Contatar Vendas",
						},
					],
				},
				comparison_table: {
					header: "Comparar Todos os Recursos",
					feature: "Recurso",
					plans: {
						free: "Grátis",
						basic: "Básico",
						premium: "Premium",
						enterprise: "Empresa",
					},
					featuresComparison: [
						{
							name: "Downloads de Currículo",
							free: "1",
							basic: "5/mês",
							premium: "Ilimitados",
							enterprise: "Ilimitados",
						},
						{
							name: "Modelos",
							free: "3",
							basic: "10",
							premium: "Todos",
							enterprise: "Personalizados + Todos",
						},
						{
							name: "Assistente de Redação IA",
							free: "Básico",
							basic: "Básico",
							premium: "Avançado",
							enterprise: "Avançado",
						},
						{
							name: "Formatos de Exportação",
							free: "PDF",
							basic: "PDF",
							premium: "PDF, DOCX",
							enterprise: "PDF, DOCX, HTML",
						},
						{
							name: "Suporte",
							free: "Email",
							basic: "Email Prioritário",
							premium: "Telefone e Email",
							enterprise: "Dedicado",
						},
						{
							name: "Colaboração em Equipe",
							free: "Não",
							basic: "Não",
							premium: "Não",
							enterprise: "Sim",
						},
						{
							name: "Marca Personalizada",
							free: "Não",
							basic: "Não",
							premium: "Não",
							enterprise: "Sim",
						},
						{
							name: "Acesso à API",
							free: "Não",
							basic: "Não",
							premium: "Não",
							enterprise: "Sim",
						},
					],
				},
				faq: {
					header: "Perguntas Frequentes",
					questions: [
						{
							question: "Posso mudar de plano a qualquer momento?",
							answer:
								"Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações têm efeito imediato.",
						},
						{
							question: "Há um teste gratuito?",
							answer:
								"O plano Grátis é sempre gratuito. Os planos pagos vêm com um teste gratuito de 14 dias.",
						},
						{
							question: "Quais métodos de pagamento são aceitos?",
							answer:
								"Aceitamos todos os principais cartões de crédito (Visa, MasterCard, American Express) e PayPal.",
						},
						{
							question: "Posso cancelar minha assinatura?",
							answer:
								"Sim, você pode cancelar a qualquer momento. Sem perguntas.",
						},
						{
							question:
								"Oferecem descontos para estudantes ou organizações sem fins lucrativos?",
							answer:
								"Sim! Entre em contato com nossa equipe de vendas para preços especiais.",
						},
					],
					cta_section: {
						title: "Pronto para elevar sua carreira?",
						subtitle:
							"Junte-se a milhares de profissionais que encontraram seu emprego dos sonhos com nosso criador de currículos.",
						start_free_trial: "Iniciar Teste Grátis",
						schedule_demo: "Agendar Demonstração",
					},
				},
			},
			contact: {
				title: "Contato",
				subtitle:
					"Tem perguntas? Estamos aqui para ajudar! Entre em contato e retornaremos o mais breve possível.",
				form: {
					title: "Envie-nos uma Mensagem",
					name_label: "Nome Completo",
					name_placeholder: "João Silva",
					email_label: "Endereço de Email",
					email_placeholder: "joao@exemplo.com",
					subject_label: "Assunto",
					subject_placeholder: "Como podemos ajudá-lo?",
					message_label: "Mensagem",
					message_placeholder: "Conte-nos mais sobre sua consulta...",
					submit_button: "Enviar Mensagem",
					sending: "Enviando...",
					success_message:
						"Obrigado pela sua mensagem! Entraremos em contato em breve.",
					error_message:
						"Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.",
				},
				info: {
					email_title: "Email",
					email: "support@resumebuilder.com",
					phone_title: "Telefone",
					phone: "+1 (555) 123-4567",
					address_title: "Endereço",
					address: "Rua do Currículo 123, Suite 100\nSan Francisco, CA 94107",
					hours_title: "Horário Comercial",
					hours:
						"Segunda - Sexta: 9:00 AM - 6:00 PM\nSábado: 10:00 AM - 2:00 PM",
				},
				location_title: "Nossa Localização",
				location_description:
					"Estamos localizados no coração de San Francisco. Visite-nos durante nosso horário comercial.",
				faq_title: "Perguntas Frequentes",
				faqs: [
					{
						question: "Como posso obter suporte técnico?",
						answer:
							"Para suporte técnico, envie um email para nossa equipe de suporte em support@resumebuilder.com ou use o formulário de contato acima.",
					},
					{
						question: "Vocês oferecem soluções empresariais?",
						answer:
							"Sim! Entre em contato com nossa equipe de vendas para soluções empresariais personalizadas e descontos por volume.",
					},
					{
						question: "Quanto tempo leva para receber uma resposta?",
						answer: "Normalmente respondemos dentro de 24 horas em dias úteis.",
					},
				],
				cta_title: "Pronto para Começar?",
				cta_subtitle:
					"Crie seu currículo profissional hoje e dê o próximo passo em sua carreira.",
				cta_button1: "Iniciar Teste Grátis",
				cta_button2: "Ver Planos de Preço",
			},
		},
		template_names: {
			classic: "Clássico",
			classic_ats: "Clássico ATS",
			elegant: "Elegante",
			modern: "Moderno",
			minimalist: "Minimalista",
			student: "Estudante",
		},
		footer: "2025 Construtor de Currículo IA. Todos os direitos reservados.",
		general: {
			software_on_large_screens:
				"Este software só pode ser usado em telas maiores (tablets, laptops, desktops). Por favor, mude para um dispositivo maior para usar o Construtor de Currículo",
			tab_selector: "Seletor de Abas",
			input_selector: "Seletor de Entrada",
			preview_selector: "Seletor de Visualização",
			instructional_message:
				"Selecione uma das abas acima para começar a criar seu currículo",
			organize_sections: "Organizar seções do currículo",
			fill_in_information: "Preencha suas informações",
			preview_your_resume: "Visualizar seu currículo",
		},
	},
}
