import { Box, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import React from "react"

const UserHomePage: React.FC = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: 4 }}>
				<Typography variant="h3">User Home Page</Typography>
				<Typography variant="body1">Nothing to do here yet!</Typography>
			</Box>
		</>
	)
}

export default UserHomePage
