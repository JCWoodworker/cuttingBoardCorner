import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from "@mui/material"
import { Inventory, AddBox } from "@mui/icons-material/"
import NavDrawer from "../../navigation/NavDrawer"

type OptionList = [
	title: string,
	routeAddress: string,
	iconComponent: JSX.Element
][]

const optionList: OptionList = [
	["All Products", "/admin/all-inventory", <Inventory />],
	["Quick Add", "/all-inventory/add-new-product", <AddBox />],
]

const AdminIndex = () => {
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
				<Typography variant="h3">Admin</Typography>
				<List
					sx={{
						mt: "2rem",
						width: "100%",
						maxWidth: "360px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						border: "1px solid rgba(121, 121, 121, 0.7)",
					}}
				>
					{optionList.map(([title, , iconComponent]) => (
						<ListItem sx={{ alignItems: "center" }} key={title}>
							<ListItemAvatar>
								<Avatar>{iconComponent}</Avatar>
							</ListItemAvatar>
							<ListItemText primary={title} />
						</ListItem>
					))}
				</List>
			</Box>
		</>
	)
}
export default AdminIndex
