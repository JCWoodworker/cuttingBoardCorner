import { useState, useEffect, memo } from "react"
import { CircularProgress, List, Typography } from "@mui/material"
import { Requests } from "../../../requests/Requests"

import ProductListItemShow from "./ProductListItemShow"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import { ProductType } from "../../../pages/products/ProductDataIndex"

const ProductIndex: React.FC = memo(() => {
	const [allProductData, setAllProductData] = useState<ProductType[] | null>(
		null
	)
	const getAllProductData = async () => {
		const accessToken = localStorage.getItem("accessToken")
		const response = await Requests.GET(
			"/subapps/mycuttingboard/admin/all-product-data",
			false,
			true,
			accessToken as string
		)
		setAllProductData(response.data)
	}

	const handleDeleteProduct = async (itemId: number) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			const accessToken = localStorage.getItem("accessToken")
			const response = await Requests.DELETE(
				`/subapps/mycuttingboard/admin/delete-product/${itemId}`,
				accessToken as string
			)
			if (response.status === 200) {
				alert("Product deleted successfully")
				getAllProductData()
			}
		} else {
			return
		}
	}

	useEffect(() => {
		getAllProductData()
	}, [])

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
						allProductData.map((item: ProductType) => (
							<ProductListItemShow
								key={item.id}
								item_id={item.id}
								item_title={item.title}
								item_description={item.description}
								item_image_url={item.image_url}
								item_category={item.type}
								handle_delete_product={handleDeleteProduct}
							/>
						))
					) : (
						<CircularProgress />
					)}
				</List>
			</MainComponentLayout>
		</>
	)
})

export default ProductIndex
