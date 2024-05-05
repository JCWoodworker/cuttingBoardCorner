import { Box, Typography } from "@mui/material"
import NotFound from "./NotFound"
import ImageContainer from "../components/ImageContainer"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coasterData: any | undefined
}

const CoasterDataShow: React.FC<Props> = ({ coasterData }) => {
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
				<ImageContainer
					url={coasterData.coaster_image_url}
					description={coasterData.coaster_name}
					type="coaster"
				/>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{coasterData.customer_message}
				</Typography>
			</div>
		</Box>
	)
}

export default CoasterDataShow
