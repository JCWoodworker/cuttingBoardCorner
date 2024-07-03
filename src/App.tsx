import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import "./App.scss"

import { Box } from "@mui/system"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
	PaletteMode,
	CssBaseline,
	CircularProgress,
	Typography,
} from "@mui/material"

import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import UserHomePage from "./user-pages/UserHomePage"

import {
	LocalStorageElements,
	clearLocalStorage,
} from "./utils/clearLocalStorage"
import { Requests } from "./requests/Requests"

import useThemeContext from "./hooks/use-theme-context"
import useUserDataContext from "./hooks/use-user-data-context"

import AdminPage from "./user-pages/admin/AdminPage"
import ProductIndex from "./user-pages/admin/product-components/ProductIndex"
import AddNewProduct from "./user-pages/admin/product-components/AddNewProduct"

import UserSettings from "./user-pages/UserSettings"
import UserProducts from "./user-pages/UserProducts"
import ProductDataIndex from "./pages/products/ProductDataIndex"
import UserIndex from "./user-pages/admin/user-components/UserIndex"
import CaringForYourBoard from "./pages/CaringForYourBoard"

const App = () => {
	const { theme, setTheme } = useThemeContext()
	const { setUserInfo, loggedIn, setLoggedIn } = useUserDataContext()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const storedTheme: string | null = localStorage.getItem(
			LocalStorageElements.THEME
		)
		if (!storedTheme) {
			setTheme("dark")
		} else {
			setTheme(storedTheme as PaletteMode)
		}
	}, [setTheme])

	const userSelectedTheme = createTheme({
		palette: {
			mode: theme as PaletteMode,
		},
	})

	const checkForPersistedUser = async () => {
		const persistedUser = localStorage.getItem(LocalStorageElements.PERSIST)
		const persistedRefreshToken = localStorage.getItem(
			LocalStorageElements.REFRESH_TOKEN
		)
		if (persistedUser && persistedRefreshToken) {
			try {
				const refreshedUser = await Requests.POST(
					"/authentication/refresh-tokens",
					{ refreshToken: persistedRefreshToken },
					false
				)
				const tokens = refreshedUser.data.tokens
				if (refreshedUser.status !== 200) {
					clearLocalStorage(
						LocalStorageElements.ACCESS_TOKEN,
						LocalStorageElements.REFRESH_TOKEN,
						LocalStorageElements.PERSIST
					)
					return false
				}

				clearLocalStorage(
					LocalStorageElements.ACCESS_TOKEN,
					LocalStorageElements.REFRESH_TOKEN,
					LocalStorageElements.PERSIST
				)
				localStorage.setItem(
					LocalStorageElements.ACCESS_TOKEN,
					tokens.accessToken
				)
				localStorage.setItem(
					LocalStorageElements.REFRESH_TOKEN,
					tokens.refreshToken
				)
				localStorage.setItem(LocalStorageElements.PERSIST, "true")

				setUserInfo({
					firstName: refreshedUser.data.userInfo.firstName,
					lastName: refreshedUser.data.userInfo.lastName,
					image: refreshedUser.data.userInfo.imageUrl,
					role: refreshedUser.data.userInfo.role,
				})
				setLoggedIn(true)
				setIsLoading(false)
			} catch (error) {
				clearLocalStorage(
					LocalStorageElements.ACCESS_TOKEN,
					LocalStorageElements.REFRESH_TOKEN,
					LocalStorageElements.PERSIST
				)
				console.log(error)
			}
		} else {
			clearLocalStorage(
				LocalStorageElements.ACCESS_TOKEN,
				LocalStorageElements.REFRESH_TOKEN,
				LocalStorageElements.PERSIST
			)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		checkForPersistedUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sharedRoutes = (
		<>
			<Route path="/care-and-maintenance" element={<CaringForYourBoard />} />
			<Route path="/products/:productId" element={<ProductDataIndex />} />
		</>
	)

	const loggedInRoutes = (
		<>
			<Route path="/" element={<UserHomePage />} />
			<Route path="/user-settings" element={<UserSettings />} />
			<Route path="/my-products" element={<UserProducts />} />

			<Route path="/admin">
				<Route index element={<AdminPage />} />
				<Route path="all-inventory" element={<ProductIndex />} />
				<Route path="all-users" element={<UserIndex />} />
				<Route path="add-new-product" element={<AddNewProduct />} />
			</Route>

			{sharedRoutes}
			<Route path="*" element={<NotFound />} />
		</>
	)
	const notLoggedInRoutes = (
		<>
			<Route path="/" element={<HomePage />} />
			{sharedRoutes}
			<Route path="*" element={<NotFound />} />
		</>
	)

	return (
		<ThemeProvider theme={userSelectedTheme}>
			<CssBaseline />
			{isLoading ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<CircularProgress />
					<Typography variant="body1">
						If this screen seems stuck here, please manually refresh your
						browser
					</Typography>
				</Box>
			) : (
				<Routes>{loggedIn ? loggedInRoutes : notLoggedInRoutes}</Routes>
			)}
		</ThemeProvider>
	)
}
export default App
