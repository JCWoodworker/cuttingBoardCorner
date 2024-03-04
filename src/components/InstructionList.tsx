import { List, ListItem, Typography } from "@mui/material"

interface Instructions {
	step: number
	text: string
}

interface Props {
	title: string
	instructions: Instructions[]
}

const InstructionList: React.FC<Props> = ({ title, instructions }) => {
	return (
		<>
			<Typography variant="h6">{title}</Typography>
			<List
				sx={{
					textAlign: "center",
					width: "80%",
					mx: "auto",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{instructions.map((instruction) => (
					<ListItem
						sx={{ justifyContent: "center", textAlign: "center" }}
						key={instruction.step}
					>
						{instruction.text}
					</ListItem>
				))}
			</List>
		</>
	)
}

export default InstructionList
