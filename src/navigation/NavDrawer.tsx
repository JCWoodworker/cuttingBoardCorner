import * as React from "react"
import { useState, useEffect } from "react"
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
import GoogleOAuth from "../auth/GoogleOAuth"
import { useNavigate } from "react-router-dom"

interface Props {
	loggedIn: boolean
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const NavDrawer: React.FC<Props> = ({
	loggedIn,
	themeProp,
	setThemeProp,
	setLoggedIn,
}) => {
	const [open, setOpen] = React.useState(false)
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)
	const navigate = useNavigate()

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const handleMenuItemClick = (menuSelection: string) => {
		if (menuSelection === "Home") {
			navigate("/")
			window.location.reload()
		} else if (menuSelection === "See A Message") {
			alert("This is a message")
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY
			setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0)
			setPrevScrollPos(currentScrollPos)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [prevScrollPos])

	const guestMenuItems = (
		<>
			{["Home", "See A Message"].map((text) => (
				<ListItem key={text} disablePadding>
					<ListItemButton onClick={() => handleMenuItemClick(text)}>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</>
	)

	const userMenuItems = (
		<>
			{["Logout", "Settings", "My Products"].map((text) => (
				<ListItem key={text} disablePadding>
					<ListItemButton onClick={() => handleMenuItemClick(text)}>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</>
	)

	const DrawerList = (
		<Box sx={{ p: 1, width: 250 }} role="presentation">
			<List>
				<ListItem>
					<br />
					<br />
				</ListItem>
				<ListItem key="themeSwitch" disablePadding sx={{ alignSelf: "center" }}>
					<ThemeSwitchWithFunctionality
						themeProp={themeProp}
						setThemeProp={setThemeProp}
					/>
				</ListItem>
				{loggedIn ? userMenuItems : guestMenuItems}
				<ListItem key="login" disablePadding>
					<GoogleOAuth setLoggedIn={setLoggedIn} />
				</ListItem>
			</List>
		</Box>
	)

	return (
		<Box
			sx={{
				textAlign: "left",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 1300,
				backgroundColor: themeProp === "dark" ? "black" : "lightgray",
				transform: visible ? "translateY(0)" : "translateY(-100%)",
				transition: "transform 0.3s ease",
				width: "100%",
			}}
		>
			<Button onClick={toggleDrawer(!open)}>
				<p style={{ borderBottom: "1px solid white" }}>MENU</p>
			</Button>
			<Drawer open={open} onClose={toggleDrawer(false)} anchor="left">
				{DrawerList}
			</Drawer>
		</Box>
	)
}

export default NavDrawer
