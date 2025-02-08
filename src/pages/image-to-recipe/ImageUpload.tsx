import { Box, Button, useMediaQuery } from "@mui/material"
import { useState } from "react"

const ImageUpload = () => {
	const [uploadedImage, setUploadedImage] = useState<File | null>(null)
	const isMobileOrTablet = useMediaQuery("(max-width: 768px)")
	const uploadImageButtonText = uploadedImage
		? "Change Image"
		: "Upload an Image"
	const takeImageButtonText = uploadedImage
		? "Take New Picture"
		: "Take a Picture"
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

	const desktopButton = (
		<Button variant="contained" component="label">
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				style={{ display: "none" }}
			/>
			{uploadImageButtonText}
		</Button>
	)

	const mobileButton = (
		<Button variant="contained" component="label">
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				style={{ display: "none" }}
				capture="environment"
			/>
			{takeImageButtonText}
		</Button>
	)

	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
				{isMobileOrTablet ? (
					<>
						{mobileButton}
						{desktopButton}
					</>
				) : (
					desktopButton
				)}
			</Box>
			{imagePreview}
		</Box>
	)
}

export default ImageUpload
