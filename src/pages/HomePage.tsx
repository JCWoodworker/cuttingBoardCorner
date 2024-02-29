import { Typography } from "@mui/material"

const HomePage: React.FC = () => {
	return (
		<>
			<Typography variant="h1">My Cutting Board</Typography>
			<form>
				<label>Enter Your Board ID</label>
				<input type="text" />
				<button type="submit">Submit</button>
			</form>
		</>
	)
}

export default HomePage
