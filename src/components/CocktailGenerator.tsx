import React, { useState, useEffect } from "react"
import { Typography } from "@mui/material"
import axios from "axios"
import RandomDrinkShow from "./RandomDrinkShow"

export type RandomDrinkData = {
	idDrink: string
	strDrink: string
	strDrinkThumb: string
}

type DrinkList = RandomDrinkData[]

const CocktailGenerator: React.FC = () => {
	const [drinkList, setDrinkList] = useState<DrinkList>([])
	// const [imageIsLoading, setImageIsLoading] = useState(true)
	const [drinkError, setDrinkError] = useState<boolean>(false)

	const fetchRandomDrink = async () => {
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
		fetchRandomDrink()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// const fetchRandomDrinkIngredients = async (drinkId: string) => {
	// 	try {
	// 		const response = await axios.get(
	// 			`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drinkId}`
	// 		)
	// 		const randomDrinkIngredients = await response.data
	// 		console.log(randomDrinkIngredients)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	const randomDrinkData: RandomDrinkData = drinkList
		? drinkList[Math.floor(Math.random() * drinkList.length)]
		: { idDrink: "", strDrink: "", strDrinkThumb: "" }

	let randomDrinkShow
  if (!drinkList) {
    randomDrinkShow = <Typography variant="h5">Loading Drinks...</Typography>
  }
  if (drinkError) {
    randomDrinkShow = <Typography variant="h5">Error: No Cocktails Found</Typography>
  }
  randomDrinkShow = <RandomDrinkShow randomDrinkData={randomDrinkData} />

		// useEffect(() => {
		// 	fetchRandomDrinkIngredients()
		// 	// eslint-disable-next-line react-hooks/exhaustive-deps
		// }, [randomDrinkData])

		return (
			<div>
        {randomDrinkShow}
				{/* <Typography variant="subtitle1" sx={{ mt: 4 }}>
					For now, here's a random cocktail <br />
					<strong>"{randomDrinkData?.strDrink}"</strong>
				</Typography>
				<img
					src={randomDrinkData?.strDrinkThumb}
					className="cutting-board-image"
					onLoad={() => setImageIsLoading(false)}
					style={{ display: imageIsLoading ? "none" : "block" }}
				></img>
				<Typography variant="subtitle2">
					Ingredients and instructions coming soon!
				</Typography> */}
			</div>
		)
}

export default CocktailGenerator
