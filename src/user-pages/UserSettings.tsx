import { Box, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import NavigationButton from "../components/nav-button/NavigationButton"
import NavButtonLayout from "../components/nav-button/NavButtonLayout"

const UserSettings = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<NavButtonLayout>
					<NavigationButton path={"/"} text="User Home" icon="back" />
				</NavButtonLayout>
				<Typography variant="h4">User Settings</Typography>
			</Box>
		</>
	)
}

export default UserSettings
