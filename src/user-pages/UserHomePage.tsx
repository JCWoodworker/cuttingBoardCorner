import useUserDataContext from "../hooks/use-user-data-context"
import UserRoleSwapButton from "./admin/user-components/UserRoleSwapButton"
import RedundantNavButtonLayout, {
	ButtonOptionType,
} from "../navigation/RedundantNavButtonLayout"

import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"
import useThemeContext from "../hooks/use-theme-context"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
const UserHomePage: React.FC = () => {
	const { userInfo } = useUserDataContext()
	const buttonOptionArray: ButtonOptionType[] = ["myProducts", "myLinks"]
	const { theme } = useThemeContext()
	const navigate = useNavigate()

	userInfo.role === "admin" && buttonOptionArray.splice(0, 0, "admin")

	const userLinkList = [
		{
			path: "/",
			text: "Click here to see all the wood stuff you own",
		},
		{
			path: "/",
			text: "Click here to view and save links to recipes, cooking videos, and more!",
		},
	]
	const userLinkProps = {
		adminButtonStyle: {
			width: { xs: "90%", sm: "50%" },
			height: "5rem",
		},
		boxShadowClass:
			theme === "dark" ? "button-shadow-dark-mode" : "button-shadow-light-mode",
		variant: "outlined",
	}

	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={buttonOptionArray} />
				<ComponentTitle text="My Home" />
				<UserRoleSwapButton />
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
					{userLinkList.map((link) => (
						<Button
							key={link.path}
							className={userLinkProps.boxShadowClass}
							sx={userLinkProps.adminButtonStyle}
							variant={
								userLinkProps.variant as "outlined" | "contained" | "text"
							}
							// onClick={() => navigate(link.path)}
							onClick={() => alert('Not implemented yet')}
						>
							{link.text}
						</Button>
					))}
				</Box>
			</MainComponentLayout>
		</>
	)
}

export default UserHomePage
