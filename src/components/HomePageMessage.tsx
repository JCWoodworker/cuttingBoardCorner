import { Box, Typography } from "@mui/material"

const homePageMessageList = [
	`We are working on a way for our users to register the product(s) they've purchased or received after signing up/in.`,
	`For now, please contact me once you've registered as a user and I will manually link your product to your user ID`,
	`If you were sent to this page after scanning an NFC chip in your board or coaster, it means that link is unfortunately broken.`,
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
