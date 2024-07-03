import { Box, Divider } from "@mui/material"
import MainComponentLayout from "../layouts/MainComponentLayout"
import HomePageMessage from "../components/HomePageMessage"
import ContactMe from "./ContactMe"
import GoogleOAuth from "../auth/GoogleOAuth"
import useUserDataContext from "../hooks/use-user-data-context"
import SocialLinks from "./SocialLinks"

const HomePage: React.FC = () => {
	const { setUserInfo, setLoggedIn } = useUserDataContext()
	return (
		<>
			<MainComponentLayout>
				<HomePageMessage />
				<br />
				<ContactMe />
				<Box
					sx={{
						mt: "1rem",
						display: "grid",
						placeItems: "center",
					}}
				>
					<GoogleOAuth setLoggedIn={setLoggedIn} setUserInfo={setUserInfo} />
				</Box>
				<Divider sx={{ my: "2rem", width: {xs: "90%", md: "50%"}, mx: "auto" }} />
				<SocialLinks />
			</MainComponentLayout>
		</>
	)
}

export default HomePage
