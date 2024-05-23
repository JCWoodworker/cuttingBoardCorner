import { Box, PaletteMode } from "@mui/material"
import UserNavDrawer from "../navigation/UserNavDrawer"
import React from "react"

interface Props {
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
}
const UserHomePage: React.FC<Props> = ({ themeProp, setThemeProp }) => {
	return (
		<>
			<UserNavDrawer themeProp={themeProp} setThemeProp={setThemeProp} />
			<Box>
				<h1>User Home Page</h1>
				<p>Nothing to do here yet!</p>
			</Box>
		</>
	)
}

export default UserHomePage
