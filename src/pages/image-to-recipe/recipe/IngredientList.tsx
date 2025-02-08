import { Box, Typography } from "@mui/material"

const IngredientList = ({ ingredients }: { ingredients: string[] }) => {
	return (
		<Box>
			{ingredients.map((ingredient) => (
				<Typography key={ingredient}>{ingredient}</Typography>
			))}
		</Box>
	)
}

export default IngredientList
