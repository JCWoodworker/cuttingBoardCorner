import { Routes, Route } from "react-router-dom"
import "./App.scss"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import HomePage from "./pages/HomePage"

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</ThemeProvider>
	)
}
export default App
