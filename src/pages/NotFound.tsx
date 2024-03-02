import { useEffect } from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate("/")
		}, 2000)
	}, [])

	return (
		<>
			<Typography variant="h3">Page Not Found</Typography>
			<Typography variant="subtitle1">
				Redirecting to Home Page in 2 seconds...
			</Typography>
		</>
	)
}

export default NotFound
