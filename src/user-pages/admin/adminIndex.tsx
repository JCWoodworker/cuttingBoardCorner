import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemButton,
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
	["Quick Add", "/admin/all-inventory/add-new-product", <AddBox />],
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
						maxWidth: "500px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{optionList.map(([title, routeAddress, iconComponent]) => (
						<ListItemButton href={routeAddress} key={title}>
							<ListItem
								sx={{
									flexDirection: "row",
									flexGrow: 1,
									alignItems: "center",
								}}
							>
								<ListItemAvatar>
									<Avatar>{iconComponent}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={title}
									sx={{
										"@media (max-width: 400px)": {
											visibility: "hidden",
										},
									}}
								/>
							</ListItem>
						</ListItemButton>
					))}
				</List>
			</Box>
		</>
	)
}
export default AdminIndex
