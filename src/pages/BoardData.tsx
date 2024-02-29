import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

const BoardData = () => {
	const { boardId } = useParams()

	return (
		<>
			<Typography variant="h3">Board Data Placeholder</Typography>
			<p>{`Board ID: ${boardId}`}</p>
		</>
	)
}

export default BoardData
