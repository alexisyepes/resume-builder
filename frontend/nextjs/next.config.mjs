/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["en", "fr", "es", "pt", "it", "zh", "hi", "ar"],
		defaultLocale: "en",
	},
}

export default nextConfig
