import { Box, Button } from "@mui/material"

const ContactMe = ({
	buttonText = "Contact Me Directly",
}: {
	buttonText?: string
}) => {
	return (
		<Box sx={{ margin: "0.5rem auto" }}>
			<Button
				variant="contained"
				onClick={() => window.open("https://rilocalwoodworks.com/contact")}
			>
				{buttonText}
			</Button>
		</Box>
	)
}

export default ContactMe
