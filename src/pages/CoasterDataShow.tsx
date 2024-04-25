import { useState } from "react"
import { Box, Typography } from "@mui/material"
import { RandomDrinkData } from "./CoastersDataIndex"
import NotFound from "./NotFound"
import Contact from "./Contact"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coasterData: any | undefined
	randomDrinkData: RandomDrinkData | undefined
	drinkError: boolean
}

const CoasterDataShow: React.FC<Props> = ({
	coasterData,
	randomDrinkData,
	drinkError,
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
				Please forgive the lack of features ... they're coming soon!!!
			</Typography>
			{/* <img
				src="https://img.freepik.com/premium-photo/woohoo-fancy-dinner-with-steamed-red-lobster-so-tasty_971713-3141.jpg"
				className="cutting-board-image"
				onLoad={() => setIsLoading(false)}
				style={{ display: isLoading ? "none" : "block" }}
			></img> */}
			<hr />
			{!drinkError && (
				<>
					<Typography variant="subtitle1" sx={{ mt: 4 }}>
						For now, here's a random cocktail <br />
						<strong>"{randomDrinkData?.strDrink}"</strong>
					</Typography>
					<img
						src={randomDrinkData?.strDrinkThumb}
						className="cutting-board-image"
						onLoad={() => setIsLoading(false)}
						style={{ display: isLoading ? "none" : "block" }}
					></img>
				</>
			)}
			<Contact />
		</Box>
	)
}

export default CoasterDataShow
