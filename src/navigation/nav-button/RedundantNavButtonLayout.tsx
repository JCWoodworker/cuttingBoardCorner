import { Box } from "@mui/material"
import NavigationButton from "./RedundantNavButton"

export type ButtonOptionType =
	| "home"
	| "userHome"
	| "admin"
	| "products"
	| "users"
	| "newProduct"
	| "myProducts"
	| "myLinks"
	| "careAndMaintenance"

interface Props {
	buttonOptionArray: ButtonOptionType[]
}

const RedundantNavButtonLayout: React.FC<Props> = ({ buttonOptionArray }) => {
	const allButtonOptions: Record<
		ButtonOptionType,
		{ path: string; text: string }
	> = {
		home: { path: "/", text: "Home" },
		userHome: { path: "/", text: "My Home" },
		admin: { path: "/admin", text: "Admin" },
		products: { path: "/admin/all-inventory", text: "All Products" },
		users: { path: "/admin/all-users", text: "All Users" },
		newProduct: { path: "/admin/add-new-product", text: "Add New Product" },
		myProducts: { path: "/my-products", text: "My Products" },
		myLinks: { path: "/my-links", text: "My Links" },
		careAndMaintenance: { path: "/care-and-maintenance", text: "Care & Maintenance" },
	}

	return (
		<Box
			sx={{
				padding: "1rem 0",
				width: "100%",
				margin: "0 auto",
				maxWidth: "350px",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				alignItems: "center",
				gap: "0.5rem",
			}}
		>
			{buttonOptionArray.map((buttonOption) => {
				const { path, text } = allButtonOptions[buttonOption]
				return <NavigationButton key={path} path={path} text={text} />
			})}
		</Box>
	)
}

export default RedundantNavButtonLayout
