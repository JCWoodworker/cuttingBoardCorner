import { useState } from "react"
import { Box, Typography } from "@mui/material"
import NotFound from "./NotFound"
import Contact from "./Contact"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coasterData: any | undefined
}

const CoasterDataShow: React.FC<Props> = ({ coasterData }) => {
	const [isLoading, setIsLoading] = useState(true)

	if (!coasterData) {
		return <NotFound />
	}

	return (
		<Box>
			<div>
				<Typography variant="h3">My Coaster(s)</Typography>
				<Typography variant="subtitle1">
					{coasterData.coaster_description}
				</Typography>
				<Typography variant="subtitle2">ID: {coasterData.id}</Typography>
				<Box sx={{ my: 2, textAlign: "center", height: "auto" }}>
					{isLoading && (
						<Box sx={{ mt: 2, textAlign: "center" }}>
							<span>Loading Image ...</span>
						</Box>
					)}
					<img
						src={coasterData.coaster_image_url}
						className="cutting-board-image"
						onLoad={() => setIsLoading(false)}
						style={{ display: isLoading ? "none" : "block" }}
					></img>
				</Box>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{coasterData.customer_message}
				</Typography>
				<br />
			</div>
			<hr />
			<p>Such lack of features ... Much wow coming soon!!!</p>
			<img
				src="https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
				className="cutting-board-image"
				onLoad={() => setIsLoading(false)}
				style={{ display: isLoading ? "none" : "block" }}
			></img>
			<Contact />
		</Box>
	)
}

export default CoasterDataShow
