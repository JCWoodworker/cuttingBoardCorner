import { Link, Box } from "@mui/material"
import { Instagram, Facebook } from "@mui/icons-material"

const SocialLinks = () => {
	return (
		<Box
			sx={{
				my: 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-evenly",
				textAlign: "center",
				gap: 2,
			}}
		>
			<Link href="https://www.rilocalwoodworks.com">
				Visit RI Local Woodworks Online
			</Link>
			<div>
				<Link href="https://www.instagram.com/rilocalwoodworks">
					<Instagram sx={{ mr: 1 }} />
				</Link>
				<Link href="https://www.facebook.com/RILocalWoodworks">
					<Facebook sx={{ mr: 1 }} />
				</Link>
			</div>
		</Box>
	)
}

export default SocialLinks
