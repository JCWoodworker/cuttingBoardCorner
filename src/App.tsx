import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route, useNavigate } from "react-router-dom"
import "./App.scss"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import BoardDataIndex from "./pages/BoardDataIndex"
import CoasterDataIndex from "./pages/CoastersDataIndex"
import UserHomePage from "./user-pages/UserHomePage"
import { PaletteMode } from "@mui/material"
import useBaseUrl from "./utils/use-base-url"
import { clearLocalStorage } from "./utils/clearLocalStorage"

const App = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const [theme, setTheme] = useState<PaletteMode>("dark")
	const navigate = useNavigate()
	const baseUrl = useBaseUrl()

	useEffect(() => {
		const storedTheme: string | null = localStorage.getItem("theme")
		if (!storedTheme) {
			setTheme("dark")
		} else {
			setTheme(storedTheme as PaletteMode)
		}
	}, [])

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
				const tokens = refreshedUser.data
				if (refreshedUser.status !== 200) {
					clearLocalStorage("user", "accessToken", "refreshToken", "persist")
					navigate("/")
					return false
				}

				clearLocalStorage("user", "accessToken", "refreshToken", "persist")
				localStorage.setItem("user", "GOOGLE-USER")
				localStorage.setItem("accessToken", tokens.accessToken)
				localStorage.setItem("refreshToken", tokens.refreshToken)
				localStorage.setItem("persist", "true")

				setLoggedIn(true)
			} catch (error) {
				clearLocalStorage("user", "accessToken", "refreshToken", "persist")
				console.log(error)
			}
		} else {
			clearLocalStorage("user", "accessToken", "refreshToken", "persist")
			navigate("/")
		}
	}

	useEffect(() => {
		checkForPersistedUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loggedInRoutes = (
		<Route
			path="/"
			element={
				<UserHomePage
					loggedIn={loggedIn}
					setLoggedIn={setLoggedIn}
					themeProp={theme}
					setThemeProp={setTheme}
				/>
			}
		/>
	)
	const notLoggedInRoutes = (
		<>
			<Route
				path="/"
				element={
					<HomePage
						loggedIn={loggedIn}
						setLoggedIn={setLoggedIn}
						themeProp={theme}
						setThemeProp={setTheme}
					/>
				}
			/>
			<Route
				path="/boards/:boardId"
				element={
					<BoardDataIndex
						loggedIn={loggedIn}
						setLoggedIn={setLoggedIn}
						themeProp={theme}
						setThemeProp={setTheme}
					/>
				}
			/>
			<Route
				path="/coasters/:coasterId"
				element={
					<CoasterDataIndex
						loggedIn={loggedIn}
						setLoggedIn={setLoggedIn}
						themeProp={theme}
						setThemeProp={setTheme}
					/>
				}
			/>
			<Route path="*" element={<NotFound />} />
		</>
	)

	return (
		<ThemeProvider theme={userSelectedTheme}>
			<CssBaseline />
			<Routes>{loggedIn ? loggedInRoutes : notLoggedInRoutes}</Routes>
		</ThemeProvider>
	)
}
export default App
