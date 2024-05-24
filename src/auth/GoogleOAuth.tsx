import React from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import useBaseUrl from "../utils/use-base-url"
import axios from "axios"
import { UserInfo } from "../App"

type Props = {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}

const GoogleOAuth: React.FC<Props> = ({ setLoggedIn, setUserInfo }) => {
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
				localStorage.setItem("accessToken", response.data.tokens.accessToken)
				localStorage.setItem("refreshToken", response.data.tokens.refreshToken)

				setUserInfo({
					firstName: response.data.userNameAndImage.firstName,
					lastName: response.data.userNameAndImage.lastName,
					image: response.data.userNameAndImage.imageUrl,
				})
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
