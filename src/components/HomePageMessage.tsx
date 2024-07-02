import { Box, Typography } from "@mui/material"

const homePageMessageList = [
	`You will eventually be able to register any product(s) you've purchased or received while signed in to your account.`,
	`For now, please sign in using the Google link below and I will manually update your account to display your product(s).`,
	`!! If you were sent to this page after scanning an NFC chip in your board or coaster, it means that link is unfortunately broken.`,
]

const HomePageMessage = () => {
	return (
		<Box
			sx={{ margin: "1rem auto", width: { xs: "100%", md: "80%", lg: "600px" } }}
		>
			<Box>
				<Typography variant="h4">
					Thank you for your patience while this site is under construction
				</Typography>
			</Box>
			<Box
				sx={{
					my: 2,
					display: "grid",
					placeItems: "center",
					gap: 1,
				}}
			>
					{homePageMessageList.map((message) => (
						<Typography
							variant="body1"
							sx={{
								padding: "1rem",							
								fontSize: "1.1rem",
								border: "3px solid rgba(33, 125, 255, 0.87)",
								borderRadius: "0.5rem",
								backgroundColor: "rgba(33, 125, 255, 0.1)",
								minWidth: { xs: "100%", md: "70%" },
							}}
						>
							{message}
						</Typography>
					))}
			</Box>
		</Box>
	)
}

export default HomePageMessage
