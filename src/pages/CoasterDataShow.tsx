import { useState } from "react"
import { Box, Typography } from "@mui/material"
import NotFound from "./NotFound"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coasterData: any | undefined
}

const CoasterDataShow: React.FC<Props> = ({
	coasterData,
}) => {
	const [isLoading, setIsLoading] = useState(true)

	if (!coasterData) {
		return <NotFound />
	}

	return (
		<Box>
			<div>
				<Typography variant="h3">My Coasters</Typography>
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
			<Typography variant="subtitle1">
				Please forgive the lack of features... They're on the way as I build them in my spare time!
			</Typography>
			{/* <img
				src="https://img.freepik.com/premium-photo/woohoo-fancy-dinner-with-steamed-red-lobster-so-tasty_971713-3141.jpg"
				className="cutting-board-image"
				onLoad={() => setIsLoading(false)}
				style={{ display: isLoading ? "none" : "block" }}
			></img> */}
			<hr />
			
		</Box>
	)
}

export default CoasterDataShow
