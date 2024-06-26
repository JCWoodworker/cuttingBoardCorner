// import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { BrowserRouter } from "react-router-dom"
import ThemeContextProvider from "./context/ThemeContextProvider.tsx"
import UserDataContextProvider from "./context/UserDataContextProvider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<BrowserRouter>
		<ThemeContextProvider>
			<UserDataContextProvider>
				<App />
			</UserDataContextProvider>
		</ThemeContextProvider>
	</BrowserRouter>
	// </React.StrictMode>
)
