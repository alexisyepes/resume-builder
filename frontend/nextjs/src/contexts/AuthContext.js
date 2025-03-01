import React, { createContext, useState, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const login = async (email, password) => {
		console.log("Logging in with:", email, password)
		setUser({ email })
		setIsAuthenticated(true)
	}

	const register = async (username, email, password) => {
		console.log("Registering with:", username, email, password)
		setUser({ username, email })
		setIsAuthenticated(true)
	}

	const signInWithGoogle = async () => {
		console.log("Signing in with Google")
		setUser({ email: "googleuser@example.com" })
		setIsAuthenticated(true)
	}

	const logout = () => {
		setUser(null)
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				register,
				signInWithGoogle,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
