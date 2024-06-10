import { useState } from "react"
import {
	Box,
	FormControl,
	FormHelperText,
	TextField,
	Button,
	Select,
	MenuItem,
	SelectChangeEvent,
	Typography,
} from "@mui/material"
import { NewProductData, Requests } from "../../../requests/Requests"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"
import useThemeContext from "../../../hooks/use-theme-context"
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
	const [category, setCategory] = useState<string>("boards")
	const [newProduct, setNewProduct] = useState<NewProductInputs>({
		type: "",
		title: "",
		description: "",
		customer_message: "",
		image_url: "",
		user_id: "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
	})
	const { theme } = useThemeContext()

	const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewProduct({
			...newProduct,
			[event.target.id]: event.target.value,
		})
	}
	const handleCategoryChange = (event: SelectChangeEvent<string>) => {
		setCategory(event.target.value as string)
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
		let payload: NewProductData | null = null

		if (category === "boards") {
			payload = {
				category: "boards",
				newProduct: {
					user_id: newProduct.user_id || "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
					board_type: newProduct.type,
					board_description: newProduct.description,
					board_image_url: newProduct.image_url,
					customer_message: newProduct.customer_message,
				},
			}
		} else if (category === "coasters") {
			payload = {
				category: "coasters",
				newProduct: {
					user_id: newProduct.user_id || "xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx",
					coaster_type: newProduct.type,
					coaster_description: newProduct.description,
					coaster_image_url: newProduct.image_url,
					customer_message: newProduct.customer_message,
				},
			}
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
				<Typography
					variant="subtitle1"
					sx={{
						margin: "0.5rem auto",
						padding: "0.5rem 1rem",
						width: "max-content",
						color: "red",
						fontWeight: "bolder",
						backgroundColor: `${theme === "dark" ? "black" : "white"}`,
						border: `3px solid red`,
						borderRadius: "5px",
					}}
				>
					Currently disabled while fixing bugs
				</Typography>
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
								id="category"
								value={category}
								onChange={handleCategoryChange}
								disabled
							>
								<MenuItem value="boards">Board</MenuItem>
								<MenuItem value="coasters">Coaster</MenuItem>
							</Select>
						</FormControl>
						<FormControl sx={{ width: "100%" }}>
							<TextField
								id="title"
								label="Title"
								aria-describedby="title-helper-text"
								value={newProduct.title}
								onChange={handleProductChange}
								disabled
							/>
							<FormHelperText id="title-helper-text">
								Title
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ width: "100%" }}>
							<TextField
								id="description"
								label="Description"
								aria-describedby="description-helper-text"
								value={newProduct.description}
								onChange={handleProductChange}
								multiline
								disabled
							/>
							<FormHelperText id="description-helper-text">
								Write your description here.
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ width: "100%" }}>
							<TextField
								id="customerMessage"
								label="Customer Message"
								aria-describedby="customerMessage-helper-text"
								value={newProduct.customer_message}
								onChange={handleProductChange}
								multiline
								disabled
							/>
							<FormHelperText id="description-helper-text">
								Write a message to the customer.
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ width: "100%" }}>
							<TextField
								id="image_url"
								label="Image URL"
								aria-describedby="image-helper-text"
								onChange={handleProductChange}
								disabled
							/>
							<FormHelperText id="image-helper-text">
								Paste the image URL here
							</FormHelperText>
						</FormControl>
						<br />
						{/* <AddImage /> */}
						<Button variant="contained" type="submit" disabled>
							Submit
						</Button>
					</form>
				</Box>
			</MainComponentLayout>
		</>
	)
}

export default AddNewProduct
