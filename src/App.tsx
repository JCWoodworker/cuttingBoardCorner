import { Routes, Route } from "react-router-dom"
import "./App.scss"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import BoardData from "./pages/BoardData"

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
				<Route path="/boards/:boardId" element={<BoardData />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</ThemeProvider>
	)
}
export default App
