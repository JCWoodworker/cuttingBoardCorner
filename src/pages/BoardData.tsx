import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

import LinksContainer from "../components/LinksContainer"

const BoardData = () => {
	const { boardId } = useParams()

	return (
		<>
			<Typography variant="h3">Board Data Placeholder</Typography>
			<p>{`Board ID: ${boardId}`}</p>
			<LinksContainer />
		</>
	)
}

export default BoardData
