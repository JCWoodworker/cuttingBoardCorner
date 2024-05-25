import axios from "axios"
import { clearLocalStorage } from "../utils/clearLocalStorage"

export type RefreshTokenRequest = {
	refreshToken: string
}
export type GoogleOAuthDto = {
	token: string
	signUpOrIn: string
	subappId?: string
	subscriptionTier?: string
}

export class Requests {
	constructor() {}

	static async GET(
		urlEndpoint: string,
		externalApi: boolean,
		authorizationRequired: boolean,
		accessToken?: string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<any> {
		let headers = {}
		if (authorizationRequired) {
			headers = {
				Authorization: `Bearer ${accessToken}`,
			}
		}

		const urlPrefix = await this.getBackendUrl()
		const fullUrl = externalApi ? urlEndpoint : `${urlPrefix}${urlEndpoint}`
		try {
			const response = await axios.get(fullUrl, { headers })
			return response
			// Gotta figure out what's the original logic was behind this
			// maybe we only need to run a refresh if there's a 4XX error
		} catch (error) {
			const refreshToken = localStorage.getItem("refreshToken")
			if (refreshToken) {
				const response = await this.refresh(refreshToken)
				if (response) {
					return this.GET(urlEndpoint, false, true, response.accessToken)
				}
			}
			console.error("GET request error:", error)
			throw error
		}
	}

	static async POST(
		urlEndpoint: string,
		data: RefreshTokenRequest | GoogleOAuthDto,
		authorizationRequired: boolean,
		accessToken?: string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<any> {
		const urlPrefix = await this.getBackendUrl()
		const fullUrl = `${urlPrefix}${urlEndpoint}`
		let headers = {}
		if (data instanceof File) {
			headers = { ...headers, "Content-Type": "multipart/form-data" }
		}
		if (authorizationRequired) {
			headers = { ...headers, Authorization: `Bearer ${accessToken}` }
		}
		try {
			const response = await axios.post(fullUrl, data, { headers })
			return response
		} catch (error) {
			console.error("POST request error:", error)
			throw error
		}
	}

	// async delete(url: string) {
	// 	const response = await fetch(url, {
	// 		method: "DELETE",
	// 	})
	// 	const responseData = await response.json()
	// 	return responseData
	// }

	// async patch(url: string, data: any) {
	// 	const response = await fetch(url, {
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(data),
	// 	})
	// 	const responseData = await response.json()
	// 	return responseData
	// }

	static async refresh(refreshToken: string) {
		const urlPrefix = await this.getBackendUrl()
		try {
			const response = await axios.post(
				`${urlPrefix}/authentication/refresh-tokens`,
				{ refreshToken }
				/*
				We'll need the following headers if refresh tokens are ever in HTTP only cookies:
				{ headers: { withCredentials: true } }
				*/
			)

			if (response.status === 401) {
				localStorage.setItem("persist", "false")
				console.log(
					"401 Unauthorized, removing token from local storage - it can only be used once"
				)
				return false
			}

			const tokens = await response.data
			localStorage.setItem("accessToken", tokens.accessToken)
			localStorage.setItem("refreshToken", tokens.refreshToken)
			return response.data

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.response.status === 401) {
				console.log("401 Unauthorized, removing token from local storage")
				clearLocalStorage("accessToken", "refreshToken", "persist")
				return false
			}
			console.log(error)
			return false
		}
	}

	private static async getBackendUrl() {
		try {
			const environment: string = await import.meta.env.VITE_ENVIRONMENT
			switch (environment) {
				case "dev":
					return import.meta.env.VITE_BACKEND_URL_DEV
				case "preprod":
					return import.meta.env.VITE_BACKEND_URL_PREPROD
				case "prod":
					return import.meta.env.VITE_BACKEND_URL_PROD
				default:
					return "http://localhost:3000/api/v1"
			}
		} catch (error) {
			console.log(error)
			return "http://localhost:3000/api/v1"
		}
	}
}
