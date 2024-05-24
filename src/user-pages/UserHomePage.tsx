import { Box, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import React from "react"
import { UserInfo } from "../App"

interface Props {
	loggedIn: boolean
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	userInfo: UserInfo
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}
const UserHomePage: React.FC<Props> = ({
	loggedIn,
	setLoggedIn,
	userInfo,
	setUserInfo,
}) => {
	return (
		<>
			<NavDrawer
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
