import { Box, Typography } from "@mui/material"
import BoardIdForm from "./BoardIdForm"

const HomePage: React.FC = () => {
	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "100vh"}}>
			<div>
			<Typography variant="h2">My Cutting Board</Typography>
			<BoardIdForm />
			</div>
		</Box>
	)
}

export default HomePage
