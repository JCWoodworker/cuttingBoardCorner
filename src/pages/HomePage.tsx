import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material"
import EnterIdForm from "./EnterIdForm"

const HomePage: React.FC = () => {
	const { state } = useLocation()
	
	const [selectionOptionState, setSelectionOptionState] = useState(
		state ? state.boardOrCoasterOption : "boards"
	)

	const coasterSelection = (
		<div>
			<Typography variant="h2">My Coasters</Typography>
			<EnterIdForm inputType="coasters" />
		</div>
	)

	const cuttingBoardSelection = (
		<div>
			<Typography variant="h2">My Cutting Board</Typography>
			<EnterIdForm inputType="boards" />
		</div>
	)

	return (
		<>
			<Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
				<div>
					<div>
						<Button
							sx={{
								mr: 2,
								mb: 4,
								p: 2,
								border: "1px solid rgba(121, 121, 121, 0.7)",
							}}
							onClick={() => setSelectionOptionState("boards")}
						>
							Select A Board By ID
						</Button>
						<Button
							sx={{
								ml: 2,
								mb: 4,
								p: 2,
								border: "1px solid rgba(121, 121, 121, 0.7)",
							}}
							onClick={() => setSelectionOptionState("coasters")}
						>
							Select A Coaster By ID
						</Button>
					</div>
					{selectionOptionState === "boards"
						? cuttingBoardSelection
						: selectionOptionState === "coasters"
						? coasterSelection
						: null}
				</div>
			</Box>
		</>
	)
}

export default HomePage
