import { Box, Typography } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import NavigationButton from "../components/NavigationButton"

const UserProducts = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Box
					sx={{
						margin: "0 auto",
						marginBottom: "1rem",
						padding: "0.25rem",
						maxWidth: "600px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
						alignItems: "center",
						gap: "1rem",
					}}
				>
					<NavigationButton path={"/"} text="User Home" icon="back" />
				</Box>
				<Typography variant="h4">My Products</Typography>
			</Box>
		</>
	)
}

export default UserProducts
