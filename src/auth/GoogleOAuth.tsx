import React from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import useBaseUrl from "../utils/use-base-url"
import axios from "axios"

type Props = {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const GoogleOAuth: React.FC<Props> = ({ setLoggedIn }) => {
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
	const navigate = useNavigate()
	const baseUrl = useBaseUrl()

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
				debugger

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
