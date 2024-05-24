import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material"
import EnterIdForm from "./EnterIdForm"
import NavDrawer from "../navigation/NavDrawer"
import { UserInfo } from "../App"

type Props = {
	loggedIn: boolean
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	userInfo: UserInfo
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}

const HomePage: React.FC<Props> = ({
	loggedIn,
	setLoggedIn,
	userInfo,
	setUserInfo,
}) => {
	const { state } = useLocation()
	const [selectionOptionState, setSelectionOptionState] = useState(
		state ? state.boardOrCoasterOption : "boards"
	)

	const coasterSelection = (
		<Box>
			<Typography variant="h2">My Coasters</Typography>
			<EnterIdForm inputType="coasters" />
		</Box>
	)

	const cuttingBoardSelection = (
		<Box>
			<Typography variant="h2">My Cutting Board</Typography>
			<EnterIdForm inputType="boards" />
		</Box>
	)

	return (
		<>
			<NavDrawer
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				userInfo={userInfo}
				setUserInfo={setUserInfo}
			/>
			<Box
				sx={{
					pt: 2,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
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
				{/* <Box sx={{ my: 4 }}>
					<GoogleOAuth setLoggedIn={setLoggedIn} />
				</Box> */}
			</Box>
		</>
	)
}

export default HomePage
