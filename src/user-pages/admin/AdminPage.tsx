import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"

import useThemeContext from "../../hooks/use-theme-context"
import useProductStore from "../../zustand/productStore"
import useUserStore from "../../zustand/userStore"
import RedundantNavButtonLayout from "../../navigation/RedundantNavButtonLayout"

import MainComponentLayout from "../../layouts/MainComponentLayout"
import ComponentTitle from "../../layouts/ComponentTitle"

const AdminPage = () => {
	const { setSelectedProduct } = useProductStore()
	const { setSelectedUser } = useUserStore()
	const navigate = useNavigate()
	const { theme } = useThemeContext()
	const adminLinkList = [
		{
			path: "/admin/all-inventory",
			text: "All Products",
		},
		{
			path: "/admin/all-users",
			text: "All Users",
		},
		{
			path: "/admin/add-new-product",
			text: "Add New Product",
		},
	]
	const adminLinkProps = {
		adminButtonStyle: {
			width: { xs: "90%", sm: "50%" },
			height: "5rem",
		},
		boxShadowClass:
			theme === "dark" ? "button-shadow-dark-mode" : "button-shadow-light-mode",
		variant: "outlined",
	}

	const handleButtonClick = (path: string) => {
		if (path === "/admin/all-inventory") {
			setSelectedProduct(null)
		} else if (path === "/admin/all-users") {
			setSelectedUser(null)
		}
		navigate(path)
	}

	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout
					buttonOptionArray={["userHome", "newProduct"]}
				/>
				<ComponentTitle text="Admin" />
				<Box
					sx={{
						m: "1rem auto",
						maxWidth: {
							xs: "95%",
							sm: "800px",
						},
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: 2,
					}}
				>
					{adminLinkList.map((link) => (
						<Button
							key={link.path}
							className={adminLinkProps.boxShadowClass}
							sx={adminLinkProps.adminButtonStyle}
							variant={
								adminLinkProps.variant as "outlined" | "contained" | "text"
							}
							onClick={() => handleButtonClick(link.path)}
						>
							{link.text}
						</Button>
					))}
				</Box>
			</MainComponentLayout>
		</>
	)
}
export default AdminPage
