import { Typography } from "@mui/material"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	boardData: any | undefined
}

const BoardDataShow: React.FC<Props> = ({ boardData }) => {
	return (
		<>
			<Typography variant="h3">My Board</Typography>
			<p>Board ID: {boardData.id}</p>
			<img src="" className="cutting-board-image"></img>
		</>
	)
}

export default BoardDataShow

// "https://cuttingboardcornerimages.s3.us-east-2.amazonaws.com/20240229_211833+(1).jpg"
