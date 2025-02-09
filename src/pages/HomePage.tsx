import { Box, Divider, Typography } from "@mui/material"
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
				<Box
					sx={{
						m: "0 auto",
						p: "1.5rem",
						px: "2rem",
						width: "fit-content",
						display: "grid",
						placeItems: "center",
						gap: "0.5rem",
						// backgroundColor: "gray",
						border: "1px solid gray",
						borderRadius: "0.5rem",
					}}
				>
					<Typography variant="body1">Sign up/in with Google</Typography>
					<GoogleOAuth setLoggedIn={setLoggedIn} setUserInfo={setUserInfo} />
				</Box>
				<Divider
					sx={{ my: "2rem", width: { xs: "90%", md: "50%" }, mx: "auto" }}
				/>
				<ContactMe />
				<SocialLinks />
			</MainComponentLayout>
		</>
	)
}

export default HomePage
