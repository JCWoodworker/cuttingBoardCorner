import useUserDataContext from "../hooks/use-user-data-context"
import UserRoleSwapButton from "./admin/user-components/UserRoleSwapButton"
import RedundantNavButtonLayout, {
	ButtonOptionType,
} from "../navigation/RedundantNavButtonLayout"

import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"
import { Box, Typography } from "@mui/material"
// import { useNavigate } from "react-router-dom"
const UserHomePage: React.FC = () => {
	const { userInfo } = useUserDataContext()
	const buttonOptionArray: ButtonOptionType[] = ["myProducts", "myLinks"]
	// const navigate = useNavigate()

	userInfo.role === "admin" && buttonOptionArray.splice(0, 0, "admin")

	const userHomeMessageList = [
		`The "My Products" link will show you all the products you own.`,
		`Clicking "My Links" takes you to a page where you can save and view links to all your favorite recipes.`,
	]

	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={buttonOptionArray} />
				<ComponentTitle text="Welcome!" />
				<Box
					sx={{
						m: "1rem auto",
						maxWidth: {
							xs: "95%",
							sm: "800px",
						},
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: 2,
					}}
				>
					{userHomeMessageList.map((message) => (
						<Typography
							key={message}
							variant="body1"
							sx={{
								padding: "1rem",
								fontSize: "1.1rem",
								borderRadius: "0.5rem",
								backgroundColor: "rgba(33, 125, 255, 0.1)",
								minWidth: { xs: "100%", md: "70%" },
							}}
						>
							{message}
						</Typography>
					))}
				</Box>
				<UserRoleSwapButton />
			</MainComponentLayout>
		</>
	)
}

export default UserHomePage
