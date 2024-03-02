import { Typography } from "@mui/material"
import NotFound from "./NotFound"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	boardData: any | undefined
}

const BoardDataShow: React.FC<Props> = ({ boardData }) => {
	if (!boardData) {
		return <NotFound />
	}

	return (
		<>
			<Typography variant="h3">My {boardData.board_type}</Typography>
			<Typography variant="subtitle1">{boardData.board_description}</Typography>
			<Typography variant="subtitle2">ID: {boardData.id}</Typography>
			<img
				src={boardData.board_image_url}
				className="cutting-board-image"
			></img>
			<Typography variant="h5" sx={{ fontWeight: "bold" }}>
				{boardData.customer_message}
			</Typography>
			<Typography variant="subtitle1" sx={{ mt: 3, fontStyle: "italic" }}>
				More info coming soon, including how to care for your board, where to
				but mineral oil, etc ...
			</Typography>
		</>
	)
}

export default BoardDataShow
