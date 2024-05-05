import { Box } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

type Props = {
	url: string
	description: string
	type: string
}

const ImageContainer: React.FC<Props> = ({ url, description, type }) => {
	return (
		<Box className="image-div">
			{!url ? (
				<CircularProgress />
			) : (
				<img
					src={url}
					alt={description}
					className={`${type}-image`}
					loading="lazy"
				></img>
			)}
		</Box>
	)
}

export default ImageContainer
