import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Layout({ children }) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow pt-4">{children}</main>
			<Footer />
		</div>
	)
}
