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
			<HomePage />
		</ThemeProvider>
	)
}
export default App
