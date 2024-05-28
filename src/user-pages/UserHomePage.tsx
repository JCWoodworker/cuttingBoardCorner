import { Box, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"

const UserHomePage: React.FC = () => {

	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Typography variant="h3">User Home Page</Typography>
				<Typography variant="body1">Nothing to do here yet!</Typography>
			</Box>
		</>
	)
}

export default UserHomePage
