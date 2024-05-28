import { Box, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"

const UserProducts = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Typography variant="h4">My Products</Typography>
			</Box>
		</>
	)
}

export default UserProducts
