const TEMPLATE_STYLES = {
	elegant: `
		.elegant-template {
			background: url('${process.env.NEXT_PUBLIC_FRONTEND_SERVER}/images/template-bg-1.png') no-repeat center center !important;
			background-size: cover !important;
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
		}
	`,
	student: `
        .student-template .header {
            border-bottom: 8px solid #000000;
            width: 100%;
            height: 180px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 2rem;
            padding-right: 2rem;
            color: #000000;
            background-color: white;
        }

        .student-template .header .header_top {
            font-size: 3rem; /* 48px */
            font-weight: bold;
            text-transform: uppercase;
            white-space: normal;
            text-align: center;
        }

        .student-template .header .header_bottom {
            font-size: 1.25rem; /* 20px */
            text-transform: uppercase;
            white-space: normal;
            margin-top: 0.5rem;
            text-align: center;
            word-wrap: break-word;
        }

        /* Estilos para la estructura grid */
        .student-template .grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .student-template .col-span-1 {
            grid-column: span 1 / span 1;
            color: #000000;
            padding: 2rem;
            border-right: 1px solid #d1d5db;
        }

        .student-template .col-span-2 {
            grid-column: span 2 / span 2;
            background-color: white;
            color: #1e293b;
        }

        /* Estilos para las secciones internas */
        .student-template .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        .student-template .p-8 {
            padding: 2rem;
        }

        .student-template .-mt-4 {
            margin-top: -1rem;
        }

        .student-template .border-b {
            border-bottom-width: 1px;
        }

        .student-template .border-gray-300 {
            border-color: #d1d5db;
        }

        .student-template .pb-4 {
            padding-bottom: 1rem;
        }

        .student-template .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
        }

        .student-template .font-extrabold {
            font-weight: 800;
        }

        .student-template .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
        }

        .student-template .mt-2 {
            margin-top: 0.5rem;
        }

        .student-template .mt-4 {
            margin-top: 1rem;
        }

        .student-template .w-\[220px\] {
            width: 220px;
        }

        .student-template .break-words {
            word-wrap: break-word;
            word-break: break-word;
        }

        .student-template .whitespace-normal {
            white-space: normal;
        }

        .student-template .max-h-\[440px\] {
            max-height: 440px;
        }

        .student-template .overflow-y-auto {
            overflow-y: auto;
        }

        .student-template .pr-2 {
            padding-right: 0.5rem;
        }

        .student-template .text-justify {
            text-align: justify;
        }

        .student-template .hyphens-auto {
            hyphens: auto;
        }

        .student-template .capitalize {
            text-transform: capitalize;
        }

        .student-template .uppercase {
            text-transform: uppercase;
        }
    `,
	minimalist: `
        .minimalist-template {
            font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .minimalist-template .header-gradient {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 32px 48px !important;
        }
        .minimalist-template .header-gradient .contact-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
        }
        .minimalist-template .header-gradient .contact-grid > div {
            display: flex !important;
            align-items: flex-start !important;
            min-width: 0 !important;
        }
        .minimalist-template .header-gradient .contact-grid span {
            word-break: break-word !important;
            word-wrap: break-word !important;
            white-space: normal !important;
            line-height: 1.3 !important;
            font-size: 11px !important;
            flex: 1 !important;
            overflow-wrap: break-word !important;
            min-width: 0 !important;
        }
        .minimalist-template .section-border {
            border-left: 4px solid #3b82f6 !important;
            border-left-color: #3b82f6 !important;
            border-left-width: 4px !important;
            border-left-style: solid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            padding-left: 12px !important;
        }
        .minimalist-template .content-area {
            padding: 32px 48px !important;
        }
        .minimalist-template .content-area::before,
        .minimalist-template .content-area::after {
            display: none !important;
        }
        .minimalist-template hr {
            display: none !important;
        }
        .minimalist-template .skill-badge {
            background-color: #f3f4f6 !important;
            border: 1px solid #d1d5db !important;
            border-color: #d1d5db !important;
            color: #374151 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .minimalist-template .year-badge {
            background-color: #dbeafe !important;
            color: #1e40af !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        /* Asegurar que no haya líneas horizontales extra en el PDF */
        .minimalist-template {
            border: none !important;
        }
        .minimalist-template > * {
            border: none !important;
        }
    `,
}

export default TEMPLATE_STYLES
