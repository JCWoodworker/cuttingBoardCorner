import { Box, Divider, Typography } from "@mui/material"
import NotFound from "./NotFound"
import CaringForYourBoard from "./CaringForYourBoard"
import ImageContainer from "../components/ImageContainer"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	boardData: any | undefined
}

const BoardDataShow: React.FC<Props> = ({ boardData }) => {
	if (!boardData) {
		return <NotFound />
	}

	return (
		<Box>
			<Box>
				<Typography variant="h3">My {boardData.board_type}</Typography>
				<Typography variant="body1">
					{boardData.board_description}
				</Typography>
				<Typography variant="subtitle2">ID: {boardData.id}</Typography>
				<ImageContainer
					url={boardData.board_image_url}
					description={boardData.board_name}
					type="cutting-board"
				/>{" "}
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{boardData.customer_message}
				</Typography>
				<br />
			</Box>
			<Divider sx={{ my: 2, width: "100%" }} />
			<CaringForYourBoard />
		</Box>
	)
}

export default BoardDataShow
