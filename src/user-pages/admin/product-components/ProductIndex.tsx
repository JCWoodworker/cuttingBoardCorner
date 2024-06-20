import { useState, useEffect, memo } from "react"
import {
	Box,
	CircularProgress,
	List,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import { Requests } from "../../../requests/Requests"

import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import { ProductType } from "../../../pages/products/ProductDataIndex"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"

const ProductIndex: React.FC = memo(() => {
	const [allProductData, setAllProductData] = useState<ProductType[] | null>(
		null
	)
	const getAllProductData = async () => {
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		const response = await Requests.GET(
			"/subapps/mycuttingboard/admin/all-product-data",
			false,
			true,
			accessToken as string
		)
		setAllProductData(response.data)
	}

	// const handleDeleteProduct = async (itemId: number) => {
	// 	if (window.confirm("Are you sure you want to delete this product?")) {
	// 		const accessToken = localStorage.getItem(
	// 			LocalStorageElements.ACCESS_TOKEN
	// 		)
	// 		const response = await Requests.DELETE(
	// 			`/subapps/mycuttingboard/admin/delete-product/${itemId}`,
	// 			accessToken as string
	// 		)
	// 		if (response.status === 200) {
	// 			alert("Product deleted successfully")
	// 			getAllProductData()
	// 		}
	// 	} else {
	// 		return
	// 	}
	// }

	useEffect(() => {
		getAllProductData()
	}, [])

	const tableRows = allProductData?.map((product) => {
		return (
			<TableRow
				key={product.id}
				sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
			>
				<TableCell>{product.id}</TableCell>
				<TableCell>
					<img className="product-thumbnail" src={product.image_url} />
				</TableCell>
				<TableCell>{product.title}</TableCell>
				<TableCell>{product.description}</TableCell>
				<TableCell>{product.type}</TableCell>
			</TableRow>
		)
	})

	return (
		<>
			<MainComponentLayout>
				<NavButtonLayout>
					<NavigationButton path={"/"} text="User Home" icon="back" />
					<NavigationButton path={"/admin"} text="Admin" icon="back" />
					<NavigationButton
						path="/admin/add-new-product"
						text="New Product"
						icon="forward"
					/>
				</NavButtonLayout>
				<List>
					<Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
						Product List
					</Typography>
					{allProductData ? (
						<Box sx={{ width: "100%", overflowX: "auto" }}>
							<Table>
								<TableHead>
									<TableCell>ID</TableCell>
									<TableCell>Image</TableCell>
									<TableCell>Title</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Type</TableCell>
								</TableHead>
								<TableBody>{tableRows}</TableBody>
							</Table>
						</Box>
					) : (
						<CircularProgress />
					)}
				</List>
			</MainComponentLayout>
		</>
	)
})

export default ProductIndex
