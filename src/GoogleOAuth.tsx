import React from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import axios from "axios"

type Props = {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const environment = import.meta.env.VITE_ENVIRONMENT
let baseUrl = "http://localhost:3000/api/v1"
if (environment === "dev") {
	baseUrl = import.meta.env.VITE_BACKEND_URL_DEV
} else if (environment === "preprod") {
	baseUrl = import.meta.env.VITE_BACKEND_URL_PREPROD
} else if (environment === "prod") {
	baseUrl = import.meta.env.VITE_BACKEND_URL_PROD
}
console.log(`baseUrl: ${baseUrl}`)

const GoogleOAuth: React.FC<Props> = ({ setLoggedIn }) => {
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
	const navigate = useNavigate()

	// Fix this later and don't use "any" you lazy-ass!!
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSuccess = async (credentialResponse: any) => {
		try {
			const payload = {
				token: credentialResponse.credential,
				subappId: "CUTTINGBOARDCORNER",
				signUpOrIn: "signup",
			}

      const response = await axios.post(
				`${baseUrl}/authentication/google`,
				payload
			)

			if (response) {
				if (response.status && response.status === 403) {
					localStorage.setItem("persist", "false")
					navigate("/")
					return false
				} else {
					localStorage.setItem("persist", "true")
					setLoggedIn(true)
				}

				localStorage.setItem("user", "GOOGLE-USER")
				localStorage.setItem("accessToken", response.data.tokens.accessToken)
				localStorage.setItem("refreshToken", response.data.tokens.refreshToken)

				navigate("/")
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					onSuccess(credentialResponse)
				}}
			/>
		</GoogleOAuthProvider>
	)
}

export default GoogleOAuth
