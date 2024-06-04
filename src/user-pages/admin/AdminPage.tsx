import { Box, Typography } from "@mui/material"
import NavDrawer from "../../navigation/NavDrawer"
import NavigationButton from "../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../components/nav-button/NavButtonLayout"

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
				<NavButtonLayout>
					<NavigationButton path={"/"} text="User Home" icon="back" />
					<NavigationButton
						path="/admin/add-new-product"
						text="New Product"
						icon="forward"
					/>
				</NavButtonLayout>
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
