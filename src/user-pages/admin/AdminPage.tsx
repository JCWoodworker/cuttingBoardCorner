import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"
import NavigationButton from "../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../layouts/MainComponentLayout"
import ComponentTitle from "../../layouts/ComponentTitle"

const AdminPage = () => {
	const navigate = useNavigate()
	return (
		<>
			<MainComponentLayout>
				<NavButtonLayout>
					<NavigationButton path={"/"} text="User Home" icon="back" />
					<NavigationButton
						path="/admin/add-new-product"
						text="New Product"
						icon="forward"
					/>
				</NavButtonLayout>
				<ComponentTitle text="Admin" />
				<Box
					sx={{
						mt: "3rem",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Button
						variant="outlined"
						onClick={() => navigate("/admin/all-inventory")}
						sx={{ width: "80%", height: "5rem" }}
					>
						All Products
					</Button>
					<Button
						variant="outlined"
						onClick={() => navigate("/admin/all-users")}
						sx={{ width: "80%", height: "5rem" }}
					>
						All Users
					</Button>
				</Box>
			</MainComponentLayout>
		</>
	)
}
export default AdminPage
