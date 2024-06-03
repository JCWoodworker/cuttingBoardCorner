import { useCallback, useState } from "react"
import { useDropzone, FileError } from "react-dropzone"
import { Requests } from "../requests/Requests"

const AddImage: React.FC = () => {
	const [image, setImage] = useState<File | null>(null)
	const maxSize: number = 5 * 1024 * 1024
	const maxSizeValidator = (file: File): FileError | null => {
		if (file.size > maxSize) {
			alert("File is too large, must be less than 5MB")
			return {
				code: "file-too-large",
				message: "File is too large, must be less than 5MB",
			}
		} else {
			return null
		}
	}

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		setImage(acceptedFiles[0])
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		validator: maxSizeValidator,
		maxFiles: 1,
		accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp"] },
	})

	const onUpload = async (file: File) => {
    const accessToken = localStorage.getItem("accessToken")
		try {
			const formData = new FormData()
			formData.append("image", file)
			const response = await Requests.POST(
				"/subapps/image-upload",
				formData,
				true,
        accessToken as string

			)
			const data = await response
			alert(data.message)
			setImage(null)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : image ? (
					<></>
				) : (
					<button>Add Image</button>
				)}
			</div>
			<div>
				{image && (
					<>
						<img
							src={`${URL.createObjectURL(image)}`}
							style={{ width: "200px", height: "auto" }}
						/>
						<p>Image loaded</p>
					</>
				)}
				<div>
					{image && <button onClick={() => onUpload(image)}>Upload</button>}
					{image && <button onClick={() => setImage(null)}>Cancel</button>}
				</div>
			</div>
		</div>
	)
}

export default AddImage
