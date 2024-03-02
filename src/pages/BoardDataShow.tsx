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
			<Typography variant="h5">{boardData.customer_message}</Typography>
		</>
	)
}

export default BoardDataShow

// "https://cuttingboardcornerimages.s3.us-east-2.amazonaws.com/20240229_211833+(1).jpg"
