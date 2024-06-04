import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Box, Button } from "@mui/material"
import EnterIdForm from "./EnterIdForm"
import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"

const HomePage: React.FC = () => {
	const { state } = useLocation()
	const [selectionOptionState, setSelectionOptionState] = useState(
		state ? state.boardOrCoasterOption : "boards"
	)

	const coasterSelection = (
		<Box>
			<ComponentTitle text="Coasters by ID" />
			<EnterIdForm inputType="coasters" />
		</Box>
	)

	const cuttingBoardSelection = (
		<Box>
			<ComponentTitle text="Boards by ID" />
			<EnterIdForm inputType="boards" />
		</Box>
	)

	return (
		<>
			<MainComponentLayout>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						alignItems: "center",
						gap: 1,
					}}
				>
					<Button
						sx={{
							mb: 4,
							p: 2,
							border: "1px solid rgba(121, 121, 121, 0.7)",
							minWidth: "200px",
							minHeight: "75px",
						}}
						variant={
							selectionOptionState === "boards" ? "contained" : "outlined"
						}
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
						variant={
							selectionOptionState === "coasters" ? "contained" : "outlined"
						}
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
			</MainComponentLayout>
		</>
	)
}

export default HomePage
