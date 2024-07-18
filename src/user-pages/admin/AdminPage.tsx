import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"

import useThemeContext from "../../hooks/use-theme-context"
import RedundantNavButtonLayout from "../../navigation/nav-button/RedundantNavButtonLayout"

import MainComponentLayout from "../../layouts/MainComponentLayout"
import ComponentTitle from "../../layouts/ComponentTitle"

const AdminPage = () => {
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
			width: { xs: "90%", md: "50%" },
			height: "5rem",
		},
		boxShadowClass:
			theme === "dark" ? "button-shadow-dark-mode" : "button-shadow-light-mode",
		variant: "outlined",
	}

	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={["userHome", "newProduct"]} />
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
					{adminLinkList.map((link) => (
						<Button
							className={adminLinkProps.boxShadowClass}
							sx={adminLinkProps.adminButtonStyle}
							variant={
								adminLinkProps.variant as "outlined" | "contained" | "text"
							}
							onClick={() => navigate(link.path)}
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
