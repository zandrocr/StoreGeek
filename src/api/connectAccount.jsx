//hook
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth"
import { useState, createContext, useEffect } from "react"
import { auth, provider } from "./api"

export const GoogleContextAuth = createContext({})

export const ConnectAccount = ({ children }) => {
	const [user, setUser] = useState(null)

	const tokenSession = localStorage.getItem("@AuthLogginGoogle:token")
	const userSession = localStorage.getItem("@AuthLogginGoogle:user")

	useEffect(() => {
		tokenSession && userSession ? setUser(userSession) : null
	}, [])

	async function signInGoogle() {
		await signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result)
				const token = credential.accessToken
				const user = result.user
				setUser(user)
				localStorage.setItem("@AuthLogginGoogle:token", token)
				localStorage.setItem("@AuthLogginGoogle:user", JSON.stringify(user))
				window.location.reload()
			})
			.catch((error) => {
				console.log((errorCode = error.code))
				console.log((errorMessage = error.message))
				console.log((email = error.customData.email))
				console.log((credential = GoogleAuthProvider.credentialFromError(error)))
			})
	}

	return (
		<GoogleContextAuth.Provider value={{ signInGoogle, signed: !!user, user, setUser }}>
			{children}
		</GoogleContextAuth.Provider>
	)
}

export const createEmail = (props) => {
	createUserWithEmailAndPassword(auth, props.email, props.password)
		.then((userCredential) => {
			console.log("Signed in")
			const user = userCredential.user
		})
		.catch((error) => {
			console.log(error.code)
			console.log(error.message)
		})
}

export const EmailContextAuth = createContext({})
export const connectEmail = (props) => {
	const emai = "alezandrocosta@live.com"
	const password = "ffs5556ee"

	// const userSession = localStorage.getItem("@AuthLogginEmail:user")

	// useEffect(() => {
	// userSession ? props.setEmail(userSession) : null
	// }, [])

	signInWithEmailAndPassword(auth, emai, password)
		.then((userCredential) => {
			console.log("Signed in")
			const user = userCredential.user
			props.setEmail(user)
			localStorage.setItem("@AuthLogginEmail:user", JSON.stringify(user))
		})
		.catch((error) => {
			console.log(error.code)
			console.log(error.message)
		})

	// return (
	// 	<EmailContextAuth.Provider value={{ signedEmail: !!props.email }}>
	// 		{children}
	// 	</EmailContextAuth.Provider>
	// )
}

export const SingOut = () => {
	signOut(auth)
		.then(() => {
			localStorage.clear()
			console.log("Sign-out successful.")
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		})
		.catch((error) => {
			console.log("An error happened.", error)
		})
}
