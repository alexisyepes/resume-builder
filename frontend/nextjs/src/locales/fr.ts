export default {
	greeting: "Bonjour le monde",
	resume_builder: {
		navigation: {
			about: "À propos",
			services: "Services",
			pricing: "Tarification",
			contact: "Contact",
			signin: "Se Connecter",
			dashboard: "Tableau de Bord",
			logout: "Déconnexion",
			home: "Accueil",
		},
		profile_modal: {
			title: "Profil",
			tabs: {
				profile_info: "Informations du Profil",
				plan_billing: "Plan et Facturation",
			},
			profile: {
				current_plan: "Plan Actuel",
				change_plan: "Changer de Plan",
				first_name: "Prénom",
				last_name: "Nom de Famille",
				email_address: "Adresse Email",
				email_cannot_change: "L'email ne peut pas être modifié",
				not_set: "Non défini",
				loading_error: "Impossible de charger les données du profil",
				downloads_remaining: "Téléchargements restants:",
				unlimited_downloads: "Téléchargements illimités",
				plan_features: "Fonctionnalités du Plan:",
				plan: "Plan",
			},
			billing: {
				current_plan_label: "Plan actuel",
				available_plans: "Plans Disponibles",
				month: "mois",
				free_plan: {
					name: "Gratuit",
					description: "Pour les particuliers",
					price: "$0",
					features: ["1 Téléchargement de CV", "3 Modèles", "Support de Base"],
				},
				basic_plan: {
					name: "Basique",
					description: "Pour les professionnels",
					price: "$9.99",
					price_mo: "$9.99/mo",
					features: [
						"5 Téléchargements de CV",
						"10 Modèles",
						"Support Prioritaire",
						"Sans Publicités",
					],
				},
				premium_plan: {
					name: "Premium",
					description: "Pour utilisateurs avancés",
					price: "$19.99",
					price_mo: "$19.99/mo",
					features: [
						"Téléchargements Illimités",
						"Tous les Modèles",
						"Fonctionnalités IA",
						"Export en DOCX",
						"Support Prioritaire",
					],
				},
				enterprise_plan: {
					name: "Entreprise",
					description: "Pour équipes et entreprises",
					price: "Personnalisé",
					features: [
						"Tout ce qui est dans Premium",
						"Collaboration d'Équipe",
						"Modèles Personnalisés",
						"Support Dédié",
						"White Label",
					],
				},
				view_all_plans: "Voir la comparaison détaillée de tous les plans",
				downgrade: "Rétrograder",
				upgrade_to_basic: "Passer à Basique",
				upgrade_to_premium: "Passer à Premium",
				current_plan_text: "Plan Actuel",
			},
			buttons: {
				close: "Fermer",
				edit_profile: "Modifier le Profil",
				cancel: "Annuler",
				save_changes: "Enregistrer les Modifications",
				saving: "Enregistrement en cours...",
				view_all_plans: "Voir Tous les Plans",
			},
			alerts: {
				unsaved_changes:
					"Vous avez des modifications non enregistrées. Fermer quand même ?",
				save_success: "Modifications enregistrées avec succès !",
				save_error:
					"Échec de l'enregistrement des modifications. Veuillez réessayer.",
				unexpected_error:
					"Une erreur inattendue s'est produite. Veuillez réessayer.",
			},
			plan_names: {
				free: "Gratuit",
				basic: "Basique",
				premium: "Premium",
				enterprise: "Entreprise",
			},
		},
		labels: {
			general: {
				build_your_resume: "Créez votre CV",
				edit: "Éditer",
				layout: "Disposition",
				next: "Suivant",
				reset_all_inputs: "Réinitialiser toutes les entrées",
				confirm_clear_inputs:
					"Êtes-vous sûr de vouloir réinitialiser toutes vos entrées ? Vous perdrez toute progression effectuée.",
				add_more_sections: "Ajouter plus de sections",
				template_selector: {
					selected_template: "Modèle sélectionné",
					download: "Télécharger",
					write: "Écrire",
					choose_layout: "Choisir une mise en page",
					synch_content: "Synchroniser le Contenu",
				},
			},
			personal_information: {
				title: "Informations personnelles",
				upload_photo: "Télécharger une photo",
				choose_file: "Choisir un fichier",
				no_file_chosen: "Aucun fichier choisi",
				remove_photo: "supprimer la photo",
				add_photo: "ajouter une photo",
				first_name: "prénom",
				last_name: "nom de famille",
				job_title: "intitulé du poste",
				job_title_placeholder: "Chef de projet",
			},
			contact_information: {
				title: "Informations de contact",
				email: "E-mail",
				phone: "Téléphone",
				address: "Adresse",
				city_post_code: "Ville, État/Province et Code Postal",
			},
			professional_summary: {
				title: "Résumé professionnel",
				description:
					"Indiquez votre titre professionnel, vos années d'expérience et mettez en avant vos réalisations les plus remarquables, et notre générateur IA vous aidera à le créer.",
				cta_1: "Génération en cours...",
				cta_2: "Générer avec l'IA",
				counter: {
					time_left: "Temps restant pour régénérer le texte :",
					num_of_tries_left: "Nombre de générations IA restantes :",
				},
			},
			skills: {
				title: "Compétences",
				add_skill: "Ajouter une compétence",
				add_skill_below: "Ajouter une compétence ci-dessous",
				placeholder: "Sens du détail...",
				info: "Sélectionnez une option ci-dessous en fonction de votre poste, ou saisissez la vôtre ci-dessus.",
				cta_1: "Générer",
				cta_2: "Régénérer",
				cta_3: "Suggestions",
			},
			employment_history: {
				title: "Expérience Professionnelle",
				title_2: "Commencez par votre poste le plus récent",
				company: "Entreprise",
				role: "Rôle",
				year: "Année (ex., 2020 - Présent)",
				responsibilities: "Responsabilités (chacune sur une nouvelle ligne)",
				cta: "Ajouter une expérience",
			},
			education: {
				title: "Éducation",
				institution: "Établissement",
				degree: "Diplôme",
				year: "Année / Date",
				cta: "Ajouter une formation",
			},
			links: {
				title: "Liens",
				name: "Nom (ex., Portfolio)",
				url: "Url (ex., https://www.votresite.com)",
				cta: "Ajouter un lien",
			},
			hobbies: {
				title: "Loisirs",
				cta: "Ajouter un loisir",
			},
			certifications: {
				title: "Certifications",
				institution: "Établissement",
				name: "Nom de la certification",
				year: "Année / Date",
				cta: "Ajouter une certification",
			},
			references: {
				title: "Références",
				name: "Nom complet de la référence",
				company_name: "Nom de l'entreprise",
				email_phone: "E-mail / Téléphone",
				cta: "Ajouter une référence",
			},
			languages: {
				title: "Langues",
				placeholder: "Ex., Espagnol, Portugais...",
				cta: "Ajouter une langue",
			},
			custom_section: {
				title: "Section Personnalisée",
				header: "En-tête",
				subheader: "Sous-titre",
				content: "Contenu",
				cta: "Ajouter une section personnalisée",
			},
		},
		pages: {
			home: {
				title: "Créez votre CV professionnel facilement",
				description:
					"Créez un CV percutant en quelques minutes avec notre générateur de CV alimenté par l'IA.",
				cta_builder: "Commencer",
				cta_templates: "Parcourir les modèles",
				features: {
					customization: "Personnalisation facile",
					customization_description:
						"Personnalisez votre CV avec des sections et des mises en page modifiables.",
					ai_assistance: "Assistance IA",
					ai_assistance_description:
						"Laissez l'IA vous aider à rédiger un résumé professionnel convaincant.",
					export_options: "Options d'exportation multiples",
					export_options_description:
						"Téléchargez votre CV en formats PDF ou Word.",
				},
				testimonials: {
					testimonials_title: "Ce que disent nos utilisateurs",
					testimonials_description:
						"Découvrez comment notre créateur de CV a aidé des professionnels à atteindre leurs objectifs de carrière.",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"Ce créateur de CV m'a permis de créer un CV professionnel en quelques minutes !",
					testimonial_2_name: "David Lee",
					testimonial_2_text:
						"J'ai décroché le job de mes rêves grâce à cet outil ! Hautement recommandé.",
				},
				how_it_works: {
					title: "Comment Ça Marche",
					description: "Suivez ces étapes simples pour créer votre CV parfait.",
					steps: [
						{
							title: "Choisissez un Modèle",
							description:
								"Sélectionnez parmi une variété de modèles professionnels.",
						},
						{
							title: "Remplissez Vos Détails",
							description:
								"Entrez vos informations et laissez notre IA améliorer votre contenu.",
						},
						{
							title: "Téléchargez et Postulez",
							description:
								"Exportez votre CV et commencez à postuler en toute confiance.",
						},
					],
				},
				faq: {
					title: "Questions Fréquemment Posées",
					questions: [
						{
							question: "Le générateur de CV est-il gratuit ?",
							answer:
								"Oui ! Vous pouvez créer et télécharger votre CV gratuitement.",
						},
						{
							question: "Puis-je modifier mon CV après l'avoir créé ?",
							answer:
								"Bien sûr ! Vous pouvez apporter des modifications à tout moment avant de le télécharger.",
						},
						{
							question: "Dans quels formats puis-je exporter mon CV ?",
							answer: "Vous pouvez l'exporter aux formats PDF et Word.",
						},
					],
				},
				final_cta: {
					title: "Commencez Aujourd'hui !",
					description:
						"Créez votre CV professionnel en quelques minutes et obtenez l'emploi de vos rêves.",
					cta_text: "Créer Mon CV",
				},
				demo_animation: {
					generating_text: "...génération de votre CV",
					cloud_sync: "Synchronisation Cloud",
					ai_analysis: "Analyse IA",
					analytics: "Analytiques",
					default_first_name: "Jean",
					default_last_name: "Dupont",
					default_job_title: "Chef de Projet",
				},
			},
			templates: {
				choose_from_many: "Choisissez parmi des centaines de modèles",
			},
			about: {
				title: "À Propos de Nous",
				subtitle: "Nous révolutionnons la création de CV grâce à l'IA.",
				mission: {
					title: "Notre Mission",
					description:
						"Notre mission est d'autonomiser les chercheurs d'emploi en leur fournissant des outils qui rendent la création de CV simple, efficace et performante. Nous utilisons l'IA pour vous aider à vous démarquer sur un marché du travail compétitif.",
				},
				our_values_title: "Nos Valeurs",
				whyChooseUs_title: "Pourquoi Nous Choisir",
				values: [
					{
						icon: "FaLightbulb",
						title: "Innovation",
						description:
							"Nous innovons constamment pour offrir des solutions de pointe pour la création de CV.",
					},
					{
						icon: "FaUsers",
						title: "Axé sur l'Utilisateur",
						description:
							"Nos outils sont conçus en tenant compte des besoins des utilisateurs pour garantir une expérience fluide.",
					},
					{
						icon: "FaHandshake",
						title: "Intégrité",
						description:
							"Nous croyons en la transparence et l'honnêteté dans tout ce que nous faisons.",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "Propulsé par l'IA",
						description:
							"Notre plateforme utilise une IA avancée pour créer des CV qui attirent l'attention des employeurs.",
					},
					{
						icon: "FaClock",
						title: "Gagnez du Temps",
						description:
							"Créez un CV professionnel en quelques minutes, pas en heures.",
					},
					{
						icon: "FaUserCheck",
						title: "Adapté pour Vous",
						description:
							"Personnalisez votre CV en fonction des postes et des industries ciblés.",
					},
				],
			},
			signin: {
				title: "Connexion",
				firstName: "Prénom",
				lastName: "Nom de Famille",
				email: "Email",
				password: "Mot de passe",
				confirm_password: "Confirmer le mot de passe",
				cta: "Se connecter",
				no_account: "Vous n'avez pas encore de compte",
				register: "S'inscrire",
				or: "ou",
				signup_with_google: "S'inscrire avec Google",
				already_an_account: "Vous avez déjà un compte",
				invalid_credentials: "Identifiants invalides",
				account_exists: "Un compte est déjà associé à votre email",
				cta_forgot_password: "Cliquez sur mot de passe oublié",
				try_again: "Veuillez réessayer",
				forgot_password: "Mot de passe oublié",
				errors: {
					validation: "Vous devez saisir l'email et le mot de passe",
					passwords_no_match: "Les mots de passe ne correspondent pas",
					auth_failed: "Échec de l'authentification. Veuillez réessayer",
					google_auth_failed:
						"Échec de la connexion Google. Veuillez réessayer",
					all_fields_required: "Tous les champs sont obligatoires",
					password_min_length:
						"Le mot de passe doit contenir au moins 8 caractères",
					email_exists: "L'email existe déjà",
					invalid_credentials: "Email ou mot de passe invalide",
				},
			},
			services: {
				title: "Construisez Votre Carrière de Rêve",
				subtitle:
					"Utilisez l'IA pour créer le CV parfait et booster votre carrière.",
				services: [
					{
						icon: "FaFileAlt",
						title: "Créateur de CV Alimenté par l'IA",
						description:
							"Créez des CV professionnels et compatibles ATS en quelques minutes avec notre créateur de CV piloté par l'IA.",
					},
					{
						icon: "FaEdit",
						title: "Personnalisation de CV",
						description:
							"Adaptez votre CV à des postes et secteurs spécifiques avec des recommandations d'experts.",
					},
					{
						icon: "FaChartLine",
						title: "Informations sur la Carrière",
						description:
							"Obtenez des insights actionnables pour améliorer votre CV et augmenter vos chances d'obtenir des entretiens.",
					},
					{
						icon: "FaDownload",
						title: "Télécharger et Postuler",
						description:
							"Téléchargez facilement votre CV et commencez à postuler à vos emplois de rêve.",
					},
				],
				testimonials: [
					{
						quote:
							"Ce créateur de CV IA m'a aidé à décrocher mon emploi de rêve ! Vivement recommandé.",
						author: "John Doe",
						role: "Ingénieur Logiciel",
					},
					{
						quote:
							"Les options de personnalisation sont fantastiques. Mon CV a l'air professionnel et soigné.",
						author: "Jane Smith",
						role: "Responsable Marketing",
					},
				],
				pricing: [
					{
						title: "Basique",
						price: "Gratuit",
						features: ["1 CV", "Modèles de base", "Personnalisation Limitée"],
						cta: "Commencer",
					},
					{
						title: "Pro",
						price: "9,99 $/mois",
						features: [
							"CV Illimités",
							"Modèles Premium",
							"Personnalisation Avancée",
							"Informations sur la Carrière",
						],
						cta: "S'abonner",
					},
				],
				get_started: "Commencer Gratuitement",
				what_our_users_say: "Ce que disent nos utilisateurs",
				create_resume_in_minutes:
					"Créez un CV professionnel en quelques minutes avec nos outils alimentés par l'IA.",
				pricing_plans: "Forfaits Tarifaires",
			},
			pricing: {
				title: "Choisissez Votre Plan Parfait",
				subtitle:
					"Que vous soyez chercheur d'emploi, professionnel ou entreprise, nous avons un plan qui correspond à vos besoins.",
				billing: {
					monthly: "Mensuel",
					yearly: "Annuel",
					save_20: "Économisez 20%",
					no_contract: "Pas de contrat à long terme. Annulez à tout moment.",
				},
				plans: {
					most_popular: "Le Plus Populaire",
					billed_annually_a: "Facturé annuellement ($",
					billed_annually_b: "/mois)",
					custom_pricing: "Tarification Personnalisée",
					plans: [
						{
							name: "Gratuit",
							description: "Parfait pour essayer",
							features: [
								{ text: "1 Téléchargement de CV", included: true },
								{ text: "3 Modèles Professionnels", included: true },
								{ text: "Suggestions IA de Base", included: true },
								{ text: "Support Email", included: true },
								{ text: "Téléchargements Illimités", included: false },
								{ text: "Tous les Modèles", included: false },
								{ text: "Fonctionnalités IA Avancées", included: false },
								{ text: "Support Prioritaire", included: false },
								{ text: "Sans Publicités", included: false },
							],
							cta: "Commencer Gratuitement",
						},
						{
							name: "Basique",
							description: "Pour chercheurs d'emploi",
							features: [
								{ text: "5 Téléchargements de CV par mois", included: true },
								{ text: "10 Modèles Professionnels", included: true },
								{ text: "Suggestions IA de Base", included: true },
								{ text: "Support Email Prioritaire", included: true },
								{ text: "Sans Publicités", included: true },
								{ text: "Téléchargements Illimités", included: false },
								{ text: "Tous les Modèles", included: false },
								{ text: "Fonctionnalités IA Avancées", included: false },
								{ text: "Support Téléphonique", included: false },
							],
							cta: "Choisir Basique",
						},
						{
							name: "Premium",
							description: "Pour utilisateurs avancés",
							features: [
								{ text: "Téléchargements de CV Illimités", included: true },
								{ text: "Tous les Modèles Professionnels", included: true },
								{ text: "Assistant d'Écriture IA Avancé", included: true },
								{
									text: "Support Prioritaire Téléphonique et Email",
									included: true,
								},
								{ text: "Sans Publicités", included: true },
								{ text: "Export en PDF et DOCX", included: true },
								{ text: "Optimisation ATS", included: true },
								{ text: "Analyses de CV", included: true },
								{ text: "Marque Personnalisée", included: false },
							],
							cta: "Choisir Premium",
						},
						{
							name: "Entreprise",
							description: "Pour équipes et entreprises",
							features: [
								{ text: "Tout ce qui est dans Premium", included: true },
								{ text: "Collaboration d'Équipe", included: true },
								{ text: "Conception de Modèles Personnalisés", included: true },
								{ text: "Gestionnaire de Compte Dédié", included: true },
								{ text: "Solution White Label", included: true },
								{ text: "Accès API", included: true },
								{ text: "SSO et Sécurité Avancée", included: true },
								{ text: "Flux de Travail Personnalisés", included: true },
								{ text: "Formation et Intégration", included: true },
							],
							cta: "Contacter les Ventes",
						},
					],
				},
				comparison_table: {
					header: "Comparer Toutes les Fonctionnalités",
					feature: "Fonctionnalité",
					plans: {
						free: "Gratuit",
						basic: "Basique",
						premium: "Premium",
						enterprise: "Entreprise",
					},
					featuresComparison: [
						{
							name: "Téléchargements de CV",
							free: "1",
							basic: "5/mois",
							premium: "Illimités",
							enterprise: "Illimités",
						},
						{
							name: "Modèles",
							free: "3",
							basic: "10",
							premium: "Tous",
							enterprise: "Personnalisés + Tous",
						},
						{
							name: "Assistant d'Écriture IA",
							free: "Basique",
							basic: "Basique",
							premium: "Avancé",
							enterprise: "Avancé",
						},
						{
							name: "Formats d'Export",
							free: "PDF",
							basic: "PDF",
							premium: "PDF, DOCX",
							enterprise: "PDF, DOCX, HTML",
						},
						{
							name: "Support",
							free: "Email",
							basic: "Email Prioritaire",
							premium: "Téléphone et Email",
							enterprise: "Dédié",
						},
						{
							name: "Collaboration d'Équipe",
							free: "Non",
							basic: "Non",
							premium: "Non",
							enterprise: "Oui",
						},
						{
							name: "Marque Personnalisée",
							free: "Non",
							basic: "Non",
							premium: "Non",
							enterprise: "Oui",
						},
						{
							name: "Accès API",
							free: "Non",
							basic: "Non",
							premium: "Non",
							enterprise: "Oui",
						},
					],
				},
				faq: {
					header: "Questions Fréquemment Posées",
					questions: [
						{
							question: "Puis-je changer de plan à tout moment ?",
							answer:
								"Oui, vous pouvez mettre à niveau ou rétrograder votre plan à tout moment. Les changements prennent effet immédiatement.",
						},
						{
							question: "Y a-t-il un essai gratuit ?",
							answer:
								"Le plan Gratuit est toujours gratuit. Les plans payants offrent un essai gratuit de 14 jours.",
						},
						{
							question: "Quels modes de paiement acceptez-vous ?",
							answer:
								"Nous acceptons toutes les cartes de crédit majeures (Visa, MasterCard, American Express) et PayPal.",
						},
						{
							question: "Puis-je annuler mon abonnement ?",
							answer: "Oui, vous pouvez annuler à tout moment. Sans questions.",
						},
						{
							question:
								"Offrez-vous des réductions pour les étudiants ou les organisations à but non lucratif ?",
							answer:
								"Oui ! Contactez notre équipe commerciale pour des tarifs spéciaux.",
						},
					],
					cta_section: {
						title: "Prêt à faire décoller votre carrière ?",
						subtitle:
							"Rejoignez des milliers de professionnels qui ont trouvé leur emploi de rêve avec notre créateur de CV.",
						start_free_trial: "Commencer l'Essai Gratuit",
						schedule_demo: "Programmer une Démo",
					},
				},
			},
			contact: {
				title: "Contactez-nous",
				subtitle:
					"Des questions ? Nous sommes là pour vous aider ! Contactez-nous et nous vous répondrons dès que possible.",
				form: {
					title: "Envoyez-nous un Message",
					name_label: "Nom Complet",
					name_placeholder: "Jean Dupont",
					email_label: "Adresse Email",
					email_placeholder: "jean@exemple.com",
					subject_label: "Sujet",
					subject_placeholder: "Comment pouvons-nous vous aider ?",
					message_label: "Message",
					message_placeholder: "Dites-nous-en plus sur votre demande...",
					submit_button: "Envoyer le Message",
					sending: "Envoi en cours...",
					success_message:
						"Merci pour votre message ! Nous vous répondrons bientôt.",
					error_message:
						"Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
				},
				info: {
					email_title: "Email",
					email: "support@resbuilder.com",
					phone_title: "Téléphone",
					phone: "+1 (555) 123-4567",
					address_title: "Adresse",
					address: "Rue du CV 123, Suite 100\nToronto, CA 94107",
					hours_title: "Heures d'Ouverture",
					hours:
						"Lundi - Vendredi: 9:00 AM - 6:00 PM\nSamedi: 10:00 AM - 2:00 PM",
				},
				location_title: "Notre Localisation",
				location_description:
					"Nous sommes situés au cœur de Toronto. Rendez-nous visite pendant nos heures d'ouverture.",
				faq_title: "Questions Fréquemment Posées",
				faqs: [
					{
						question: "Comment puis-je obtenir un support technique ?",
						answer:
							"Pour le support technique, envoyez un email à notre équipe de support à support@resbuilder.com ou utilisez le formulaire de contact ci-dessus.",
					},
					{
						question: "Proposez-vous des solutions d'entreprise ?",
						answer:
							"Oui ! Contactez notre équipe commerciale pour des solutions d'entreprise personnalisées et des remises sur volume.",
					},
					{
						question: "Combien de temps faut-il pour recevoir une réponse ?",
						answer:
							"Nous répondons généralement dans les 24 heures les jours ouvrables.",
					},
				],
				cta_title: "Prêt à Commencer ?",
				cta_subtitle:
					"Créez votre CV professionnel aujourd'hui et passez à l'étape suivante de votre carrière.",
				cta_button1: "Commencer l'Essai Gratuit",
				cta_button2: "Voir les Tarifs",
			},
		},
		template_names: {
			classic: "Classique",
			classic_ats: "Classique ATS",
			elegant: "Élégant",
			modern: "Moderne",
			minimalist: "Minimaliste",
			student: "Étudiant",
		},
		footer: "2025 Créateur de CV IA. Tous droits réservés.",
		general: {
			software_on_large_screens:
				"Ce logiciel ne peut être utilisé que sur des écrans plus grands (tablettes, ordinateurs portables, ordinateurs de bureau). Veuillez passer à un appareil plus grand pour utiliser le Créateur de CV",
			tab_selector: "Sélecteur d'Onglets",
			input_selector: "Sélecteur de Saisie",
			preview_selector: "Sélecteur d'Aperçu",
			instructional_message:
				"Sélectionnez l'un des onglets ci-dessus pour commencer à créer votre CV",
			organize_sections: "Organiser les sections du CV",
			fill_in_information: "Remplissez vos informations",
			preview_your_resume: "Aperçu de votre CV",
		},
	},
}
