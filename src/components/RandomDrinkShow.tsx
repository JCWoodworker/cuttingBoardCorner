import { Box } from "@mui/material"
import { RandomDrinkData } from "./CocktailGenerator"

type Props = {
	randomDrinkData: RandomDrinkData
}

const RandomDrinkShow: React.FC<Props> = ({ randomDrinkData }) => {
	return (
		<Box>
			<p>In the meantime, here's a random drink!</p>
      <p><strong>{`--- ${randomDrinkData.strDrink} ---`}</strong></p>
			<img
				src={randomDrinkData.strDrinkThumb}
				className="cutting-board-image"
			></img>
		</Box>
	)
}

export default RandomDrinkShow
