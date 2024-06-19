import { Box, Button } from "@mui/material"

const ContactMe = () => {
	return (
		<Box>
			<Button
				variant="contained"
				sx={{ mt: "1rem" }}
				onClick={() => window.open("https://rilocalwoodworks.com/contact")}
			>
				Click Here To Contact Me Directly
			</Button>
		</Box>
	)
}

export default ContactMe
