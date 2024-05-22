const useBaseUrl = () => {

	const environment = import.meta.env.VITE_ENVIRONMENT
	let baseUrl = "http://localhost:3000/api/v1"

	if (environment === "dev") {
		baseUrl = import.meta.env.VITE_BACKEND_URL_DEV
	} else if (environment === "preprod") {
		baseUrl = import.meta.env.VITE_BACKEND_URL_PREPROD
	} else if (environment === "prod") {
		baseUrl = import.meta.env.VITE_BACKEND_URL_PROD
	}
  
	return baseUrl
}

export default useBaseUrl
