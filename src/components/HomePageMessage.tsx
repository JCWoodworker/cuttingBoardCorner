import { Box, Typography } from "@mui/material"

const homePageMessageList = [
	`Please sign up/in using the Google link below, then use the "Contact Me Directly" link to let me know who you are and what product(s) you own.  I will manually link them to your account.`,
	`Once you've signed in you'll be able to view information about your product(s) and save links to your favorite recipes.  You can even add your own notes to each link`,
	`If you were sent to this page after scanning an NFC chip in your board or coaster, it means that link is unfortunately broken.  Please contact me via the button below so I can fix it`,
]

const HomePageMessage = () => {
	return (
		<Box
			sx={{
				margin: "1rem auto",
				width: { xs: "100%", md: "80%", lg: "600px" },
			}}
		>
			<Box>
				<Typography variant="h6">
					Thanks for your patience while I work on improving this site.
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
						key={message}
						variant="body1"
						sx={{
							padding: "1rem",
							fontSize: "1.1rem",
							borderRadius: "0.5rem",
							backgroundColor: "rgba(33, 125, 255, 0.1)",
							minWidth: { xs: "100%", md: "70%" },
							"&:last-child": {
								backgroundColor: "rgba(255, 0, 0, 0.1)",
							},
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
