import { useEffect } from "react"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import useUserDataContext from "../hooks/use-user-data-context"
enum ErrorMessageEnums {
	NOT_FOUND_ERROR = "Page Not Found",
	LOGGED_IN_ADMIN_ERROR = "Must have admin role to access this page",
	LOGGED_OUT_ADMIN_ERROR = "Must be logged in and have admin role to access this page",
}

const NotFound = () => {
	let errorMessage = ErrorMessageEnums.NOT_FOUND_ERROR

	const navigate = useNavigate()
	const { "*": url } = useParams()
	const { userInfo, loggedIn } = useUserDataContext()

	if (url?.includes("admin") && !loggedIn) {
		errorMessage = ErrorMessageEnums.LOGGED_OUT_ADMIN_ERROR
	}
	
	if (url?.includes("admin") && loggedIn && userInfo.role != "admin") {
		errorMessage = ErrorMessageEnums.LOGGED_IN_ADMIN_ERROR
	}

	if (url?.includes("admin") && loggedIn && userInfo.role === "admin") {
		errorMessage = ErrorMessageEnums.NOT_FOUND_ERROR
	}


	useEffect(() => {
		setTimeout(() => {
			navigate(-1)
		}, 2500)
	}, [navigate])

	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
			<Box>
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
				<br />
				<Typography variant="subtitle1">
					Redirecting to Home Page in 2 seconds...
				</Typography>
				<br />
				<CircularProgress />
			</Box>
		</Box>
	)
}

export default NotFound
