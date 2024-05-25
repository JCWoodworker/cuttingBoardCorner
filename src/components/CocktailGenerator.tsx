import React, { useState, useEffect } from "react"
import axios from "axios"
import { Button, Divider, Typography } from "@mui/material"

import RandomDrinkShow from "./RandomDrinkShow"

export type RandomDrinkData = {
	idDrink: string
	strDrink: string
	strDrinkThumb: string
}

type DrinkList = RandomDrinkData[]

const CocktailGenerator: React.FC = () => {
	const [drinkList, setDrinkList] = useState<DrinkList>([])
	const [drinkError, setDrinkError] = useState<boolean>(false)
	const [randomDrinkShow, setRandomDrinkShow] = useState<JSX.Element | null>(
		null
	)
	// const [randomDrinkData, setRandomDrinkData] = useState<RandomDrinkData | null>(null)

	const fetchDrinkList = async () => {
		try {
			const response = await axios.get(
				"https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic"
			)
			const drinks = await response.data.drinks
			setDrinkList(drinks)
		} catch (error) {
			setDrinkError(true)
		}
	}
	useEffect(() => {
		fetchDrinkList()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const generateRandomCocktail = () => {
		const randomDrinkData: RandomDrinkData = drinkList
			? drinkList[Math.floor(Math.random() * drinkList.length)]
			: { idDrink: "", strDrink: "", strDrinkThumb: "" }

		let randomDrinkShow
		if (!drinkList) {
			randomDrinkShow = <Typography variant="h5">Loading Drinks...</Typography>
		}
		if (drinkError) {
			randomDrinkShow = (
				<Typography variant="h5">Error: No Cocktails Found</Typography>
			)
		}
		randomDrinkShow = <RandomDrinkShow randomDrinkData={randomDrinkData} />

		return randomDrinkShow
	}

	return (
		<>
			<Button
				sx={{
					m: 2,
					px: 3,
					width: "max-content",
					height: "50px",
					border: "1px solid rgb(121, 121, 121)",
				}}
				onClick={() => setRandomDrinkShow(generateRandomCocktail())}
			>
				Get A Random Cocktail
			</Button>
			{randomDrinkShow}
			<Divider sx={{ my: 2, width: "100%" }} />
		</>
	)
}

export default CocktailGenerator
