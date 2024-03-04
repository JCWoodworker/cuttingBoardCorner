import { List, ListItem, Typography, Box } from "@mui/material"

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
		<Box
			sx={{
				my: 4,
				textAlign: "center",
				borderBottom: "1px solid rgba(121, 121, 121, 0.7)",
			}}
		>
			<Typography variant="h6">{title}</Typography>
			<List
				sx={{
					mx: "auto",
					textAlign: "center",
					width: "80%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{instructions.map((instruction) => (
					<ListItem
						sx={{
							justifyContent: "center",
							textAlign: "center",
						}}
						key={instruction.step}
					>
						{instruction.text}
					</ListItem>
				))}
			</List>
		</Box>
	)
}

export default InstructionList
