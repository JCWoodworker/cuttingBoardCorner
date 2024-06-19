import { Box, Typography } from "@mui/material"

const HomePageMessage = () => {
	return (
		<Box>
			<Typography variant="h4">
				Much of this app is under construction...
			</Typography>
			<br />
			<Typography variant="body2">
				* We are working on allowing a user to register their product(s) after
				signing up/in.
			</Typography>
			<Typography variant="body2">
				* If you were sent to this page after scanning an NFC chip, it means
				that link is unfortunately broken. There is no way for you to find your
				product ID without contacting me
			</Typography>
			<Typography variant="body2">
				* The goal is to allow a user to sign up via Google, and then send a
				special pass code for them to use that lets the system know which
				product they bought or received as a gift
			</Typography>
			<Typography variant="body2">
				* For now, please contact me once you've registered as a user and I will
				have to manually link your product to your user ID
			</Typography>
			<br />
			<Typography variant="h4"> Thanks for your patience!</Typography>
		</Box>
	)
}

export default HomePageMessage