import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import "./App.scss"

import { Box } from "@mui/system"
import {
	PaletteMode,
	CssBaseline,
	CircularProgress,
	Typography,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import ProductDataIndex from "./pages/products/ProductDataIndex"
import CaringForYourBoard from "./pages/CaringForYourBoard"

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

import UserHomePage from "./user-pages/UserHomePage"
import UserIndex from "./user-pages/admin/user-components/UserIndex"
import UserProducts from "./user-pages/UserProducts"
import UserLinks from "./user-pages/admin/user-links/UserLinks"
import UserSettings from "./user-pages/UserSettings"
import ImageToRecipeHome from "./pages/image-to-recipe/ImageToRecipeHome"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"


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

					// Delete these console logs once you've found the infinite loading bug
					console.log('refresh status is NOT 200')
					console.log('Clearing local storage and returning false')
					console.error(`IF THIS ERROR IS THE LAST THING IN THE CONSOLE, WE'VE FOUND THE BUG!!`)
					
					clearLocalStorage(
						LocalStorageElements.ACCESS_TOKEN,
						LocalStorageElements.REFRESH_TOKEN,
						LocalStorageElements.PERSIST
					)
					return false
				}

				// Delete these console logs once you've found the infinite loading bug
				console.log('Refresh Status IS 200')
				console.log('Clearing current local storage and setting new tokens')

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

				// Delete these console logs once you've found the infinite loading bug
				console.log('Setting new user info in local storage')
				
				setUserInfo({
					firstName: refreshedUser.data.userInfo.firstName,
					lastName: refreshedUser.data.userInfo.lastName,
					image: refreshedUser.data.userInfo.imageUrl,
					role: refreshedUser.data.userInfo.role,
				})

				// Delete these console logs once you've found the infinite loading bug
				console.log('Setting loggedIn to true and isLoading to false')

				setLoggedIn(true)
				setIsLoading(false)
			} catch (error) {
				// Delete these console logs once you've found the infinite loading bug
				console.error('WE ARE IN THE ERROR CATCH!!')

				clearLocalStorage(
					LocalStorageElements.ACCESS_TOKEN,
					LocalStorageElements.REFRESH_TOKEN,
					LocalStorageElements.PERSIST
				)
				console.log(error)
			}
		} else {
			// Delete these console logs once you've found the infinite loading bug
			console.error(`If NOT persistedUser and/or NOT persistedRefreshToken`)

			clearLocalStorage(
				LocalStorageElements.ACCESS_TOKEN,
				LocalStorageElements.REFRESH_TOKEN,
				LocalStorageElements.PERSIST
			)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		// Delete these console logs once you've found the infinite loading bug
		console.log(`In the useEffect running checkForPersistedUser`)

		checkForPersistedUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sharedRoutes = (
		<>
			<Route path="/care-and-maintenance" element={<CaringForYourBoard />} />
			<Route path="/products/:productId" element={<ProductDataIndex />} />
			<Route path="/image-to-recipe" element={<ImageToRecipeHome />} />
			<Route path="/privacy-policy" element={<PrivacyPolicy />} />
			<Route path="/terms-of-service" element={<TermsOfService />} />
		</>
	)

	const loggedInRoutes = (
		<>
			<Route path="/" element={<UserHomePage />} />
			<Route path="/user-settings" element={<UserSettings />} />
			<Route path="/my-products" element={<UserProducts />} />
			<Route path="/my-links" element={<UserLinks />} />

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
