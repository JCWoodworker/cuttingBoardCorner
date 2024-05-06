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

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})

const App = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const navigate = useNavigate()

	const checkForPersistedUser = async () => {
		const persistedUser = localStorage.getItem("persist")
		const persistedRefreshToken = localStorage.getItem("refreshToken")
		if (persistedUser && persistedRefreshToken) {
			try {
				const refreshToken = localStorage.getItem("refreshToken")
				const response = await axios.post(
					"http://localhost:3000/api/v1/authentication/refresh-tokens",
					{ refreshToken: refreshToken }
				)
				const refreshedUser = await response
				const tokens = refreshedUser.data
				if (refreshedUser.status !== 200) {
					localStorage.clear()
					navigate("/")
					return false
				}

				localStorage.clear()
				localStorage.setItem("user", "GOOGLE-USER")
				localStorage.setItem("accessToken", tokens.accessToken)
				localStorage.setItem("refreshToken", tokens.refreshToken)
				localStorage.setItem("persist", "true")

				setLoggedIn(true)

			} catch (error) {
				localStorage.clear()
				console.log(error)
			}
		} else {
			localStorage.clear()
			navigate("/")
		}
	}

	useEffect(() => {
		checkForPersistedUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loggedInRoutes = <Route path="/" element={<UserHomePage />} />
	const notLoggedInRoutes = (
		<>
			<Route
				path="/"
				element={<HomePage setLoggedIn={setLoggedIn} />}
			/>
			<Route path="/boards/:boardId" element={<BoardDataIndex />} />
			<Route path="/coasters/:coasterId" element={<CoasterDataIndex />} />
			<Route path="*" element={<NotFound />} />
		</>
	)

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Routes>{loggedIn ? loggedInRoutes : notLoggedInRoutes}</Routes>
		</ThemeProvider>
	)
}
export default App
