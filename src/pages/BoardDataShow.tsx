import { Box, Typography } from "@mui/material"
import NotFound from "./NotFound"
import CaringForYourBoard from "./CaringForYourBoard"
import Contact from "./Contact"

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
			<div>
				<Typography variant="h3">My {boardData.board_type}</Typography>
				<Typography variant="subtitle1">
					{boardData.board_description}
				</Typography>
				<Typography variant="subtitle2">ID: {boardData.id}</Typography>
				<img
					src={boardData.board_image_url}
					className="cutting-board-image"
				></img>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{boardData.customer_message}
				</Typography>
				<br />
			</div>
			<hr />
			<CaringForYourBoard />
			<Contact />
		</Box>
	)
}

export default BoardDataShow
