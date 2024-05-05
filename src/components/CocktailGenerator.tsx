import React, { useState } from "react"
import { Typography } from "@mui/material"

type Props = {
	randomDrinkData: RandomDrinkData | undefined
	drinkError: boolean
}

type RandomDrinkData = {
	idDrink: number
	strDrink: string
	strDrinkThumb: string
}

const CocktailGenerator: React.FC<Props> = ({
	randomDrinkData,
	drinkError,
}) => {
  const [isLoading, setIsLoading] = useState(true)

	return (
		<div>
      {!drinkError && (
				<>
					<Typography variant="subtitle1" sx={{ mt: 4 }}>
						For now, here's a random cocktail <br />
						<strong>"{randomDrinkData?.strDrink}"</strong>
					</Typography>
					<img
						src={randomDrinkData?.strDrinkThumb}
						className="cutting-board-image"
						onLoad={() => setIsLoading(false)}
						style={{ display: isLoading ? "none" : "block" }}
					></img>
					<Typography variant="subtitle2">
						Ingredients and instructions coming soon!
					</Typography>
				</>
			)}
		</div>
	)
}

export default CocktailGenerator
