import * as React from "react"
import {
	Box,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	PaletteMode,
} from "@mui/material"
import Logout from "@mui/icons-material/Logout"
import ThemeSwitchWithFunctionality from "../components/ThemeSwitchWithFunctionality"
import MenuIcon from "@mui/icons-material/Menu"

interface Props {
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
}

const GuestNavDrawer: React.FC<Props> = ({ themeProp, setThemeProp }) => {
	const [open, setOpen] = React.useState(false)

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const handleMenuItemClick = (menuSelection: string) => {
		if (menuSelection === "Login") {
			alert("login functionality not set from menu yet")
			window.location.reload()
		} else if (menuSelection === "Settings") {
			alert("No Settings Yet")
		} else if (menuSelection === "My Products") {
			alert("Your products are not linked to your account yet")
		}
	}

	const DrawerList = (
		<Box sx={{ p: 1, width: 250 }} role="presentation">
			<List>
				<ListItem key="themeSwitch" disablePadding sx={{ alignSelf: "center" }}>
					<ThemeSwitchWithFunctionality
						themeProp={themeProp}
						setThemeProp={setThemeProp}
					/>
				</ListItem>
				{["My Products", "Settings"].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={() => handleMenuItemClick(text)}>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			<Button onClick={toggleDrawer(true)}>
				<MenuIcon />
			</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	)
}

export default GuestNavDrawer
