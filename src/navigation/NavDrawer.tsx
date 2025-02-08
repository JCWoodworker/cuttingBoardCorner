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
	AdminPanelSettings,
	Camera,
	CloseRounded,
	Email,
	Handyman,
	Home,
	Inventory2,
	Link,
	Logout,
	MenuRounded,
	// Settings,
} from "@mui/icons-material"
import ThemeSwitchWithFunctionality from "../components/ThemeSwitchWithFunctionality"
import GoogleOAuth from "../auth/GoogleOAuth"
import { useNavigate } from "react-router-dom"
import {
	LocalStorageElements,
	clearLocalStorage,
} from "../utils/clearLocalStorage"
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

	enum MenuItemEnums {
		HOME = "Home",
		SETTINGS = "Settings",
		CONTACT_JC = "Contact JC",
		LOGOUT = "Logout",
		ADMIN = "Admin",
		MY_PRODUCTS = "My Products",
		CARE_MAINTENANCE = "Care & Maintenance",
		MY_LINKS = "My Links",
		IMAGE_TO_RECIPE = "Image to Recipe",
	}

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const handleMenuItemClick = (menuSelection: string) => {
		switch (menuSelection) {
			case MenuItemEnums.LOGOUT:
				clearLocalStorage(
					LocalStorageElements.ACCESS_TOKEN,
					LocalStorageElements.REFRESH_TOKEN,
					LocalStorageElements.PERSIST
				)
				setLoggedIn(false)
				navigate("/")
				break
			case MenuItemEnums.SETTINGS:
				navigate("/user-settings")
				break
			case MenuItemEnums.MY_PRODUCTS:
				navigate("/my-products")
				break
			case MenuItemEnums.MY_LINKS:
				navigate("/my-links")
				break
			case MenuItemEnums.CARE_MAINTENANCE:
				navigate("/care-and-maintenance")
				break
			case MenuItemEnums.ADMIN:
				navigate("/admin")
				break
			case MenuItemEnums.CONTACT_JC:
				window.open("https://rilocalwoodworks.com/contact")
				break
			case MenuItemEnums.HOME:
				navigate("/")
				window.location.reload()
				break
			case MenuItemEnums.IMAGE_TO_RECIPE:
				navigate("/image-to-recipe")
				break
			default:
				setOpen(false)
				break
		}
		setOpen(false)
	}

	useEffect(() => {
		// This hides the nav drawer when the user scrolls up
		const handleScroll = () => {
			const currentScrollPos = window.scrollY
			setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0)
			setPrevScrollPos(currentScrollPos)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [prevScrollPos])

	const guestMenuStrings: MenuTextAndIcon = [
		[MenuItemEnums.HOME, <Home />],
		[MenuItemEnums.CARE_MAINTENANCE, <Handyman />],
		[MenuItemEnums.IMAGE_TO_RECIPE, <Camera />],
		[MenuItemEnums.CONTACT_JC, <Email />],
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
		[MenuItemEnums.HOME, <Home />],
		[MenuItemEnums.MY_PRODUCTS, <Inventory2 />],
		[MenuItemEnums.MY_LINKS, <Link />],
		[MenuItemEnums.CARE_MAINTENANCE, <Handyman />],
		// [MenuItemEnums.SETTINGS, <Settings />],
		[MenuItemEnums.CONTACT_JC, <Email />],
		[MenuItemEnums.LOGOUT, <Logout />],
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
			<Button onClick={toggleDrawer(!open)} aria-label="navigation-menu-button">
				<Typography variant="body1" sx={{ ml: "0.5rem" }}>
					{open ? (
						<CloseRounded fontSize="large" />
					) : (
						<MenuRounded fontSize="large" />
					)}
				</Typography>
			</Button>
			<Typography
				variant="h6"
				sx={{ m: "1rem", fontWeight: "bolder", alignSelf: "center" }}
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
