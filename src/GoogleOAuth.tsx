import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import axios from "axios"

interface Props {
	subscriptionTier?: string
	signUpOrIn: "signup" | "signin"
}

const GoogleOAuth: React.FC<Props> = ({ subscriptionTier, signUpOrIn }) => {
  const [user, setUser] = useState<string | null>(null)
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
	const navigate = useNavigate()

	// Fix this later and don't use "any" you lazy-ass!!
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSuccess = async (credentialResponse: any) => {
		try {
			const payload = {
				token: credentialResponse.credential,
				signUpOrIn,
				subappId: "FREEINV",
				subscriptionTier,
			}

      /* 
      Copied from my other app
      There is no request class in this project
      This needs to be manually coded to hit the proper endpoint in NestJSMegaBackend
			const response = await Request.post(
        "/authentication/google",
				payload,
				false
			)
      */

      const response = await axios.post("http://localhost:3000/authentication/google", payload)

			if (response) {
				if (response.status && response.status === 403) {
					localStorage.setItem("persist", "false")
					navigate("/signup")
					return false
				} else {
          localStorage.setItem("persist", "true")
          const user = await response.data
          debugger
          setUser(user)
        }


        /*
        useAuth hook is from the other app
        There is nothing set up like that in this one
        This needs to be updated to work with this specific app

				setAuth({
					user: "GOOGLE-USER",
					accessToken: response.tokens.accessToken,
				})

        */


				localStorage.setItem("user", "GOOGLE-USER")
				localStorage.setItem("accessToken", user?.tokens.accessToken)

				// JUST FOR TESTING UNTIL I SET UP HTTP ONLY COOKIES
				localStorage.setItem("refreshToken", user?.tokens.refreshToken)
				// END OF TEST

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
