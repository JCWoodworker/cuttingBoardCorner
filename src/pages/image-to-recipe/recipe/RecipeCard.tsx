import { Box, Typography, Divider } from "@mui/material"
import IngredientList from "./IngredientList"
import InstructionList from "./InstructionList"

const RecipeCard = () => {
	const ingredientList = ["ingredient1", "ingredient2", "ingredient3"]
	const instructionList = ["instruction1", "instruction2", "instruction3"]

	return (
		<Box>
			<Typography variant="h6">Recipe Card</Typography>
			<Divider sx={{ margin: "1rem 0" }} />
			<IngredientList ingredients={ingredientList} />
			<Divider sx={{ margin: "1rem 0" }} />
			<InstructionList instructions={instructionList} />
		</Box>
	)
}

export default RecipeCard
