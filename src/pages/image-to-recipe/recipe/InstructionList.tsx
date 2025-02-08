import { Box, Typography } from "@mui/material"

const InstructionList = ({ instructions }: { instructions: string[] }) => {
	return (
		<Box>
			{instructions.map((instruction) => (
				<Typography key={instruction}>{instruction}</Typography>
			))}
		</Box>
	)
}

export default InstructionList
