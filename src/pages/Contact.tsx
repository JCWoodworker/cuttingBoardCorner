import { Link, Box } from "@mui/material"
import { Instagram, Facebook } from "@mui/icons-material"

const Contact = () => {
	return (
		<Box
			sx={{
				my: 2,
				display: "flex",
				justifyContent: "space-evenly",
				textAlign: "center",
			}}
		>
			<Link href="https://www.rilocalwoodworks.com">
				Visit RI Local Woodworks Online
			</Link>
			<Link href="https://www.instagram.com/rilocalwoodworks">
				<Instagram sx={{ mr: 1 }} />
			</Link>
			<Link href="https://www.facebook.com/RILocalWoodworks">
				<Facebook sx={{ mr: 1 }} />
			</Link>
		</Box>
	)
}

export default Contact
