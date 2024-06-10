import { useState } from "react"
import {
	Box,
	FormControl,
	TextField,
	Button,
	Select,
	MenuItem,
	SelectChangeEvent,
} from "@mui/material"
import { NewProductData, Requests } from "../../../requests/Requests"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"
// import AddImage from "../../../components/AddImage"

type NewProductInputs = {
	type: string
	title: string
	description: string
	customer_message: string
	image_url: string
	user_id?: string
}

const AddNewProduct = () => {
	const [newProduct, setNewProduct] = useState<NewProductInputs>({
		type: "",
		title: "",
		description: "",
		customer_message: "",
		image_url:
			"https://img.freepik.com/free-vector/image-template-background_1314-149.jpg?size=626&ext=jpg",
		user_id: "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
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
		const accessToken = localStorage.getItem("accessToken")

		const payload: NewProductData = {
			type: newProduct.type,
			title: newProduct.title,
			description: newProduct.description,
			customer_message: newProduct.customer_message,
			image_url: newProduct.image_url,
			user_id: newProduct.user_id || "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
		}

		if (!payload) {
			alert("There is an issue with the information that was submitted")
			return
		}

		const response = await Requests.POST(
			"/subapps/mycuttingboard/admin/add-new-product",
			payload,
			true,
			accessToken as string
		)
		if (response.status === 201) {
			alert("Product added successfully")
			handleClearForm()
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
						<FormControl sx={{ width: "100%" }}>
							<TextField
								id="customer_message"
								label="Customer Message"
								value={newProduct.customer_message}
								onChange={handleProductChange}
								multiline
							/>
						</FormControl>
						<FormControl sx={{ width: "100%" }}>
							<TextField
								id="image_url"
								label="Image URL"
								onChange={handleProductChange}
							/>
						</FormControl>
						<br />
						{/* <AddImage /> */}
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</form>
				</Box>
			</MainComponentLayout>
		</>
	)
}

export default AddNewProduct
