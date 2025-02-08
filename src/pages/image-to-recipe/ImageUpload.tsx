import { Box, Button } from "@mui/material"
import { useState } from "react"

const ImageUpload = () => {
	const [uploadedImage, setUploadedImage] = useState<File | null>(null)
	const imageButtonText = uploadedImage ? "Change Image" : "Upload Image"
	const imagePreview = uploadedImage ? (
		<img
			src={URL.createObjectURL(uploadedImage)}
			alt="Uploaded"
			style={{ margin: "10px", width: "200px", height: "auto" }}
		/>
	) : null

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setUploadedImage(event.target.files[0])
		}
	}



	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Button variant="contained" component="label">
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					style={{ display: "none" }}
					capture="environment"
				/>
				{imageButtonText}
			</Button>
			{imagePreview}
		</Box>
	)
}

export default ImageUpload
