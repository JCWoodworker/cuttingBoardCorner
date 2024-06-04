import { Box, Typography } from "@mui/material"
import NavDrawer from "../../navigation/NavDrawer"
import NavigationButton from "../../components/NavigationButton"

const AdminPage = () => {
	return (
		<>
			<NavDrawer />
			<Box
				sx={{
					mt: "3rem",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
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
					<NavigationButton
						path="/admin/add-new-product"
						text="New Product"
						icon="forward"
					/>
				</Box>
				<Typography variant="h4">Admin</Typography>
				<br />
				<NavigationButton
					path={"/admin/all-inventory"}
					text="All Products"
					size="large"
				/>
			</Box>
		</>
	)
}
export default AdminPage
