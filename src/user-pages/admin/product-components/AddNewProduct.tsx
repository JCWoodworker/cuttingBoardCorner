import { useState } from "react"
import {
	Box,
	FormControl,
	TextField,
	Button,
	Select,
	MenuItem,
	SelectChangeEvent,
	Typography,
	Skeleton,
} from "@mui/material"
import { NewProductData, Requests } from "../../../requests/Requests"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"
import AddImage from "../../../components/AddImage"
import { replaceSpaces } from "../../../utils/image-utils/replaceSpaces"

type NewProductType = {
	type: string
	title: string
	description: string
	customer_message: string
	image_url: string
	user_id: string
}

const AddNewProduct = () => {
	const [image, setImage] = useState<File | null>(null)
	const [isUploadingNewProduct, setIsUploadingNewProduct] =
		useState<boolean>(false)
	const [newProduct, setNewProduct] = useState<NewProductType>({
		type: "",
		title: "",
		description: "",
		customer_message: "",
		user_id: "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
		image_url:
			"https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg",
	})

	const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewProduct({
			...newProduct,
			[event.target.id]: event.target.value,
		})
	}

	const handleTypeChange = (event: SelectChangeEvent) => {
		setNewProduct({
			...newProduct,
			type: event.target.value,
		})
	}

	const handleImageUpload = async (file: File, accessToken: string) => {
		try {
			const formData = new FormData()
			formData.append("image", file)
			const response = await Requests.POST(
				"/subapps/image-upload",
				formData,
				true,
				accessToken as string
			)
			setImage(null)
			return response.data.publicUrl
		} catch (err) {
			console.log(err)
			alert("There was an error uploading the image")
			return false
		}
	}

	const handleClearForm = () => {
		setNewProduct({
			type: "",
			title: "",
			description: "",
			customer_message: "",
			image_url: "",
			user_id: "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsUploadingNewProduct(() => true)
		const accessToken = localStorage.getItem("accessToken")
		let newImageUrl = null

		const payload: NewProductData = {
			type: newProduct.type,
			title: newProduct.title,
			description: newProduct.description,
			customer_message: newProduct.customer_message,
			image_url: newProduct.image_url,
			user_id: newProduct.user_id || "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
		}

		if (image) {
			newImageUrl = await handleImageUpload(
				image as File,
				accessToken as string
			)
		}

		if (newImageUrl) {
			payload.image_url = replaceSpaces(newImageUrl)
		}

		console.log(payload)
		if (!payload) {
			alert("There is an issue with the information that was submitted")
			return
		}
		try {
			const response = await Requests.POST(
				"/subapps/mycuttingboard/admin/add-new-product",
				payload,
				true,
				accessToken as string
			)

			if (response.status === 201) {
				setIsUploadingNewProduct(() => false)
				alert("Product added successfully")
				handleClearForm()
			}
		} catch (err) {
			console.log(`Error adding new product: ${err}`)
		}
	}

	return (
		<>
			<MainComponentLayout>
				<NavButtonLayout>
					<NavigationButton path={"/admin"} text="Admin" icon="back" />
					<NavigationButton
						path={"/admin/all-inventory"}
						text="Products"
						icon="back"
					/>
				</NavButtonLayout>
				<ComponentTitle text="Add New Product" />
				<Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
					{!isUploadingNewProduct ? (
						<form
							style={{
								marginTop: "1rem",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								gap: "1rem",
							}}
							onSubmit={handleSubmit}
						>
							<FormControl sx={{ width: "100%" }}>
								<Select
									id="type"
									value={newProduct.type}
									onChange={handleTypeChange}
									displayEmpty
								>
									<MenuItem value="" disabled>
										Select a product type
									</MenuItem>
									<MenuItem value="board">Board</MenuItem>
									<MenuItem value="coaster">Coaster</MenuItem>
								</Select>
							</FormControl>
							<FormControl sx={{ width: "100%" }}>
								<TextField
									id="title"
									label="Title"
									value={newProduct.title}
									onChange={handleProductChange}
								/>
							</FormControl>
							<FormControl sx={{ width: "100%" }}>
								<TextField
									id="description"
									label="Description"
									value={newProduct.description}
									onChange={handleProductChange}
									multiline
								/>
							</FormControl>
							<FormControl
								sx={{
									width: "100%",
								}}
							>
								<TextField
									id="customer_message"
									label="Customer Message"
									value={newProduct.customer_message}
									onChange={handleProductChange}
									multiline
								/>
							</FormControl>
							<br />
							<AddImage image={image} setImage={setImage} />
							<Button variant="contained" type="submit">
								Submit
							</Button>
						</form>
					) : (
						<>
							<Skeleton
								variant="rounded"
								width="100%"
								height="200px"
								animation="wave"
								sx={{ margin: "0 auto" }}
							/>
							<Typography sx={{ margin: "0.25rem" }}>Adding New Product ...</Typography>
							<Skeleton
								variant="rounded"
								width="100%"
								height="200px"
								animation="wave"
								sx={{ margin: "0 auto" }}
							/>
						</>
					)}
				</Box>
			</MainComponentLayout>
		</>
	)
}

export default AddNewProduct
