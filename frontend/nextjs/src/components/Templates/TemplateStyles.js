const TEMPLATE_STYLES = {
	elegant: `
		.elegant-template {
			background: url('${process.env.NEXT_PUBLIC_FRONTEND_SERVER}/images/template-bg-1.png') no-repeat center center !important;
			background-size: cover !important;
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
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
