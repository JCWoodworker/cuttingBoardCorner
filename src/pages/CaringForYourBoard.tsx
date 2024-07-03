import { Typography, Divider, Box } from "@mui/material"
import InstructionList from "../components/InstructionList"
import { cleaningSteps, oilingSteps, doNotDo } from "../care_data/careSteps"
import MainComponentLayout from "../layouts/MainComponentLayout"
import NavigationButton from "../components/nav-button/NavigationButton"
import NavButtonLayout from "../components/nav-button/NavButtonLayout"

const CaringForYourBoard = () => {
	const videoId = "uof56capHnQ?si=GJ8c6BFy6p7qKwik"
	return (
		<MainComponentLayout>
			<NavButtonLayout>
				<NavigationButton path={"/"} text={"Home"} icon="back" />
			</NavButtonLayout>
			<Typography variant="h5">Caring For Your Board</Typography>
			<br />
			<Box
				sx={{
					width: "100%",
					maxWidth: "500px",
					margin: "auto",
					
				}}
			>
				<iframe
					src={`https://www.youtube.com/embed/${videoId}`}
					title="Caring for your cutting board"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					width="100%"
					height="100%"
					allowFullScreen
				/>
			</Box>
			<Divider sx={{ my: 2, width: "100%" }} />
			<InstructionList title="Cleaning" instructions={cleaningSteps} />
			<InstructionList title="Oiling" instructions={oilingSteps} />
			<InstructionList title="Do Not Do" instructions={doNotDo} />
		</MainComponentLayout>
	)
}

export default CaringForYourBoard
