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
	MenuRounded,
} from "@mui/icons-material"
import ThemeSwitchWithFunctionality from "../components/ThemeSwitchWithFunctionality"
import GoogleOAuth from "../auth/GoogleOAuth"
import { useNavigate } from "react-router-dom"
import { clearLocalStorage } from "../utils/clearLocalStorage"
import useThemeContext from "../hooks/use-theme-context"
import useUserDataContext from "../hooks/use-user-data-context"

type MenuTextAndIcon = [text: string, icon: JSX.Element][]

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
				navigate("/user-settings")
				break
			case "My Products":
				navigate("/my-products")
				break
			case "Admin":
				navigate("/admin")
				break
			case "See A Message":
				alert("This is a message")
				break
			case "Home":
				navigate("/")
				window.location.reload()
				break
			default:
				setOpen(false)
				break
		}
		setOpen(false)
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

	const guestMenuStrings: MenuTextAndIcon = [
		["Home", <Home />],
		["See A Message", <Message />],
	]
	const guestMenuItems = (
		<>
			{guestMenuStrings.map(([text, icon]) => (
				<ListItemButton key={text} onClick={() => handleMenuItemClick(text)}>
					<ListItem disablePadding>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				</ListItemButton>
			))}
		</>
	)

	const userMenuStrings: MenuTextAndIcon = [
		["Home", <Home />],
		["My Products", <Inventory2 />],
		["Settings", <Settings />],
		["Logout", <Logout />],
	]
	loggedIn &&
		userInfo.role === "admin" &&
		userMenuStrings.splice(1, 0, ["Admin", <AdminPanelSettings />])
	const userMenuItems = (
		<>
			{userMenuStrings.map(([text, icon]) => (
				<ListItem key={text} disablePadding>
					<ListItemButton onClick={() => handleMenuItemClick(text)}>
						<ListItemIcon>{icon}</ListItemIcon>
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

	const userImage =
		userInfo?.image ??
		`https://cdn.vectorstock.com/i/500p/01/70/punk-skull-jacket-rock-vector-24920170.jpg`

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
				height: "4rem",
				borderBottom:
					theme === "dark" ? "2px solid lightgray" : "2px solid black",
				backgroundColor: theme === "dark" ? "black" : "lightgray",
				transform: visible ? "translateY(0)" : "translateY(-100%)",
				transition: "transform 0.3s ease",
				width: "100%",
			}}
		>
			<Button onClick={toggleDrawer(!open)}>
				<Typography variant="body1" sx={{ ml: "0.5rem" }}>
					<MenuRounded fontSize="large" />
				</Typography>
			</Button>
			<Typography
				variant="h6"
				sx={{ m: "1rem", fontWeight: "bolder", alignSelf: "center" }}
			>
				{loggedIn ? `Welcome ${userInfo?.firstName}!` : "Cutting Board Corner"}
			</Typography>
			{loggedIn ? (
				<img
					src={userImage}
					alt="user-image"
					className="user-image"
					loading="lazy"
					style={{
						margin: "8px",
						marginRight: "0.8rem",
						borderRadius: "50%",
						border:
							theme === "dark" ? "1px solid lightgray" : "2px solid black",
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
