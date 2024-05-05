import { Box, Typography } from "@mui/material"
import NotFound from "./NotFound"
import CaringForYourBoard from "./CaringForYourBoard"
import Contact from "./Contact"
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
			<div>
				<Typography variant="h3">My {boardData.board_type}</Typography>
				<Typography variant="subtitle1">
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
			</div>
			<hr />
			<CaringForYourBoard />
			<Contact />
		</Box>
	)
}

export default BoardDataShow
