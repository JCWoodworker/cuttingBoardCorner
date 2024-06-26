import { Box, Button } from "@mui/material"

const ContactMe = () => {
	return (
		<Box>
			<Button
				variant="contained"
				onClick={() => window.open("https://rilocalwoodworks.com/contact")}
			>
				Contact Me Directly
			</Button>
		</Box>
	)
}

export default ContactMe
