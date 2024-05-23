import { Box, PaletteMode } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import React from "react"

interface Props {
	loggedIn: boolean
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
}
const UserHomePage: React.FC<Props> = ({
	loggedIn,
	setLoggedIn,
	themeProp,
	setThemeProp,
}) => {
	return (
		<>
			<NavDrawer
				themeProp={themeProp}
				setThemeProp={setThemeProp}
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
			/>
			<Box sx={{ pt: 2 }}>
				<h1>User Home Page</h1>
				<p>Nothing to do here yet!</p>
			</Box>
		</>
	)
}

export default UserHomePage
