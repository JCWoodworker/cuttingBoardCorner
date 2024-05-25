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
	Typography,
} from "@mui/material"
import {
	Home,
	Settings,
	Message,
	Logout,
	Inventory2,
	AdminPanelSettings,
} from "@mui/icons-material"
import ThemeSwitchWithFunctionality from "../components/ThemeSwitchWithFunctionality"
import GoogleOAuth from "../auth/GoogleOAuth"
import { useNavigate } from "react-router-dom"
import { clearLocalStorage } from "../utils/clearLocalStorage"
import useThemeContext from "../custom_hooks/use-theme-context"
import useUserDataContext from "../custom_hooks/use-user-data-context"

const NavDrawer: React.FC = () => {
	const [open, setOpen] = React.useState(false)
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)
	const { theme } = useThemeContext()
	const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useUserDataContext()
	const navigate = useNavigate()

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const handleMenuItemClick = (menuSelection: string) => {
		switch (menuSelection) {
			case "Logout":
				clearLocalStorage("accessToken", "refreshToken", "persist")
				window.location.reload()
				break
			case "Settings":
				alert("No user settings yet")
				break
			case "My Products":
				alert("Your products are not linked to your account yet")
				break
			case "Admin":
				alert("No admin page set up yet")
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

	const guestMenuStrings = ["Home", "See A Message"]
	const guestMenuItems = (
		<>
			{guestMenuStrings.map((text) => (
				<ListItem key={text} disablePadding>
					<ListItemButton onClick={() => handleMenuItemClick(text)}>
						<ListItemIcon>
							{text === "Home" ? (
								<Home />
							) : (
								text === "See A Message" && <Message />
							)}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</>
	)

	const userMenuStrings = ["My Products", "Settings", "Logout"]
	loggedIn && userInfo.role === "admin" && userMenuStrings.splice(0, 0, "Admin")
	const userMenuItems = (
		<>
			{userMenuStrings.map((text) => (
				<ListItem key={text} disablePadding>
					<ListItemButton onClick={() => handleMenuItemClick(text)}>
						<ListItemIcon>
							{text === "Logout" ? (
								<Logout />
							) : text === "Settings" ? (
								<Settings />
							) : text === "My Products" ? (
								<Inventory2 />
							) : (
								text === "Admin" && <AdminPanelSettings />
							)}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</>
	)

	const DrawerList = (
		<Box sx={{ pl: 1, width: 250 }} role="presentation">
			<List>
				<ListItem>
					<br />
					<br />
				</ListItem>
				<ListItem key="themeSwitch" disablePadding sx={{ alignSelf: "center" }}>
					<ThemeSwitchWithFunctionality />
				</ListItem>
				{loggedIn ? userMenuItems : guestMenuItems}
				{!loggedIn && (
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
					theme === "dark" ? "2px solid lightgray" : "2px solid black",
				backgroundColor: theme === "dark" ? "black" : "lightgray",
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
			{loggedIn ? (
				<img
					src={userInfo?.image}
					alt="user-image"
					className="user-image"
					loading="lazy"
					style={{
						margin: "5px",
						borderBottomLeftRadius: "5px",
						borderTopLeftRadius: "5px",
					}}
				/>
			) : null}
			<Drawer open={open} onClose={toggleDrawer(false)} anchor="left">
				{DrawerList}
			</Drawer>
		</Box>
	)
}

export default NavDrawer
