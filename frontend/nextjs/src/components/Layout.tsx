import type { ReactNode } from "react"

import Footer from "./Footer"
import Navbar from "./Navbar"
import { GlobalConfirmWindow } from "./ConfirmWindow"
import { ToastContainer } from "react-toastify"

type LayoutProps = {
	children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow pt-4">{children}</main>
			<Footer />
			<GlobalConfirmWindow />
			<ToastContainer autoClose={8000} theme="dark" />
		</div>
	)
}
