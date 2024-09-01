import React, { useEffect, useState } from "react"
import { Requests } from "../requests/Requests"
import { LocalStorageElements } from "../utils/clearLocalStorage"
import { ProductType } from "../pages/products/ProductDataIndex"
import { capitalizeFirstLetterAndRemoveUnderscore } from "../utils/capitalizeFirstLetter"

import {
	Box,
	Button,
	FormGroup,
	FormLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material"
import { Save, Delete, PersonAdd } from "@mui/icons-material"

import useThemeContext from "../hooks/use-theme-context"
import useProductStore from "../zustand/productStore"
import LinkUserToProductModal from "./LinkUserToProductModal"

///////////////////////////////////////////////////
//  BELOW NEEDS TO BE MOVED TO A BETTER LOCATION!!!

interface ProductPhysicalType {
	productPhysicalType: "board" | "coaster"
}
const productPhysicalTypes: ProductPhysicalType[] = [
	{ productPhysicalType: "board" },
	{ productPhysicalType: "coaster" },
]

//  ABOVE NEEDS TO BE MOVED TO A BETTER LOCATION!!!
///////////////////////////////////////////////////

const AdminProductEditForm: React.FC = () => {
	const {
		selectedProduct,
		setSelectedProduct,
		getAllProductData,
		deleteProduct,
	} = useProductStore()
	const [selectedProductEditFields, setSelectedProductEditFields] = useState<
		Partial<ProductType>
	>({
		title: selectedProduct!.title,
		type: selectedProduct!.type,
		description: selectedProduct!.description,
		customer_message: selectedProduct!.customer_message,
		user_id: selectedProduct!.user_id,
	})
	const { theme } = useThemeContext()

	const buttonShadowClassName =
		theme === "dark" ? "button-shadow-dark-mode" : "button-shadow-light-mode"
	const buttonVariant = "outlined"
	const formInputVariant = "standard"

	const [addUserModelIsOpen, setAddUserModelIsOpen] = useState(false)

	useEffect(() => {
		setSelectedProductEditFields({
			title: selectedProduct!.title,
			type: selectedProduct!.type,
			description: selectedProduct!.description,
			customer_message: selectedProduct!.customer_message,
			user_id: selectedProduct!.user_id,
		})
	}, [selectedProduct])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setSelectedProductEditFields({
			...selectedProductEditFields,
			[name]: value,
		})
	}

	const handleTypeChange = (event: SelectChangeEvent) => {
		setSelectedProductEditFields({
			...selectedProductEditFields,
			type: event.target.value,
		})
	}

	const handleUpdateProduct = async () => {
		const payload = selectedProductEditFields
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		const response = await Requests.PATCH(
			`/subapps/mycuttingboard/admin/update-product/${selectedProduct!.id}`,
			payload,
			true,
			accessToken as string
		)
		if (response.status === 200) {
			console.log("Product updated successfully")
			getAllProductData()
			setSelectedProduct(null)
		}
	}

	return (
		<>
			{addUserModelIsOpen && (
				<LinkUserToProductModal
					productId={selectedProduct!.id}
					addUserModelIsOpen={addUserModelIsOpen}
					setAddUserModelIsOpen={setAddUserModelIsOpen}
				/>
			)}
			<form onSubmit={handleUpdateProduct}>
				<FormGroup
					sx={{ m: "0 auto", width: { xs: "100%", md: "70%" }, gap: 1 }}
				>
					{Object.keys(selectedProductEditFields).map((key, index) => {
						let inputField
						if (key === "type") {
							inputField = (
								<Select
									key={index}
									name={key}
									value={selectedProductEditFields.type}
									onChange={handleTypeChange}
									displayEmpty
									variant={formInputVariant}
									sx={{ width: { xs: "100%", sm: "150px" } }}
								>
									<MenuItem value="" disabled key="select_a_product">
										Select a product type
									</MenuItem>
									{productPhysicalTypes.map((type) => (
										<MenuItem
											key={type.productPhysicalType}
											value={type.productPhysicalType}
										>
											{capitalizeFirstLetterAndRemoveUnderscore(
												type.productPhysicalType
											)}
										</MenuItem>
									))}
								</Select>
							)
						} else if (key === "user_id") {
							let userId =
								selectedProductEditFields[key as keyof ProductType]?.toString()
							if (userId?.startsWith("xxx")) {
								userId = "No User Assigned To This Product"
							}
							inputField = (
								<TextField
									key="user_id"
									name={key}
									variant={formInputVariant}
									disabled
									value={userId}
								/>
							)
						} else {
							inputField = (
								<TextField
									key={index}
									name={key}
									multiline
									variant={formInputVariant}
									onChange={handleInputChange}
									value={selectedProductEditFields[key as keyof ProductType]}
								/>
							)
						}
						return (
							<>
								<FormLabel key={key} sx={{ width: "100%", textAlign: "left" }}>
									{capitalizeFirstLetterAndRemoveUnderscore(key)}:
								</FormLabel>
								{inputField}
							</>
						)
					})}
				</FormGroup>

				<Box sx={{ my: "1rem" }}>
					<Button
						className={buttonShadowClassName}
						variant={buttonVariant}
						sx={{ m: "0.5rem", p: "0.5rem 1.5rem" }}
						color="success"
						type="submit"
					>
						<Save sx={{ color: "green" }} />
					</Button>
					<Button
						className={buttonShadowClassName}
						variant={buttonVariant}
						sx={{ m: "0.5rem", p: "0.5rem 1.5rem" }}
						color="error"
						onClick={() => deleteProduct(selectedProduct!.id)}
					>
						<Delete sx={{ color: "red" }} />
					</Button>
					<Button
						className={buttonShadowClassName}
						variant={buttonVariant}
						sx={{ m: "0.5rem", p: "0.5rem 1.5rem" }}
						color="secondary"
						onClick={() => setAddUserModelIsOpen(true)}
					>
						<PersonAdd />
					</Button>
				</Box>
			</form>
		</>
	)
}

export default AdminProductEditForm
