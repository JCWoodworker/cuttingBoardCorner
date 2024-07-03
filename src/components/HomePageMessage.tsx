import { Box, Typography } from "@mui/material"

const homePageMessageList = [
	`You will eventually be able to register any product(s) you've purchased or received while signed in to your account.`,
	`For now, please sign in using the Google link below and I will manually update your account to display your product(s).`,
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
				<Typography variant="h4">
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
						variant="body1"
						sx={{
							padding: "1rem",
							fontSize: "1.1rem",
							border: "3px solid rgba(33, 125, 255, 0.87)",
							borderRadius: "0.5rem",
							backgroundColor: "rgba(33, 125, 255, 0.1)",
							minWidth: { xs: "100%", md: "70%" },
							//last child
							"&:last-child": {
								border: "3px solid rgba(255, 0, 0, 0.87)",
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
