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
	Typography,
} from "@mui/material"
import Logout from "@mui/icons-material/Logout"
import ThemeSwitchWithFunctionality from "../components/ThemeSwitchWithFunctionality"
import GoogleOAuth from "../auth/GoogleOAuth"
import { useNavigate } from "react-router-dom"
import { clearLocalStorage } from "../utils/clearLocalStorage"
import { UserInfo } from "../App"

interface Props {
	loggedIn: boolean
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
	userInfo: UserInfo
}

const NavDrawer: React.FC<Props> = ({
	loggedIn,
	themeProp,
	setThemeProp,
	setLoggedIn,
	setUserInfo,
	userInfo,
}) => {
	const [open, setOpen] = React.useState(false)
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)
	const navigate = useNavigate()

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const handleMenuItemClick = (menuSelection: string) => {
		switch (menuSelection) {
			case "Logout":
				clearLocalStorage(
					"accessToken",
					"refreshToken",
					"persist"
				)
				window.location.reload()
				break
			case "Settings":
				alert("No Settings Yet")
				break
			case "My Products":
				alert("Your products are not linked to your account yet")
				break
			case "See A Message":
				alert("This is a message")
				break
			case "Home":
				navigate("/")
				window.location.reload()
				break
			default:
				break
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
				{loggedIn ? null : (
					<ListItem key="login" disablePadding>
						<GoogleOAuth setLoggedIn={setLoggedIn} setUserInfo={setUserInfo} />
					</ListItem>
				)}
			</List>
		</Box>
	)

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",

				textAlign: "left",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 1300,
				height: "3.5rem",
				borderBottom:
					themeProp === "dark" ? "2px solid lightgray" : "2px solid black",
				backgroundColor: themeProp === "dark" ? "black" : "lightgray",
				transform: visible ? "translateY(0)" : "translateY(-100%)",
				transition: "transform 0.3s ease",
				width: "100%",
			}}
		>
			<Button onClick={toggleDrawer(!open)}>
				<Typography variant="body1" sx={{ ml: 1, fontWeight: "bolder" }}>
					MENU
				</Typography>
			</Button>
			<Typography
				variant="body1"
				sx={{ mr: 1, fontWeight: "bolder", alignSelf: "center" }}
			>
				{loggedIn ? `Welcome ${userInfo?.firstName}!` : "Cutting Board Corner"}
			</Typography>
			<Drawer open={open} onClose={toggleDrawer(false)} anchor="left">
				{DrawerList}
			</Drawer>
		</Box>
	)
}

export default NavDrawer
