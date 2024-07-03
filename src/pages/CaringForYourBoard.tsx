import { Typography, Divider } from "@mui/material"
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
			<br />
			<Typography variant="h5">Caring For Your Board</Typography>
			<br />
			<iframe
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<br />
			<br />
			<Divider sx={{ my: 2, width: "100%" }} />
			<InstructionList title="Cleaning" instructions={cleaningSteps} />
			<InstructionList title="Oiling" instructions={oilingSteps} />
			<InstructionList title="Do Not Do" instructions={doNotDo} />
		</MainComponentLayout>
	)
}

export default CaringForYourBoard
