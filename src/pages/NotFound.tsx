import { useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate("/")
		}, 2000)
	}, [navigate])

	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<div>
				<Typography variant="h3">Page Not Found</Typography>
				<Typography variant="subtitle1">
					Redirecting to Home Page in 2 seconds...
				</Typography>
			</div>
		</Box>
	)
}

export default NotFound
