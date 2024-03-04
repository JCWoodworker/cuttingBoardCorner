import { Typography, Box, Link } from "@mui/material"
import InstructionList from "../components/InstructionList"
import { cleaningSteps, oilingSteps, doNotDo } from "../care_data/careSteps"

const CaringForYourBoard = () => {
	return (
		<Box sx={{ my: 2, textAlign: "center" }}>
			<br />
			<Typography variant="h5">Caring For Your Board</Typography>
			<br />
			<Link
				sx={{ fontWeight: "bold", textAlign: "center" }}
				href="https://youtu.be/nh0Ysgq8F20?si=kJEzUMX5bS34gFRr"
			>
				Click here to watch a Youtube video about caring for your board if you
				want to skip reading all the steps - featuring Ryan at West Coast
				Cutting Boards!
			</Link>
			<br />
			<br />
			<hr />
			<InstructionList title="Cleaning" instructions={cleaningSteps} />
			<InstructionList title="Oiling" instructions={oilingSteps} />
			<InstructionList title="Do Not Do" instructions={doNotDo} />
		</Box>
	)
}

export default CaringForYourBoard
