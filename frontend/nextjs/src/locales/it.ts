export default {
	greeting: "Ciao mondo",
	resume_builder: {
		navigation: {
			about: "Chi siamo",
			services: "Servizi",
			pricing: "Prezzi",
			contact: "Contatto",
			signin: "Accedi",
			dashboard: "Cruscotto",
			logout: "Disconnetti",
			home: "Home",
		},
		profile_modal: {
			title: "Profilo",
			tabs: {
				profile_info: "Informazioni del Profilo",
				plan_billing: "Piano e Fatturazione",
			},
			profile: {
				current_plan: "Piano Attuale",
				change_plan: "Cambia Piano",
				first_name: "Nome",
				last_name: "Cognome",
				email_address: "Indirizzo Email",
				email_cannot_change: "L'email non può essere modificata",
				not_set: "Non impostato",
				loading_error: "Impossibile caricare i dati del profilo",
				downloads_remaining: "Download rimanenti:",
				unlimited_downloads: "Download illimitati",
				plan_features: "Caratteristiche del Piano:",
				plan: "Piano",
			},
			billing: {
				current_plan_label: "Piano attuale",
				cancel_subscription: "Annulla Abbonamento",
				available_plans: "Piani Disponibili",
				month: "mese",
				free_plan: {
					name: "Gratuito",
					description: "Per individui",
					price: "$0",
					features: ["1 Download Curriculum", "3 Modelli", "Supporto Base"],
				},
				basic_plan: {
					name: "Base",
					description: "Per professionisti",
					price: "$4.99",
					price_mo: "$4.99/mese",
					features: [
						"5 Download Curriculum",
						"10 Modelli",
						"Supporto Prioritario",
						"Senza Pubblicità",
					],
				},
				premium_plan: {
					name: "Premium",
					description: "Per utenti avanzati",
					price: "$4.99",
					price_mo: "$4.99/mese",
					features: [
						"Download Illimitati",
						"Tutti i Modelli",
						"Funzionalità IA",
						"Esporta in DOCX",
						"Supporto Prioritario",
					],
				},
				enterprise_plan: {
					name: "Azienda",
					description: "Per team e aziende",
					price: "Personalizzato",
					features: [
						"Tutto quanto incluso in Premium",
						"Collaborazione di Team",
						"Modelli Personalizzati",
						"Supporto Dedicato",
						"White Label",
					],
				},
				view_all_plans: "Vedi confronto dettagliato di tutti i piani",
				downgrade: "Degrada",
				upgrade_to_basic: "Passa a Base",
				upgrade_to_premium: "Passa a Premium",
				current_plan_text: "Piano Attuale",
			},
			buttons: {
				close: "Chiudi",
				edit_profile: "Modifica Profilo",
				cancel: "Annulla",
				save_changes: "Salva Modifiche",
				saving: "Salvataggio in corso...",
				view_all_plans: "Vedi Tutti i Piani",
			},
			alerts: {
				unsaved_changes: "Hai modifiche non salvate. Chiudere comunque?",
				save_success: "Modifiche salvate con successo!",
				save_error: "Impossibile salvare le modifiche. Riprova.",
				unexpected_error: "Si è verificato un errore imprevisto. Riprova.",
			},
			plan_names: {
				free: "Gratuito",
				basic: "Base",
				premium: "Premium",
				enterprise: "Azienda",
			},
		},
		labels: {
			general: {
				build_your_resume: "Crea il tuo curriculum",
				edit: "Modifica",
				layout: "Design",
				next: "Prossimo",
				reset_all_inputs: "Reimposta tutti i campi",
				confirm_clear_inputs:
					"Sei sicuro di voler reimpostare tutti i campi? Perderai tutti i progressi effettuati.",
				add_more_sections: "Aggiungi altre sezioni",
				template_selector: {
					selected_template: "Modello selezionato",
					download: "Scaricare",
					write: "Scrivi",
					choose_layout: "Scegli un layout",
					synch_content: "Sincronizza Contenuto",
				},
			},
			personal_information: {
				title: "Informazioni personali",
				upload_photo: "Carica foto",
				choose_file: "Scegli file",
				no_file_chosen: "Nessun file scelto",
				remove_photo: "rimuovi foto",
				add_photo: "aggiungi foto",
				first_name: "nome",
				last_name: "cognome",
				job_title: "titolo professionale",
				job_title_placeholder: "Project manager",
			},
			contact_information: {
				title: "Informazioni di contatto",
				email: "E-mail",
				phone: "Telefono",
				address: "Indirizzo",
				city_post_code: "Città, Stato/Provincia e CAP",
			},
			professional_summary: {
				title: "Riassunto professionale",
				description:
					"Elenca il tuo titolo professionale, anni di esperienza e metti in evidenza i tuoi risultati più importanti. Il nostro generatore IA ti aiuterà a crearlo.",
				cta_1: "Generazione in corso...",
				cta_2: "Genera con l'IA",
				counter: {
					time_left: "Tempo rimanente per rigenerare il testo:",
					num_of_tries_left: "Numero di generazioni AI rimaste:",
				},
			},
			skills: {
				title: "Competenze",
				add_skill: "Aggiungi competenza",
				add_skill_below: "Aggiungi competenza sotto",
				placeholder: "Attenzione ai dettagli...",
				info: "Seleziona un'opzione in base al tuo titolo professionale oppure inserisci la tua sopra.",
				cta_1: "Genera",
				cta_2: "Rigenera",
				cta_3: "Suggerimenti",
			},
			employment_history: {
				title: "Esperienza Lavorativa",
				title_2: "Inizia dalla tua posizione più recente",
				company: "Azienda",
				role: "Ruolo",
				year: "Anno (es., 2020 - Presente)",
				responsibilities: "Responsabilità (una per riga)",
				cta: "Aggiungi esperienza lavorativa",
			},
			education: {
				title: "Istruzione",
				institution: "Istituto",
				degree: "Titolo di studio",
				year: "Anno / Data",
				cta: "Aggiungi istruzione",
			},
			links: {
				title: "Link",
				name: "Nome (es., Portfolio)",
				url: "Url (es., https://www.tuosito.com)",
				cta: "Aggiungi link",
			},
			hobbies: {
				title: "Hobby",
				cta: "Aggiungi hobby",
			},
			certifications: {
				title: "Certificazioni",
				institution: "Istituto",
				name: "Nome certificazione",
				year: "Anno / Data",
				cta: "Aggiungi certificazione",
			},
			references: {
				title: "Referenze",
				name: "Nome completo della referenza",
				company_name: "Nome azienda",
				email_phone: "Email / Telefono",
				cta: "Aggiungi referenza",
			},
			languages: {
				title: "Lingue",
				placeholder: "Es., Spagnolo, Portoghese...",
				cta: "Aggiungi lingua",
			},
			custom_section: {
				title: "Sezione Personalizzata",
				header: "Intestazione",
				subheader: "Sottotitolo",
				content: "Contenuto",
				cta: "Aggiungi sezione personalizzata",
			},
		},
		pages: {
			home: {
				title: "Crea il tuo curriculum professionale facilmente",
				description:
					"Crea un curriculum di grande impatto in pochi minuti con il nostro generatore basato su IA.",
				cta_builder: "Inizia ora",
				cta_templates: "Sfoglia i modelli",
				features: {
					customization: "Personalizzazione facile",
					customization_description:
						"Personalizza il tuo curriculum con sezioni e layout modificabili.",
					ai_assistance: "Assistenza IA",
					ai_assistance_description:
						"Lascia che l'IA ti aiuti a creare un riassunto professionale efficace.",
					export_options: "Opzioni di esportazione multiple",
					export_options_description:
						"Scarica il tuo curriculum nei formati PDF o Word.",
				},
				testimonials: {
					testimonials_title: "Cosa dicono i nostri utenti",
					testimonials_description:
						"Scopri come il nostro creatore di curriculum ha aiutato i professionisti a raggiungere i loro obiettivi di carriera.",
					testimonial_1_name: "Sarah Johnson",
					testimonial_1_text:
						"Questo creatore di curriculum mi ha permesso di creare un CV professionale in pochi minuti!",
					testimonial_2_name: "David Lee",
					testimonial_2_text:
						"Ho ottenuto il lavoro dei miei sogni grazie a questo strumento! Altamente raccomandato.",
				},
				how_it_works: {
					title: "Come Funziona",
					description:
						"Segui questi semplici passaggi per creare il tuo curriculum perfetto.",
					steps: [
						{
							title: "Scegli un Modello",
							description:
								"Seleziona tra una varietà di modelli di curriculum professionali.",
						},
						{
							title: "Compila i Tuoi Dati",
							description:
								"Inserisci le tue informazioni e lascia che la nostra IA migliori il tuo contenuto.",
						},
						{
							title: "Scarica e Candidati",
							description:
								"Esporta il tuo curriculum e inizia a candidarti con fiducia.",
						},
					],
				},
				faq: {
					title: "Domande Frequenti",
					questions: [
						{
							question: "Il generatore di curriculum è gratuito?",
							answer:
								"Sì! Puoi creare e scaricare il tuo curriculum gratuitamente.",
						},
						{
							question:
								"Posso modificare il mio curriculum dopo averlo creato?",
							answer:
								"Certo! Puoi modificarlo in qualsiasi momento prima di scaricarlo.",
						},
						{
							question: "In quali formati posso esportare il mio curriculum?",
							answer: "Puoi esportarlo in formato PDF e Word.",
						},
					],
				},
				final_cta: {
					title: "Inizia Subito!",
					description:
						"Crea il tuo curriculum professionale in pochi minuti e trova il lavoro dei tuoi sogni.",
					cta_text: "Crea il Mio Curriculum",
				},
				demo_animation: {
					generating_text: "...generazione del tuo curriculum",
					cloud_sync: "Sincronizzazione Cloud",
					ai_analysis: "Analisi IA",
					analytics: "Analitiche",
					default_first_name: "Marco",
					default_last_name: "Rossi",
					default_job_title: "Project Manager",
				},
			},
			templates: {
				choose_from_many: "Scegli tra centinaia di modelli",
			},
			about: {
				title: "Chi Siamo",
				subtitle:
					"Stiamo rivoluzionando il modo in cui vengono creati i curriculum con l'IA.",
				mission: {
					title: "La Nostra Missione",
					description:
						"La nostra missione è fornire ai candidati strumenti che rendano la creazione del curriculum semplice, efficiente ed efficace. Sfruttiamo l'IA per aiutarti a distinguerti in un mercato del lavoro competitivo.",
				},
				our_values_title: "I Nostri Valori",
				whyChooseUs_title: "Perché Sceglierci",
				values: [
					{
						icon: "FaLightbulb",
						title: "Innovazione",
						description:
							"Innoviamo costantemente per offrire soluzioni all'avanguardia per la creazione di curriculum.",
					},
					{
						icon: "FaUsers",
						title: "Centrato sull'Utente",
						description:
							"I nostri strumenti sono progettati pensando all'utente, garantendo un'esperienza fluida.",
					},
					{
						icon: "FaHandshake",
						title: "Integrità",
						description:
							"Crediamo nella trasparenza e nell'onestà in tutto ciò che facciamo.",
					},
				],
				whyChooseUs: [
					{
						icon: "FaRocket",
						title: "Basato sull'IA",
						description:
							"La nostra piattaforma utilizza un'IA avanzata per creare curriculum che attirano l'attenzione dei datori di lavoro.",
					},
					{
						icon: "FaClock",
						title: "Risparmia Tempo",
						description:
							"Crea un curriculum professionale in pochi minuti, non ore.",
					},
					{
						icon: "FaUserCheck",
						title: "Personalizzato per Te",
						description:
							"Personalizza il tuo curriculum per ruoli e settori specifici.",
					},
				],
			},
			signin: {
				title: "Accedi",
				firstName: "Nome",
				lastName: "Cognome",
				email: "Email",
				password: "Password",
				confirm_password: "Conferma Password",
				cta: "Accedi",
				no_account: "Non hai ancora un account",
				register: "Registrati",
				or: "o",
				signup_with_google: "Registrati con Google",
				already_an_account: "Hai già un account",
				invalid_credentials: "Credenziali non valide",
				account_exists: "Esiste già un account associato alla tua email",
				cta_forgot_password: "Clicca su password dimenticata",
				try_again: "Per favore riprova",
				forgot_password: "Password dimenticata",
				errors: {
					validation: "Devi inserire email e password",
					passwords_no_match: "Le password non corrispondono",
					auth_failed: "Autenticazione fallita. Riprova",
					google_auth_failed: "Accesso Google fallito. Riprova",
					all_fields_required: "Tutti i campi sono obbligatori",
					password_min_length: "La password deve essere di almeno 8 caratteri",
					email_exists: "L'email esiste già",
					invalid_credentials: "Email o password non validi",
				},
			},
			services: {
				title: "Costruisci la Tua Carriera dei Sogni",
				subtitle:
					"Sfrutta l'IA per creare il curriculum perfetto e far decollare la tua carriera.",
				services: [
					{
						icon: "FaFileAlt",
						title: "Creatore di Curriculum con IA",
						description:
							"Crea curriculum professionali e compatibili con i sistemi ATS in pochi minuti con il nostro creatore di curriculum basato sull'IA.",
					},
					{
						icon: "FaEdit",
						title: "Personalizzazione del Curriculum",
						description:
							"Personalizza il tuo curriculum per ruoli lavorativi e settori specifici con i consigli di esperti.",
					},
					{
						icon: "FaChartLine",
						title: "Informazioni sulla Carriera",
						description:
							"Ottieni approfondimenti pratici per migliorare il tuo curriculum e aumentare le tue possibilità di ottenere colloqui.",
					},
					{
						icon: "FaDownload",
						title: "Scarica e Candidati",
						description:
							"Scarica facilmente il tuo curriculum e inizia a candidarti per i lavori dei tuoi sogni.",
					},
				],
				testimonials: [
					{
						quote:
							"Questo creatore di curriculum con IA mi ha aiutato a ottenere il lavoro dei miei sogni! Altamente raccomandato.",
						author: "John Doe",
						role: "Ingegnere del Software",
					},
					{
						quote:
							"Le opzioni di personalizzazione sono fantastiche. Il mio curriculum appare professionale e rifinito.",
						author: "Jane Smith",
						role: "Responsabile Marketing",
					},
				],
				pricing: [
					{
						title: "Base",
						price: "Gratuito",
						features: [
							"1 Curriculum",
							"Modelli Base",
							"Personalizzazione Limitata",
						],
						cta: "Inizia",
					},
					{
						title: "Pro",
						price: "9,99 $/mese",
						features: [
							"Curriculum Illimitati",
							"Modelli Premium",
							"Personalizzazione Avanzata",
							"Informazioni sulla Carriera",
						],
						cta: "Abbonati",
					},
				],
				get_started: "Inizia Gratuitamente",
				what_our_users_say: "Cosa dicono i nostri utenti",
				create_resume_in_minutes:
					"Crea un curriculum professionale in pochi minuti con i nostri strumenti basati sull'IA.",
				pricing_plans: "Piani di Prezzo",
			},
			pricing: {
				title: "Scegli Il Tuo Piano Perfetto",
				subtitle:
					"Che tu sia un cercatore di lavoro, professionista o azienda, abbiamo un piano adatto alle tue esigenze.",
				billing: {
					monthly: "Mensile",
					yearly: "Annuale",
					save_20: "Risparmia il 20%",
					no_contract:
						"Nessun contratto a lungo termine. Cancella in qualsiasi momento.",
					next_billing: "Prossima Fatturazione",
					plan_expires_on: "Il piano scade il",
				},
				plans: {
					most_popular: "Più Popolare",
					current_plan: "Piano Attuale",
					billed_annually_a: "Fatturazione annuale ($",
					billed_annually_b: "/mese)",
					custom_pricing: "Prezzo Personalizzato",
					plans: [
						{
							name: "Gratuito",
							description: "Perfetto per provare",
							features: [
								{ text: "1 Download Curriculum", included: true },
								{ text: "3 Modelli Professionali", included: true },
								{ text: "Suggerimenti IA Base", included: true },
								{ text: "Supporto Email", included: true },
								{ text: "Download Illimitati", included: false },
								{ text: "Tutti i Modelli", included: false },
								{ text: "Funzionalità IA Avanzate", included: false },
								{ text: "Supporto Prioritario", included: false },
								{ text: "Senza Pubblicità", included: false },
							],
							cta: "Inizia Gratuitamente",
						},
						{
							name: "Base",
							description: "Per cercatori di lavoro",
							features: [
								{ text: "10 Download Curriculum al mese", included: true },
								{ text: "10 Modelli Professionali", included: true },
								{ text: "Suggerimenti IA Base", included: true },
								{ text: "Supporto Email Prioritario", included: true },
								{ text: "Senza Pubblicità", included: true },
								{ text: "Download Illimitati", included: false },
								{ text: "Tutti i Modelli", included: false },
								{ text: "Funzionalità IA Avanzate", included: false },
								{ text: "Supporto Telefonico", included: false },
							],
							cta: "Scegli Base",
						},
						{
							name: "Premium",
							description: "Per utenti avanzati",
							features: [
								{ text: "Download Curriculum Illimitati", included: true },
								{ text: "Tutti i Modelli Professionali", included: true },
								{ text: "Assistente Scrittura IA Avanzato", included: true },
								{
									text: "Supporto Prioritario Telefonico e Email",
									included: true,
								},
								{ text: "Senza Pubblicità", included: true },
								{ text: "Esporta in PDF e DOCX", included: true },
								{ text: "Ottimizzazione ATS", included: true },
								{ text: "Analisi Curriculum", included: true },
								{ text: "Brand Personalizzato", included: false },
							],
							cta: "Scegli Premium",
						},
						{
							name: "Azienda",
							description: "Per team e aziende",
							features: [
								{ text: "Tutto quanto incluso in Premium", included: true },
								{ text: "Collaborazione di Team", included: true },
								{
									text: "Progettazione Modelli Personalizzati",
									included: true,
								},
								{ text: "Account Manager Dedicato", included: true },
								{ text: "Soluzione White Label", included: true },
								{ text: "Accesso API", included: true },
								{ text: "SSO e Sicurezza Avanzata", included: true },
								{ text: "Flussi di Lavoro Personalizzati", included: true },
								{ text: "Formazione e Onboarding", included: true },
							],
							cta: "Contatta Vendite",
						},
					],
				},
				comparison_table: {
					header: "Confronta Tutte le Funzionalità",
					feature: "Funzionalità",
					plans: {
						free: "Gratuito",
						basic: "Base",
						premium: "Premium",
						enterprise: "Azienda",
					},
					featuresComparison: [
						{
							name: "Download Curriculum",
							free: "1",
							basic: "5/mese",
							premium: "Illimitati",
							enterprise: "Illimitati",
						},
						{
							name: "Modelli",
							free: "3",
							basic: "10",
							premium: "Tutti",
							enterprise: "Personalizzati + Tutti",
						},
						{
							name: "Assistente Scrittura IA",
							free: "Base",
							basic: "Base",
							premium: "Avanzato",
							enterprise: "Avanzato",
						},
						{
							name: "Formati Esportazione",
							free: "PDF",
							basic: "PDF",
							premium: "PDF, DOCX",
							enterprise: "PDF, DOCX, HTML",
						},
						{
							name: "Supporto",
							free: "Email",
							basic: "Email Prioritario",
							premium: "Telefono e Email",
							enterprise: "Dedicato",
						},
						{
							name: "Collaborazione di Team",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Sì",
						},
						{
							name: "Brand Personalizzato",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Sì",
						},
						{
							name: "Accesso API",
							free: "No",
							basic: "No",
							premium: "No",
							enterprise: "Sì",
						},
					],
				},
				faq: {
					header: "Domande Frequenti",
					questions: [
						{
							question: "Posso cambiare piano in qualsiasi momento?",
							answer:
								"Sì, puoi aggiornare o ridurre il tuo piano in qualsiasi momento. Le modifiche hanno effetto immediato.",
						},
						{
							question: "C'è una prova gratuita?",
							answer:
								"Il piano Gratuito è sempre gratuito. I piani a pagamento offrono una prova gratuita di 14 giorni.",
						},
						{
							question: "Quali metodi di pagamento accettate?",
							answer:
								"Accettiamo tutte le principali carte di credito (Visa, MasterCard, American Express) e PayPal.",
						},
						{
							question: "Posso cancellare il mio abbonamento?",
							answer:
								"Sì, puoi cancellare in qualsiasi momento. Senza domande.",
						},
						{
							question:
								"Offrite sconti per studenti o organizzazioni non profit?",
							answer:
								"Sì! Contatta il nostro team commerciale per prezzi speciali.",
						},
					],
					cta_section: {
						title: "Pronto a far decollare la tua carriera?",
						subtitle:
							"Unisciti a migliaia di professionisti che hanno trovato il lavoro dei loro sogni con il nostro creatore di curriculum.",
						start_free_trial: "Inizia Prova Gratuita",
						schedule_demo: "Pianifica una Demo",
					},
				},
			},
			contact: {
				title: "Contattaci",
				subtitle:
					"Hai domande? Siamo qui per aiutarti! Contattaci e ti risponderemo il prima possibile.",
				form: {
					title: "Inviaci un Messaggio",
					name_label: "Nome Completo",
					name_placeholder: "Marco Rossi",
					email_label: "Indirizzo Email",
					email_placeholder: "marco@esempio.com",
					subject_label: "Oggetto",
					subject_placeholder: "Come possiamo aiutarti?",
					message_label: "Messaggio",
					message_placeholder: "Raccontaci di più sulla tua richiesta...",
					submit_button: "Invia Messaggio",
					sending: "Invio in corso...",
					success_message:
						"Grazie per il tuo messaggio! Ti risponderemo presto.",
					error_message:
						"Si è verificato un errore durante l'invio del messaggio. Riprova.",
				},
				info: {
					email_title: "Email",
					email: "support@resbuilder.com",
					phone_title: "Telefono",
					phone: "+1 (555) 123-4567",
					address_title: "Indirizzo",
					address: "Via Curriculum 123, Suite 100\nToronto, CA 94107",
					hours_title: "Orari di Lavoro",
					hours:
						"Lunedì - Venerdì: 9:00 AM - 6:00 PM\nSabato: 10:00 AM - 2:00 PM",
				},
				location_title: "La Nostra Posizione",
				location_description:
					"Siamo situati nel cuore di Toronto. Vieni a trovarci durante i nostri orari di lavoro.",
				faq_title: "Domande Frequenti",
				faqs: [
					{
						question: "Come posso ottenere supporto tecnico?",
						answer:
							"Per supporto tecnico, invia un'email al nostro team di supporto a support@resbuilder.com o usa il modulo di contatto sopra.",
					},
					{
						question: "Offrite soluzioni aziendali?",
						answer:
							"Sì! Contatta il nostro team commerciale per soluzioni aziendali personalizzate e sconti per volume.",
					},
					{
						question: "Quanto tempo ci vuole per ricevere una risposta?",
						answer:
							"Rispondiamo solitamente entro 24 ore nei giorni lavorativi.",
					},
				],
				cta_title: "Pronto a Iniziare?",
				cta_subtitle:
					"Crea il tuo curriculum professionale oggi e fai il prossimo passo nella tua carriera.",
				cta_button1: "Inizia Prova Gratuita",
				cta_button2: "Vedi Piani di Prezzo",
			},
		},
		template_names: {
			classic: "Classico",
			classic_ats: "Classico ATS",
			elegant: "Elegante",
			modern: "Moderno",
			minimalist: "Minimalista",
			student: "Studente",
		},
		footer: "2025 Creatore di CV IA. Tutti i diritti riservati.",
		general: {
			software_on_large_screens:
				"Questo software può essere utilizzato solo su schermi più grandi (tablet, laptop, desktop). Si prega di passare a un dispositivo più grande per utilizzare il Creatore di Curriculum",
			tab_selector: "Selettore di Schede",
			input_selector: "Selettore di Input",
			preview_selector: "Selettore di Anteprima",
			instructional_message:
				"Seleziona una delle schede sopra per iniziare a creare il tuo curriculum",
			organize_sections: "Organizza le sezioni del curriculum",
			fill_in_information: "Compila le tue informazioni",
			preview_your_resume: "Anteprima del tuo curriculum",
			user_already_on_free_plan: "Sei già sul piano Gratuito",
		},
		server_responses: {
			general_unable_to_download: "Impossibile scaricare. Riprova più tardi.",
			plan_expired: "Il piano è scaduto",
			user_not_found: "Utente non trovato",
			you_used_all_downloads_upgrade:
				"Hai già scaricato il tuo curriculum gratuito incluso nel piano gratuito. Iscriviti a un piano a pagamento per godere di più download o download illimitati.",
			you_used_your_download_limit:
				"Hai raggiunto il tuo limite di download per questo periodo.",
			user_already_in_free_plan: "L'utente è già sul piano gratuito",
			success_plan_change_and_downloads_remaining: (
				downloadsRemaining: number,
				daysRemaining: number
			) =>
				`Passaggio al piano gratuito riuscito. Puoi utilizzare i tuoi ${downloadsRemaining} download rimanenti per i prossimi ${daysRemaining} giorni.`,
			cancel_subscription_success: "Il tuo abbonamento è stato annullato.",
			paid_plan_expired:
				"Il tuo piano a pagamento è scaduto. Aggiorna il tuo abbonamento.",
		},
		confirm_questions: {
			confirm_action: "Conferma Azione",
			confirm_yes: "Sì, continua",
			confirm_cancel: "Annulla",
			confirm_free_downgrade:
				"Sei sicuro di voler retrocedere al piano Gratuito? Il tuo abbonamento verrà annullato immediatamente.",
			confirm_cancel_plan:
				"Sei sicuro di voler annullare il tuo piano attuale? Il tuo abbonamento verrà annullato immediatamente e verrà automaticamente passato al piano Gratuito.",
		},
	},
}
