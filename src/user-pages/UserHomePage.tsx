import { Box, PaletteMode, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import React from "react"
import { UserInfo } from "../App"

interface Props {
	loggedIn: boolean
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
	userInfo: UserInfo
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}
const UserHomePage: React.FC<Props> = ({
	loggedIn,
	setLoggedIn,
	themeProp,
	setThemeProp,
	userInfo,
	setUserInfo,
}) => {
	return (
		<>
			<NavDrawer
				themeProp={themeProp}
				setThemeProp={setThemeProp}
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				userInfo={userInfo}
				setUserInfo={setUserInfo}
			/>
			<Box sx={{ pt: 4 }}>
				<Typography variant="h3">User Home Page</Typography>
				<Typography variant="body1">Nothing to do here yet!</Typography>
			</Box>
		</>
	)
}

export default UserHomePage
