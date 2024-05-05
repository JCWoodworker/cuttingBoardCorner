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
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 1 }}>
						<Button
							sx={{
								mb: 4,
								p: 2,
								border: "1px solid rgba(121, 121, 121, 0.7)",
								minWidth: "200px",
								minHeight: "75px",
							}}
							onClick={() => setSelectionOptionState("boards")}
						>
							Select A Board By ID
						</Button>
						<Button
							sx={{
								mb: 4,
								p: 2,
								border: "1px solid rgba(121, 121, 121, 0.7)",
								minWidth: "200px",
								minHeight: "75px",
							}}
							onClick={() => setSelectionOptionState("coasters")}
						>
							Select A Coaster By ID
						</Button>
						</Box>
					{selectionOptionState === "boards"
						? cuttingBoardSelection
						: selectionOptionState === "coasters"
						? coasterSelection
						: null}
				</Box>
			</Box>
		</>
	)
}

export default HomePage
