import { useState, useEffect, memo } from "react"
import { Box, CircularProgress, List, Typography } from "@mui/material"
import { Requests } from "../../../requests/Requests"
import { Board } from "../../../pages/BoardDataIndex"
import { Coaster } from "../../../pages/CoasterDataIndex"

import NavDrawer from "../../../navigation/NavDrawer"
import ProductListItemShow from "./ProductListItemShow"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"

export interface AllProducts {
	boards: Board[]
	coasters: Coaster[]
}

const ProductIndex: React.FC = memo(() => {
	const [allProductData, setAllProductData] = useState<AllProducts | null>(null)
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

	const handleDeleteProduct = async (itemId: number, category: string) => {
		const accessToken = localStorage.getItem("accessToken")
		const response = await Requests.DELETE(
			`/subapps/mycuttingboard/admin/delete-product/${itemId}/${category}`,
			accessToken as string
		)
		if (response.status === 200) {
			alert("Product deleted successfully")
			getAllProductData()
		}
	}

	useEffect(() => {
		getAllProductData()
	}, [])

	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem", maxWidth: "600px", margin: "0 auto" }}>
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
						Boards
					</Typography>
					{allProductData ? (
						allProductData?.boards?.map((board: Board) => (
							<ProductListItemShow
								key={board.id}
								item_id={board.id}
								item_description={board.board_description}
								item_image_url={board.board_image_url}
								item_category="boards"
								handle_delete_product={handleDeleteProduct}
							/>
						))
					) : (
						<CircularProgress />
					)}
				</List>
				<List>
					<Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
						Coasters
					</Typography>
					{allProductData ? (
						allProductData?.coasters?.map((coaster: Coaster) => (
							<ProductListItemShow
								key={coaster.id}
								item_id={coaster.id}
								item_description={coaster.coaster_description}
								item_image_url={coaster.coaster_image_url}
								item_category="coasters"
								handle_delete_product={handleDeleteProduct}
							/>
						))
					) : (
						<CircularProgress />
					)}
				</List>
			</Box>
		</>
	)
})

export default ProductIndex
