import { useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

enum errorMessageEnums {
	NOT_FOUND_ERROR = "Page Not Found",
	ADMIN_ERROR = "Must be logged in with admin role to access this page",
}

const NotFound = () => {
	const navigate = useNavigate()
	const { "*": url } = useParams()
	let errorMessage = errorMessageEnums.NOT_FOUND_ERROR

	if (url?.includes("admin")) {
		errorMessage = errorMessageEnums.ADMIN_ERROR
	}

	useEffect(() => {
		setTimeout(() => {
			navigate("/")
		}, 2500)
	}, [navigate])

	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<div>
				<Typography
					variant="h4"
					sx={{
						fontWeight: "bold",
						textAlign: "center",
						p: 2,
						borderRadius: 1,
						backgroundColor: "rgba(255, 135, 135, 0.7)",
					}}
				>
					{errorMessage}
				</Typography>
				<Typography variant="subtitle1">
					Redirecting to Home Page in 2 seconds...
				</Typography>
			</div>
		</Box>
	)
}

export default NotFound
