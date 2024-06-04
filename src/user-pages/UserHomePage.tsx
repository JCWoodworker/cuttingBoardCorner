import { Box } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"
import NavigationButton from "../components/NavigationButton"
import useUserDataContext from "../custom_hooks/use-user-data-context"

const UserHomePage: React.FC = () => {
	const { userInfo } = useUserDataContext()

	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Box
					sx={{
						mt: "2rem",
						display: "flex",
						flexDirection: {
							xs: "column",
							sm: "row",
						},
						justifyContent: "center",
						alignItems: "center",
						gap: "1rem",
					}}
				>
					{userInfo?.role === "admin" ? (
						<NavigationButton path={"/admin"} text="Admin" />
					) : null}
					<NavigationButton path={"/my-products"} text="My Products" />
					<NavigationButton path={"/user-settings"} text="Settings" />
				</Box>
			</Box>
		</>
	)
}

export default UserHomePage
