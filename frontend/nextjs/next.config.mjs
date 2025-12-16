/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ["en", "fr", "es", "pt", "it", "zh", "hi", "ar"],
		defaultLocale: "en",
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;
                            style-src 'self' 'unsafe-inline';
                            img-src 'self' data: https://q.stripe.com https://js.stripe.com https://stripe-camo.global.ssl.fastly.net https://d1wqzb5bdbcre6.cloudfront.net https://qr.stripe.com https://b.stripecdn.com https://files.stripe.com;
                            font-src 'self';
                            connect-src 'self' https://api.stripe.com;
                            frame-src https://js.stripe.com https://hooks.stripe.com;
                        `
							.replace(/\s+/g, " ")
							.trim(),
					},
				],
			},
		]
	},
}

export default nextConfig
