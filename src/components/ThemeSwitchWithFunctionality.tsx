import useThemeContext from "../hooks/use-theme-context"
import { LocalStorageElements } from "../utils/clearLocalStorage"
import ThemeSwitch from "./ThemeSwitch"

const ThemeSwitchWithFunctionality: React.FC = () => {
	const { theme, setTheme } = useThemeContext()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleThemeChange = (event: any) => {
		setTheme(event.target.checked ? "dark" : "light")
		localStorage.setItem(
			LocalStorageElements.THEME,
			event.target.checked ? "dark" : "light"
		)
	}

	return (
		<ThemeSwitch
			checked={theme === "dark"}
			onChange={handleThemeChange}
			inputProps={{ "aria-label": "controlled" }}
		/>
	)
}

export default ThemeSwitchWithFunctionality
