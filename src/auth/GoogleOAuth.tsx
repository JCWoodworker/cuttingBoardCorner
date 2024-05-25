import React from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { UserInfo } from "../context/UserDataContextProvider"
import { Requests } from "../requests/Requests"

type Props = {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}

const GoogleOAuth: React.FC<Props> = ({ setLoggedIn, setUserInfo }) => {
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

			const response = await Requests.POST(
				`/authentication/google`,
				payload,
				false
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
				localStorage.setItem("accessToken", response.data.userAndTokens.tokens.accessToken)
				localStorage.setItem("refreshToken", response.data.userAndTokens.tokens.refreshToken)
				
				setUserInfo({
					firstName: response.data.userAndTokens.userInfo.firstName,
					lastName: response.data.userAndTokens.userInfo.lastName,
					image: response.data.userAndTokens.userInfo.imageUrl,
					role: response.data.userAndTokens.userInfo.role,
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
