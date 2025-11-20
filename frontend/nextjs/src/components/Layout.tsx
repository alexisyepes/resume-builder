import type { ReactNode } from "react"

import Footer from "./Footer"
import Navbar from "./Navbar"

type LayoutProps = {
	children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow pt-4">{children}</main>
			<Footer />
		</div>
	)
}
