import ThemeSwitch from "./ThemeSwitch"
import { PaletteMode } from "@mui/material"

interface Props {
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
}

const ThemeSwitchWithFunctionality: React.FC<Props> = ({
	themeProp,
	setThemeProp,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleThemeChange = (event: any) => {
		setThemeProp(event.target.checked ? "dark" : "light")
		localStorage.setItem("theme", event.target.checked ? "dark" : "light");
	}

	return (
		<ThemeSwitch
			checked={themeProp === "dark"}
			onChange={handleThemeChange}
			inputProps={{ "aria-label": "controlled" }}
		/>
	)
}

export default ThemeSwitchWithFunctionality
