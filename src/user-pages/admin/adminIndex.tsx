import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
} from "@mui/material"
import NavDrawer from "../../navigation/NavDrawer"

type OptionList = [title: string, routeAddress: string][]

const optionList: OptionList = [
	["All Products", "/admin/all-inventory"],
	["Quick Add", "/admin/add-new-product"],
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
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 2,
					}}
				>
					{optionList.map(([title, routeAddress]) => (
						<ListItemButton
							href={routeAddress}
							key={title}
							sx={{ width: "100%", border: "1px solid rgba(121, 121, 121, 0.7)" }}
						>
							<ListItem>
								<ListItemText
									primary={title}
									sx={{
										textAlign: "center",
										alignItems: "center",
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