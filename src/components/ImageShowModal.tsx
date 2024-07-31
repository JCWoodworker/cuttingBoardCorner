import { Box, Modal } from "@mui/material"
import { modalStyle } from "../utils/modalStyle"

interface Props {
	imageUrl: string
	imageModalIsOpen: boolean
	setImageModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageShowModal: React.FC<Props> = ({
	imageUrl,
	imageModalIsOpen,
	setImageModalIsOpen,
}) => {
	return (
		<Modal open={imageModalIsOpen} onClose={() => setImageModalIsOpen(false)}>
			<Box sx={modalStyle}>
				<img src={imageUrl} />
			</Box>
		</Modal>
	)
}

export default ImageShowModal
