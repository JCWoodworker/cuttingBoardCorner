import { useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

const NotFound = () => {
	const navigate = useNavigate()
	const params = useParams()
	const boardOrCoasterParam = params.coasterId ? "coasters" : "boards"

	useEffect(() => {
		setTimeout(() => {
			navigate("/", { state: { boardOrCoasterOption: boardOrCoasterParam } })
		}, 2000)
	}, [navigate, boardOrCoasterParam])

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
