import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
import "./App.scss"

import { Box } from "@mui/system"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { PaletteMode, CssBaseline, CircularProgress } from "@mui/material"

import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import BoardDataIndex from "./pages/BoardDataIndex"
import CoasterDataIndex from "./pages/CoastersDataIndex"
import UserHomePage from "./user-pages/UserHomePage"

import { clearLocalStorage } from "./utils/clearLocalStorage"

import useBaseUrl from "./utils/use-base-url"
import useThemeContext from "./custom_hooks/use-theme-context"
import useUserDataContext from "./custom_hooks/use-user-data-context"

const App = () => {
	const { theme, setTheme } = useThemeContext()
	const { setUserInfo, loggedIn, setLoggedIn } = useUserDataContext()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const navigate = useNavigate()
	const baseUrl = useBaseUrl()

	useEffect(() => {
		const storedTheme: string | null = localStorage.getItem("theme")
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
		const persistedUser = localStorage.getItem("persist")
		const persistedRefreshToken = localStorage.getItem("refreshToken")
		if (persistedUser && persistedRefreshToken) {
			try {
				const refreshToken = localStorage.getItem("refreshToken")
				const response = await axios.post(
					`${baseUrl}/authentication/refresh-tokens`,
					{ refreshToken: refreshToken }
				)
				const refreshedUser = await response
				const tokens = refreshedUser.data.tokens
				if (refreshedUser.status !== 200) {
					clearLocalStorage("accessToken", "refreshToken", "persist")
					navigate("/")
					return false
				}

				clearLocalStorage("accessToken", "refreshToken", "persist")
				localStorage.setItem("accessToken", tokens.accessToken)
				localStorage.setItem("refreshToken", tokens.refreshToken)
				localStorage.setItem("persist", "true")

				setUserInfo({
					firstName: refreshedUser.data.userInfo.firstName,
					lastName: refreshedUser.data.userInfo.lastName,
					image: refreshedUser.data.userInfo.imageUrl,
					role: refreshedUser.data.userInfo.role,
				})
				setLoggedIn(true)
				setIsLoading(false)
			} catch (error) {
				clearLocalStorage("accessToken", "refreshToken", "persist")
				console.log(error)
			}
		} else {
			clearLocalStorage("accessToken", "refreshToken", "persist")
			navigate("/")
			setIsLoading(false)
		}
	}

	useEffect(() => {
		checkForPersistedUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loggedInRoutes = (
		<>
			<Route path="/" element={<UserHomePage />} />
			<Route path="*" element={<NotFound />} />
		</>
	)
	const notLoggedInRoutes = (
		<>
			<Route path="/" element={<HomePage />} />
			<Route path="/boards/:boardId" element={<BoardDataIndex />} />
			<Route path="/coasters/:coasterId" element={<CoasterDataIndex />} />
			<Route path="*" element={<NotFound />} />
		</>
	)

	// TODO: THESE RETURN STATEMENTS ARE REPETITIVE ... PLEASE CONSOLIDATE THEM INTO ONE RETURN
	if (isLoading) {
		return (
			<ThemeProvider theme={userSelectedTheme}>
				<CssBaseline />
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<CircularProgress />
				</Box>
			</ThemeProvider>
		)
	}

	return (
		<ThemeProvider theme={userSelectedTheme}>
			<CssBaseline />
			<Routes>{loggedIn ? loggedInRoutes : notLoggedInRoutes}</Routes>
		</ThemeProvider>
	)
}
export default App
