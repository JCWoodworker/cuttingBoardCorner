import { useEffect, useState } from "react"
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
import { ProductType } from "../pages/products/ProductDataIndex"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"
import { Save, Delete } from "@mui/icons-material"
import { LocalStorageElements } from "../utils/clearLocalStorage"
import { Requests } from "../requests/Requests"

interface Props {
	selectedProduct: ProductType
	setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType | null>>
	getAllProductData: () => void
}

///////////////////////////////////////////////////
//  BELOW NEEDS TO BE MOVED TO A BETTER LOCATION!!!
///////////////////////////////////////////////////
interface ProductPhysicalType {
	productPhysicalType: "board" | "coaster"
}
const productPhysicalTypes: ProductPhysicalType[] = [
	{ productPhysicalType: "board" },
	{ productPhysicalType: "coaster" },
]
///////////////////////////////////////////////////
//  ABOVE NEEDS TO BE MOVED TO A BETTER LOCATION!!!
///////////////////////////////////////////////////

const AdminProductEditForm: React.FC<Props> = ({
	selectedProduct,
	setSelectedProduct,
	getAllProductData,
}) => {
	const [selectedProductEditFields, setSelectedProductEditFields] = useState<
		Partial<ProductType>
	>({
		title: selectedProduct.title,
		type: selectedProduct.type,
		description: selectedProduct.description,
		customer_message: selectedProduct.customer_message,
	})

	useEffect(() => {
		setSelectedProductEditFields({
			title: selectedProduct.title,
			type: selectedProduct.type,
			description: selectedProduct.description,
			customer_message: selectedProduct.customer_message,
		})
	}, [selectedProduct])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
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
		const accessToken = localStorage.getItem(
			LocalStorageElements.ACCESS_TOKEN
		)
		const response = await Requests.PATCH(
			`/subapps/mycuttingboard/admin/update-product/${selectedProduct.id}`,
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

	const handleDeleteProduct = async (productId: number) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			const accessToken = localStorage.getItem(
				LocalStorageElements.ACCESS_TOKEN
			)
			const response = await Requests.DELETE(
				`/subapps/mycuttingboard/admin/delete-product/${productId}`,
				accessToken as string
			)
			if (response.status === 200) {
				console.log("Product deleted successfully")
				getAllProductData()
				setSelectedProduct(null)
			}
		} else {
			return
		}
	}

	return (
		<>
			<form onSubmit={handleUpdateProduct}>
				<FormGroup sx={{ width: "100%", gap: 1 }}>
					{Object.keys(selectedProductEditFields).map((key) => {
						let inputField
						if (key != "type") {
							inputField = (
								<TextField
									name={key}
									multiline
									variant="outlined"
									onChange={handleInputChange}
									value={selectedProductEditFields[key as keyof ProductType]}
								/>
							)
						} else {
							inputField = (
								<Select
									name={key}
									value={selectedProductEditFields.type}
									onChange={handleTypeChange}
									displayEmpty
									sx={{ width: { xs: "100%", sm: "300px" } }}
								>
									<MenuItem value="" disabled>
										Select a product type
									</MenuItem>
									{productPhysicalTypes.map((type) => (
										<MenuItem
											key={type.productPhysicalType}
											value={type.productPhysicalType}
										>
											{capitalizeFirstLetter(type.productPhysicalType)}
										</MenuItem>
									))}
								</Select>
							)
						}
						return (
							<>
								<FormLabel key={key} sx={{ width: "100%", textAlign: "left" }}>
									{capitalizeFirstLetter(key)}:
								</FormLabel>
								{inputField}
							</>
						)
					})}
				</FormGroup>
				<Box>
					<Button
						variant="outlined"
						sx={{ m: "1rem", p: "0.5rem 1.5rem" }}
						color="success"
						type="submit"
					>
						<Save sx={{ color: "green" }} />
					</Button>
					<Button
						variant="outlined"
						sx={{ m: "1rem", p: "0.5rem 1.5rem" }}
						color="error"
					>
						<Delete
							sx={{ color: "red" }}
							onClick={() => handleDeleteProduct(selectedProduct.id)}
						/>
					</Button>
				</Box>
			</form>
		</>
	)
}

export default AdminProductEditForm
