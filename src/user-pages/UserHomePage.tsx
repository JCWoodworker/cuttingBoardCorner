import { Box } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import NavigationButton from "../components/nav-button/NavigationButton"
import useUserDataContext from "../custom_hooks/use-user-data-context"
import NavButtonLayout from "../components/nav-button/NavButtonLayout"

const UserHomePage: React.FC = () => {
	const { userInfo } = useUserDataContext()

	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<NavButtonLayout>
					{userInfo?.role === "admin" ? (
						<NavigationButton path={"/admin"} text="Admin" />
					) : null}
					<NavigationButton path={"/my-products"} text="My Products" />
					<NavigationButton path={"/user-settings"} text="Settings" />
				</NavButtonLayout>
			</Box>
		</>
	)
}

export default UserHomePage
