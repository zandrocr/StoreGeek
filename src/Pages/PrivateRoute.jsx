import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { GoogleContextAuth } from "../api/connectAccount"

export const PrivateRoute = () => {
	const { signed } = useContext(GoogleContextAuth)
	return signed ? <Outlet /> : <Navigate to="/" />
}
