import { useContext } from "react"
import { UserDataContext } from "../context/UserDataContextProvider"

const useUserDataContext = () => {
	const context = useContext(UserDataContext)
	if (!context) {
		throw new Error(
			"useThemeContext must be used within a ThemeContextProvider"
		)
	}
	return context
}

export default useUserDataContext