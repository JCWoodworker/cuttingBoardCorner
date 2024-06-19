import { PaletteMode } from "@mui/material"
import React, { createContext, useEffect, useState } from "react"
import { LocalStorageElements } from "../utils/clearLocalStorage"

type ThemeContextProviderProps = {
	children: React.ReactNode
}
export type ThemeContext = {
	theme: PaletteMode
	setTheme: React.Dispatch<React.SetStateAction<PaletteMode>>
}

export const ThemeContext = createContext<ThemeContext | null>(null)

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
	children,
}) => {
	const [theme, setTheme] = useState<PaletteMode>("dark")

	useEffect(() => {
		const storedTheme: string | null = localStorage.getItem(
			LocalStorageElements.THEME
		)
		if (!storedTheme) {
			setTheme("dark")
		} else {
			setTheme(storedTheme as PaletteMode)
		}
	}, [])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider
