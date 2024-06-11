import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { maxImageSizeValidator } from "../utils/image-utils/maxImageSizeValidator"
import { Box, Button } from "@mui/material"

interface Props {
	image: File | null
	setImage: React.Dispatch<React.SetStateAction<File | null>>
}

const AddImage: React.FC<Props> = ({ image, setImage }) => {
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			setImage(acceptedFiles[0])
		},
		[setImage]
	)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		validator: maxImageSizeValidator,
		maxFiles: 1,
		accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp"] },
	})

	return (
		<Box sx={{ p: "1rem", border: "1px solid gray", borderRadius: "0.5rem" }}>
			<Box {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop your image here ...</p>
				) : image ? (
					<></>
				) : (
					<Button>Add Image</Button>
				)}
			</Box>
			<Box>
				{image && (
					<>
						<img
							src={`${URL.createObjectURL(image)}`}
							style={{ width: "200px", height: "auto" }}
						/>
						<p>Image loaded</p>
					</>
				)}
				<Box>
					{image && (
						<Button onClick={() => setImage(null)}>Cancel Image</Button>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default AddImage
