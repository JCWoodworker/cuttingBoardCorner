import { Box, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"

const UserSettings = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Typography variant="h4">User Settings</Typography>
			</Box>
		</>
	)
}

export default UserSettings
