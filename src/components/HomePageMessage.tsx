import { Box, Typography } from "@mui/material"

const homePageMessageList = [
	`If your product(s) don't automatically appear when you sign in, please click the \n
	"Contact JC" link in the dropdown menu, and I'll update your account ASAP.`,
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
					Please sign up/in using the Google link below
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
							// "&:last-child": {
							// 	backgroundColor: "rgba(255, 0, 0, 0.1)",
							// },
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
