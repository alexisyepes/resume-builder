import { FiBriefcase, FiGlobe, FiStar, FiZap } from "react-icons/fi"

export default {
	greeting: "Hola mundo",
	resume_builder: {
		navigation: {
			about: "Acerca de",
			services: "Servicios",
			pricing: "Precios",
			contact: "Contacto",
			signin: "Iniciar Sesión",
			dashboard: "Panel de Control",
			logout: "Cerrar Sesión",
			home: "Inicio",
		},
		profile_modal: {
			title: "Perfil",
			tabs: {
				profile_info: "Información del Perfil",
				plan_billing: "Plan y Facturación",
			},
			profile: {
				current_plan: "Plan Actual",
				change_plan: "Cambiar Plan",
				first_name: "Nombre",
				last_name: "Apellido",
				email_address: "Correo Electrónico",
				email_cannot_change: "El correo no se puede cambiar",
				not_set: "No establecido",
				loading_error: "No se puede cargar la información del perfil",
				downloads_remaining: "Descargas restantes:",
				unlimited_downloads: "Descargas ilimitadas",
				plan_features: "Características del Plan:",
				plan: "Plan",
			},
			billing: {
				current_plan_label: "Plan actual",
				available_plans: "Planes Disponibles",
				month: "mes",
				free_plan: {
					name: "Gratis",
					description: "Para individuos",
					price: "$0",
					features: [
						"1 Descarga de Currículum",
						"3 Plantillas",
						"Soporte Básico",
					],
				},
				basic_plan: {
					name: "Básico",
					description: "Para profesionales",
					price: "$4.99",
					price_mo: "$4.99/mes",
					features: [
						"5 Descargas de Currículum",
						"10 Plantillas",
						"Soporte Prioritario",
						"Sin Anuncios",
					],
				},
				premium_plan: {
					name: "Premium",
					description: "Para usuarios avanzados",
					price: "$4.99",
					price_mo: "$4.99/mes",
					features: [
						"Descargas Ilimitadas",
						"Todas las Plantillas",
						"Funciones de IA",
						"Exportar a DOCX",
						"Soporte Prioritario",
					],
				},
				enterprise_plan: {
					name: "Empresa",
					description: "Para equipos y compañías",
					price: "Personalizado",
					features: [
						"Todo lo de Premium",
						"Colaboración en Equipo",
						"Plantillas Personalizadas",
						"Soporte Dedicado",
						"White Label",
					],
				},
				view_all_plans: "Ver comparación detallada de todos los planes",
				downgrade: "Degradar",
				upgrade_to_basic: "Mejorar a Básico",
				upgrade_to_premium: "Mejorar a Premium",
				current_plan_text: "Plan Actual",
			},
			buttons: {
				close: "Cerrar",
				edit_profile: "Editar Perfil",
				cancel: "Cancelar",
				save_changes: "Guardar Cambios",
				saving: "Guardando...",
				view_all_plans: "Ver Todos los Planes",
			},
			alerts: {
				unsaved_changes: "Tienes cambios sin guardar. ¿Cerrar de todos modos?",
				save_success: "¡Cambios guardados exitosamente!",
				save_error: "Error al guardar cambios. Por favor, inténtalo de nuevo.",
				unexpected_error:
					"Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
			},
			plan_names: {
				free: "Gratis",
				basic: "Básico",
				premium: "Premium",
				enterprise: "Empresa",
			},
		},

		labels: {
			general: {
				build_your_resume: "Crea tu currículum",
				edit: "Editar",
				layout: "Diseño",
				next: "Siguiente",
				reset_all_inputs: "Restablecer todas las entradas",
				confirm_clear_inputs:
					"¿Estás seguro de que quieres restablecer todas tus entradas? Perderás cualquier progreso realizado.",
				add_more_sections: "Añadir más secciones",
				template_selector: {
					selected_template: "Plantilla seleccionada",
					download: "Descargar",
					write: "Escribir",
					choose_layout: "Elegir un diseño",
					synch_content: "Sincronizar Contenido",
				},
			},
			personal_information: {
				title: "Información Personal",
				upload_photo: "Cargar foto",
				choose_file: "Escoger archivo",
				no_file_chosen: "Ningún archivo seleccionado",
				remove_photo: "Remover foto",
				add_photo: "Añadir foto",
				first_name: "Nombre",
				last_name: "Apellidos",
				job_title: "Título / Profesión",
				job_title_placeholder: "Director de proyecto",
			},
			contact_information: {
				title: "Información de contacto",
				email: "Email",
				phone: "Teléfono",
				address: "Dirección",
				city_post_code: "Ciudad, Estado/Provincia y Código postal",
			},
			professional_summary: {
				title: "Resumen profesional",
				description:
					"Escribe tu título profesional, años de experiencia y destaca tus logros más notables, y nuestro generador de IA te ayudará a crearlo.",
				cta_1: "Generando...",
				cta_2: "Generar con IA",
				counter: {
					time_left: "Tiempo restante para regenerar el texto:",
					num_of_tries_left: "Número de generaciones de IA restantes:",
				},
			},
			skills: {
				title: "Habilidades",
				add_skill: "Agregar habilidad",
				add_skill_below: "Agregar habilidad abajo",
				placeholder: "Atención al detalle...",
				info: "Selecciona una opción a continuación según tu puesto de trabajo, o ingresa la tuya arriba.",
				cta_1: "Generar",
				cta_2: "Regenerar",
				cta_3: "Sugerencias",
			},
			employment_history: {
				title: "Historial Laboral",
				title_2: "Comienza con tu puesto más reciente",
				company: "Empresa",
				role: "Cargo",
				year: "Año (ej., 2020 - Presente)",
				responsibilities: "Responsabilidades (cada una en una nueva línea)",
				cta: "Agregar historial laboral",
			},
			education: {
				title: "Educación",
				institution: "Institución",
				degree: "Título",
				year: "Año / Fecha",
				cta: "Agregar Educación",
			},
			links: {
				title: "Enlaces",
				name: "Nombre (ej., Portafolio)",
				url: "Url (ej., https://www.tusitio.com)",
				cta: "Agregar Enlace",
			},
			hobbies: {
				title: "Pasatiempos",
				cta: "Agregar pasatiempo",
			},
			certifications: {
				title: "Certificaciones",
				institution: "Institución",
				name: "Nombre de la certificación",
				year: "Año / Fecha",
				cta: "Agregar Certificación",
			},
			references: {
				title: "Referencias",
				name: "Nombre completo de referencia",
				company_name: "Nombre de la empresa",
				email_phone: "Correo / Teléfono",
				cta: "Agregar Referencia",
			},
			languages: {
				title: "Idiomas",
				placeholder: "Ej., Español, Portugués...",
				cta: "Agregar Idioma",
			},
			custom_section: {
				title: "Sección Personalizada",
				header: "Encabezado",
				subheader: "Subtítulo",
				content: "Contenido",
				cta: "Agregar Sección Personalizada",
			},
		},
		pages: {
			home: {
				title: "Crea tu currículum profesional fácilmente",
				description:
					"Construye un currículum destacado en minutos con nuestro generador impulsado por IA.",
				cta_builder: "Comenzar",
				cta_templates: "Explorar plantillas",
				features: {
					customization: "Personalización fácil",
					customization_description:
						"Adapta tu currículum con secciones y diseños personalizables.",
					ai_assistance: "Asistencia con IA",
					ai_assistance_description:
						"Deja que la IA te ayude a redactar un resumen profesional convincente.",
					export_options: "Múltiples opciones de exportación",
					export_options_description:
						"Descarga tu currículum en formatos PDF o Word.",
				},
				testimonials: {
					testimonials_title: "Lo que dicen nuestros usuarios",
					testimonials_description:
						"Descubre cómo nuestro creador de currículums ha ayudado a los profesionales a alcanzar sus objetivos profesionales.",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"¡Este creador de currículums hizo que fuera muy fácil crear un currículum profesional en minutos!",
					testimonial_2_name: "David Lee",
					testimonial_2_text:
						"¡Conseguí el trabajo de mis sueños gracias a esta herramienta! Muy recomendado.",
				},
				how_it_works: {
					title: "Cómo Funciona",
					description:
						"Sigue estos simples pasos para crear tu currículum perfecto.",
					steps: [
						{
							title: "Elige una Plantilla",
							description:
								"Selecciona entre una variedad de plantillas profesionales.",
						},
						{
							title: "Completa Tus Datos",
							description:
								"Ingresa tu información y deja que nuestra IA mejore tu contenido.",
						},
						{
							title: "Descarga y Aplica",
							description:
								"Exporta tu currículum y comienza a postularte con confianza.",
						},
					],
				},
				faq: {
					title: "Preguntas Frecuentes",
					questions: [
						{
							question: "¿El generador de currículum es gratuito?",
							answer: "¡Sí! Puedes crear y descargar tu currículum gratis.",
						},
						{
							question: "¿Puedo editar mi currículum después de crearlo?",
							answer:
								"¡Por supuesto! Puedes hacer cambios en cualquier momento antes de descargarlo.",
						},
						{
							question: "¿En qué formatos puedo exportar mi currículum?",
							answer: "Puedes exportarlo en formatos PDF y Word.",
						},
					],
				},
				final_cta: {
					title: "¡Empieza Hoy!",
					description:
						"Crea tu currículum profesional en minutos y consigue el trabajo de tus sueños.",
					cta_text: "Construir Mi Currículum",
				},
				demo_animation: {
					generating_text: "...generando tu currículum",
					cloud_sync: "Sincronización en la Nube",
					ai_analysis: "Análisis con IA",
					analytics: "Analíticas",
					default_first_name: "Juan",
					default_last_name: "Pérez",
					default_job_title: "Gerente de Proyectos",
				},
			},
			templates: {
				choose_from_many: "Elige entre cientos de plantillas",
			},
			about: {
				title: "Sobre Nosotros",
				subtitle:
					"Estamos revolucionando la forma en que se crean los currículums con IA.",
				mission: {
					title: "Nuestra Misión",
					description:
						"Nuestra misión es empoderar a los buscadores de empleo con herramientas que hacen que la creación de currículums sea sencilla, eficiente y efectiva. Utilizamos IA para ayudarte a destacar en un mercado laboral competitivo.",
				},
				our_values_title: "Nuestros Valores",
				whyChooseUs_title: "Por Qué Elegirnos",
				values: [
					{
						icon: "FaLightbulb",
						title: "Innovación",
						description:
							"Innovamos constantemente para ofrecer soluciones de vanguardia en la creación de currículums.",
					},
					{
						icon: "FaUsers",
						title: "Centrado en el Usuario",
						description:
							"Nuestras herramientas están diseñadas pensando en el usuario, garantizando una experiencia fluida.",
					},
					{
						icon: "FaHandshake",
						title: "Integridad",
						description:
							"Creemos en la transparencia y la honestidad en todo lo que hacemos.",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "Impulsado por IA",
						description:
							"Nuestra plataforma utiliza IA avanzada para crear currículums que llamen la atención de los empleadores.",
					},
					{
						icon: "FaClock",
						title: "Ahorra Tiempo",
						description:
							"Crea un currículum profesional en minutos, no en horas.",
					},
					{
						icon: "FaUserCheck",
						title: "Hecho para Ti",
						description:
							"Personaliza tu currículum para roles específicos y sectores industriales.",
					},
				],
			},
			signin: {
				title: "Iniciar sesión",
				firstName: "Nombre",
				lastName: "Apellido",
				email: "Correo electrónico",
				password: "Contraseña",
				confirm_password: "Confirmar contraseña",
				cta: "Iniciar sesión",
				no_account: "¿No tienes una cuenta?",
				register: "Registrarse",
				or: "o",
				signup_with_google: "Regístrate con Google",
				already_an_account: "¿Ya tienes una cuenta?",
				invalid_credentials: "Credenciales inválidas",
				account_exists: "Ya existe una cuenta asociada a tu correo electrónico",
				cta_forgot_password: "Haz clic en olvidar contraseña",
				try_again: "Por favor, inténtalo de nuevo",
				forgot_password: "Olvidé mi contraseña",
				errors: {
					validation: "Debes ingresar correo electrónico y contraseña",
					passwords_no_match: "Las contraseñas no coinciden",
					auth_failed: "Error de autenticación. Por favor, intenta de nuevo",
					google_auth_failed:
						"Error al iniciar sesión con Google. Por favor, intenta de nuevo",
					all_fields_required: "Todos los campos son obligatorios",
					password_min_length: "La contraseña debe tener al menos 8 caracteres",
					email_exists: "El correo electrónico ya existe",
					invalid_credentials: "Correo electrónico o contraseña inválidos",
				},
			},
			services: {
				title: "Construye Tu Carrera Soñada",
				subtitle:
					"Aprovecha la IA para crear el currículum perfecto e impulsa tu carrera.",
				services: [
					{
						icon: "FaFileAlt",
						title: "Creador de Currículums con IA",
						description:
							"Crea currículums profesionales y compatibles con ATS en minutos con nuestro creador de currículums impulsado por IA.",
					},
					{
						icon: "FaEdit",
						title: "Personalización de Currículum",
						description:
							"Adapta tu currículum para roles específicos e industrias con recomendaciones de expertos.",
					},
					{
						icon: "FaChartLine",
						title: "Información de Carrera",
						description:
							"Obtén información práctica para mejorar tu currículum y aumentar tus posibilidades de conseguir entrevistas.",
					},
					{
						icon: "FaDownload",
						title: "Descargar y Aplicar",
						description:
							"Descarga tu currículum fácilmente y comienza a aplicar a tus trabajos soñados.",
					},
				],
				testimonials: [
					{
						quote:
							"¡Este creador de currículums con IA me ayudó a conseguir mi trabajo soñado! Muy recomendado.",
						author: "John Doe",
						role: "Ingeniero de Software",
					},
					{
						quote:
							"Las opciones de personalización son fantásticas. Mi currículum se ve profesional y pulido.",
						author: "Jane Smith",
						role: "Gerente de Marketing",
					},
				],
				pricing: [
					{
						title: "Básico",
						price: "Gratis",
						features: [
							"1 Currículum",
							"Plantillas Básicas",
							"Personalización Limitada",
						],
						cta: "Comenzar",
					},
					{
						title: "Pro",
						price: "$4.99/mes",
						features: [
							"Currículums Ilimitados",
							"Plantillas Premium",
							"Personalización Avanzada",
							"Información de Carrera",
						],
						cta: "Suscribirse",
					},
				],
				get_started: "Comenzar Gratis",
				what_our_users_say: "Lo que dicen nuestros usuarios",
				create_resume_in_minutes:
					"Crea un currículum profesional en minutos con nuestras herramientas con IA.",
				pricing_plans: "Planes de Precios",
			},
			pricing: {
				title: "Elige Tu Plan Perfecto",
				subtitle:
					"Ya seas un buscador de empleo, profesional o empresa, tenemos un plan que se adapta a tus necesidades.",
				billing: {
					monthly: "Mensual",
					yearly: "Anual",
					save_20: "Ahorra 20%",
					no_contract:
						"Sin contratos a largo plazo. Cancela en cualquier momento.",
					next_billing: "Próxima Facturación",
					plan_expires_on: "El plan expira el",
				},
				plans: {
					most_popular: "Más Popular",
					billed_annually_a: "Facturado anualmente ($",
					billed_annually_b: "/mes)",
					custom_pricing: "Precio Personalizado",
					plans: [
						{
							name: "Gratis",
							description: "Perfecto para probar",
							icon: FiZap,
							features: [
								{ text: "1 Descarga de Currículum", included: true },
								{ text: "3 Plantillas Profesionales", included: true },
								{ text: "Sugerencias Básicas de IA", included: true },
								{ text: "Soporte por Email", included: true },
								{ text: "Descargas Ilimitadas", included: false },
								{ text: "Todas las Plantillas", included: false },
								{ text: "Funciones Avanzadas de IA", included: false },
								{ text: "Soporte Prioritario", included: false },
								{ text: "Sin Anuncios", included: false },
							],
							cta: "Empieza Gratis",
						},
						{
							name: "Básico",
							icon: FiBriefcase,
							description: "Para buscadores de empleo",
							features: [
								{ text: "10 Descargas de Currículum por mes", included: true },
								{ text: "10 Plantillas Profesionales", included: true },
								{ text: "Sugerencias Básicas de IA", included: true },
								{ text: "Soporte Prioritario por Email", included: true },
								{ text: "Sin Anuncios", included: true },
								{ text: "Descargas Ilimitadas", included: false },
								{ text: "Todas las Plantillas", included: false },
								{ text: "Funciones Avanzadas de IA", included: false },
								{ text: "Soporte Telefónico", included: false },
							],
							cta: "Elegir Básico",
						},
						{
							name: "Premium",
							description: "Para usuarios avanzados",
							icon: FiStar,
							features: [
								{ text: "Descargas Ilimitadas de Currículum", included: true },
								{ text: "Todas las Plantillas Profesionales", included: true },
								{ text: "Asistente de Escritura IA Avanzado", included: true },
								{
									text: "Soporte Prioritario Telefónico y por Email",
									included: true,
								},
								{ text: "Sin Anuncios", included: true },
								{ text: "Exportar a PDF y DOCX", included: true },
								{ text: "Optimización ATS", included: true },
								{ text: "Analíticas de Currículum", included: true },
								{ text: "Marca Personalizada", included: false },
							],
							cta: "Elegir Premium",
						},
						{
							name: "Empresa",
							description: "Para equipos y compañías",
							icon: FiGlobe,
							features: [
								{ text: "Todo lo de Premium", included: true },
								{ text: "Colaboración en Equipo", included: true },
								{ text: "Diseño de Plantillas Personalizadas", included: true },
								{ text: "Gerente de Cuenta Dedicado", included: true },
								{ text: "Solución White Label", included: true },
								{ text: "Acceso a API", included: true },
								{ text: "SSO y Seguridad Avanzada", included: true },
								{ text: "Flujos de Trabajo Personalizados", included: true },
								{ text: "Capacitación y Onboarding", included: true },
							],
							cta: "Contactar Ventas",
						},
					],
				},
				comparison_table: {
					header: "Comparar Todas las Características",
					feature: "Característica",
					plans: {
						free: "Gratis",
						basic: "Básico",
						premium: "Premium",
						enterprise: "Empresa",
					},
					featuresComparison: [
						{
							name: "Descargas de Currículum",
							free: "1",
							basic: "5/mes",
							premium: "Ilimitadas",
							enterprise: "Ilimitadas",
						},
						{
							name: "Plantillas",
							free: "3",
							basic: "10",
							premium: "Todas",
							enterprise: "Personalizadas + Todas",
						},
						{
							name: "Asistente de Escritura IA",
							free: "Básico",
							basic: "Básico",
							premium: "Avanzado",
							enterprise: "Avanzado",
						},
						{
							name: "Formatos de Exportación",
							free: "PDF",
							basic: "PDF",
							premium: "PDF, DOCX",
							enterprise: "PDF, DOCX, HTML",
						},
						{
							name: "Soporte",
							free: "Email",
							basic: "Email Prioritario",
							premium: "Teléfono y Email",
							enterprise: "Dedicado",
						},
						{
							name: "Colaboración en Equipo",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Sí",
						},
						{
							name: "Marca Personalizada",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Sí",
						},
						{
							name: "Acceso a API",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Sí",
						},
					],
				},
				faq: {
					header: "Preguntas Frecuentes",
					questions: [
						{
							question: "¿Puedo cambiar de plan en cualquier momento?",
							answer:
								"Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios tienen efecto inmediato.",
						},
						{
							question: "¿Hay una prueba gratuita?",
							answer:
								"El plan Gratis siempre es gratuito. Los planes de pago vienen con una prueba gratuita de 14 días.",
						},
						{
							question: "¿Qué métodos de pago aceptan?",
							answer:
								"Aceptamos todas las tarjetas de crédito principales (Visa, MasterCard, American Express) y PayPal.",
						},
						{
							question: "¿Puedo cancelar mi suscripción?",
							answer:
								"Sí, puedes cancelar en cualquier momento. Sin preguntas.",
						},
						{
							question:
								"¿Ofrecen descuentos para estudiantes o organizaciones sin fines de lucro?",
							answer:
								"¡Sí! Contacta a nuestro equipo de ventas para precios especiales.",
						},
					],
					cta_section: {
						title: "¿Listo para elevar tu carrera?",
						subtitle:
							"Únete a miles de profesionales que encontraron su trabajo soñado con nuestro creador de currículums.",
						start_free_trial: "Iniciar Prueba Gratuita",
						schedule_demo: "Programar una Demostración",
					},
				},
			},
			contact: {
				title: "Contacto",
				subtitle:
					"¿Tienes preguntas? ¡Estamos aquí para ayudarte! Contáctanos y te responderemos lo antes posible.",
				form: {
					title: "Envíanos un Mensaje",
					name_label: "Nombre Completo",
					name_placeholder: "Juan Pérez",
					email_label: "Correo Electrónico",
					email_placeholder: "juan@ejemplo.com",
					subject_label: "Asunto",
					subject_placeholder: "¿Cómo podemos ayudarte?",
					message_label: "Mensaje",
					message_placeholder: "Cuéntanos más sobre tu consulta...",
					submit_button: "Enviar Mensaje",
					sending: "Enviando...",
					success_message: "¡Gracias por tu mensaje! Te responderemos pronto.",
					error_message:
						"Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
				},
				info: {
					email_title: "Correo",
					email: "soporte@resumebuilder.com",
					phone_title: "Teléfono",
					phone: "+1 (555) 123-4567",
					address_title: "Dirección",
					address: "Calle Resumé 123, Suite 100\nToronto, CA 94107",
					hours_title: "Horario",
					hours:
						"Lunes - Viernes: 9:00 AM - 6:00 PM\nSábado: 10:00 AM - 2:00 PM",
				},
				location_title: "Nuestra Ubicación",
				location_description:
					"Estamos ubicados en el corazón de Toronto. Visítanos durante nuestro horario de atención.",
				faq_title: "Preguntas Frecuentes",
				faqs: [
					{
						question: "¿Cómo puedo obtener soporte técnico?",
						answer:
							"Para soporte técnico, envía un correo a nuestro equipo de soporte en soporte@resumebuilder.com o usa el formulario de contacto de arriba.",
					},
					{
						question: "¿Ofrecen soluciones empresariales?",
						answer:
							"¡Sí! Contacta a nuestro equipo de ventas para soluciones empresariales personalizadas y descuentos por volumen.",
					},
					{
						question: "¿Cuánto tiempo toma recibir una respuesta?",
						answer:
							"Normalmente respondemos dentro de 24 horas en días hábiles.",
					},
				],
				cta_title: "¿Listo para Comenzar?",
				cta_subtitle:
					"Crea tu currículum profesional hoy y da el siguiente paso en tu carrera profesional.",
				cta_button1: "Comenzar Prueba Gratuita",
				cta_button2: "Ver Planes de Precios",
			},
		},
		template_names: {
			classic: "Clásico",
			classic_ats: "Clásico-ATS",
			elegant: "Elegante",
			modern: "Moderno",
			minimalist: "Minimalista",
			student: "Estudiante",
		},
		footer: "2025 Creador de Currículums IA. Todos los derechos reservados.",
		general: {
			software_on_large_screens:
				"Este software solo puede usarse en pantallas más grandes (tabletas, laptops, computadoras de escritorio). Por favor, cambia a un dispositivo más grande para usar el Creador de Currículums",
			tab_selector: "Selector de Pestañas",
			input_selector: "Selector de Entrada",
			preview_selector: "Selector de Vista Previa",
			instructional_message:
				"Selecciona una de las pestañas de arriba para comenzar a crear tu currículum",
			organize_sections: "Organizar secciones del currículum",
			fill_in_information: "Completa tu información",
			preview_your_resume: "Vista previa de tu currículum",
		},
	},
}
