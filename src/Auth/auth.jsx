import { useEffect } from "react"
import { createContext, useState } from "react"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [use, setUse] = useState()

	useEffect(() => {
		const useToke = localStorage.getItem("use_token")
		const useStorage = localStorage.getItem("use_db")

		if (useToke && useStorage) {
			const hasUser = JSON.parse(useStorage)?.filter(
				(user) => user.name === JSON.parse(useToke).name
			)

			if (hasUser) setUse(hasUser[0])
		}
	}, [])

	return <AuthContext.Provider>{children}</AuthContext.Provider>
}

