import { Typography } from "@mui/material"
import { BoardData } from "../context/BoardDataProvider"

interface Props {
	boardData: BoardData
}

const BoardDataShow: React.FC<Props> = ({ boardData }) => {
	return (
		<>
			<Typography variant="h3">My {boardData.board_type}</Typography>
			<p>Board ID: {boardData.id}</p>
			<p>Description: {boardData.board_description}</p>
			<img
				src="https://cuttingboardcornerimages.s3.us-east-2.amazonaws.com/20240229_211833+(1).jpg"
				className="cutting-board-image"
			></img>
		</>
	)
}

export default BoardDataShow
