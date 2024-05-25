import React, { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { Requests } from "../requests/Requests"

import { RandomDrinkData } from "./CocktailGenerator"
import ImageContainer from "./ImageContainer"

type Props = {
	randomDrinkData: RandomDrinkData
}

type DrinkDetailsType = {
	idDrink: string
	strCategory: string
	strGlass: string
	strIngredients: string[]
	strMeasures: string[]
	strInstructions: string
}

const RandomDrinkShow: React.FC<Props> = ({ randomDrinkData }) => {
	const [drinkDetails, setDrinkDetails] = useState<DrinkDetailsType | null>(
		null
	)

	const fetchIngredients = async (drinkId: string) => {
		try {
			const response = await Requests.GET(
				`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drinkId}`,
				true,
				false
			)
			const drinkDetailResponse = await response.data
			const drinkDetailList = drinkDetailResponse.drinks[0]

			const keys = Object.keys(drinkDetailList)

			const ingredientsList: string[] = []
			const measuresList: string[] = []

			for (const key of keys) {
				if (key.startsWith("strIngredient") && drinkDetailList[key] !== null) {
					ingredientsList.push(drinkDetailList[key])
				} else if (
					key.startsWith("strMeasure") &&
					drinkDetailList[key] !== null
				) {
					measuresList.push(drinkDetailList[key])
				}
			}

			const finalDrinkData: DrinkDetailsType = {
				idDrink: drinkDetailList.idDrink,
				strCategory: drinkDetailList.strCategory,
				strGlass: drinkDetailList.strGlass,
				strInstructions: drinkDetailList.strInstructions,
				strIngredients: ingredientsList,
				strMeasures: measuresList,
			}

			setDrinkDetails(finalDrinkData)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchIngredients(randomDrinkData?.idDrink)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [randomDrinkData])

	return (
		<Box>
			<Typography variant="h5">
				<strong>{`${
					randomDrinkData?.strDrink || "Loading Drink Info..."
				}`}</strong>
			</Typography>
			<ul style={{ listStyle: "none", padding: 0 }}>
				<li>Type: {drinkDetails?.strCategory}</li>
				<li>Served In: {drinkDetails?.strGlass}</li>
			</ul>
			<ImageContainer
				url={randomDrinkData?.strDrinkThumb}
				description={randomDrinkData?.strDrink}
				type="random-drink"
			/>
			<ul style={{ listStyle: "none", padding: 0 }}>
				{drinkDetails?.strIngredients.map((ingredient, index) => (
					<li key={index}>
						{ingredient}: {drinkDetails?.strMeasures[index]}
					</li>
				))}
			</ul>
			<p>{drinkDetails?.strInstructions}</p>
		</Box>
	)
}

export default RandomDrinkShow
