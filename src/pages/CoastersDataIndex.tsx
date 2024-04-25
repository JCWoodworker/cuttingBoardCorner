import React, { useState, useMemo, useEffect } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import { getBackendUrl } from "../utils/getBackendUrl"

import CoasterDataShow from "./CoasterDataShow"
import NotFound from "./NotFound"
import { Box } from "@mui/material"

export interface RandomDrinkData {
	idDrink: number
	strDrink: string
	strDrinkThumb: string
}

const CoasterDataIndex: React.FC = () => {
	const { coasterId } = useParams()

	const [coasterData, setCoasterData] = useState({})
	const [error, setError] = useState<boolean>(false)

	const [randomDrinkData, setRandomDrinkData] = useState<
		RandomDrinkData | undefined
	>(undefined)
	const [drinkError, setDrinkError] = useState<boolean>(false)

	const fetchRandomBeer = async () => {
		try {
			const response = await axios.get(
				"https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
			)
			const randomDrink = await response.data.drinks[
				Math.floor(Math.random() * 100)
			]
			setRandomDrinkData(randomDrink)
		} catch (error) {
			setDrinkError(true)
		}
	}

	useMemo(() => {
		const fetchCoasterData = async () => {
			try {
				const urlPrefix = await getBackendUrl()
				const response = await axios.get(
					`${urlPrefix}/subapps/mycuttingboard/coasters/${coasterId}`
				)
				if (response.status === 200) {
					const data = await response.data
					setCoasterData(data)
				} else {
					setError(true)
				}
			} catch (error) {
				setError(true)
			}
		}

		fetchCoasterData()
	}, [coasterId])

	useEffect(() => {
		fetchRandomBeer()
	}, [])

	return (
		<Box
			sx={{
				margin: "0 auto",
				display: "grid",
				placeItems: "center",
				textAlign: "center",
				width: {
					xs: 300,
					md: 500,
				},
			}}
		>
			{error ? (
				<NotFound />
			) : (
				<CoasterDataShow
					coasterData={coasterData}
					randomDrinkData={randomDrinkData}
					drinkError={drinkError}
				/>
			)}{" "}
		</Box>
	)
}

export default CoasterDataIndex
