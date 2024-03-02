import { Typography } from "@mui/material"
import BoardIdForm from "./BoardIdForm"

const HomePage: React.FC = () => {
	return (
		<>
			<Typography variant="h2">My Cutting Board</Typography>
			<br />
			<BoardIdForm />
		</>
	)
}

export default HomePage
