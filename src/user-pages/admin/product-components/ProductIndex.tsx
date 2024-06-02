import { useState, useEffect } from "react"
import { Box, CircularProgress, List, Typography } from "@mui/material"
import { Requests } from "../../../requests/Requests"

import NavDrawer from "../../../navigation/NavDrawer"
import { Board } from "../../../pages/BoardDataIndex"
import { Coaster } from "../../../pages/CoasterDataIndex"
import ProductListItemShow from "./ProductListItemShow"

interface AllProducts {
	boards: Board[]
	coasters: Coaster[]
}

const ProductIndex = () => {
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

	useEffect(() => {
		getAllProductData()
	}, [])

	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<List>
					<Typography variant="h4">Boards</Typography>
					{allProductData ? (
						allProductData?.boards?.map((board: Board) => (
							<ProductListItemShow
								key={board.id}
								item_id={board.id}
								item_description={board.board_description}
								item_image_url={board.board_image_url}
							/>
						))
					) : (
						<CircularProgress />
					)}
				</List>
				<List>
					<Typography variant="h4">Coasters</Typography>
					{allProductData?.coasters?.map((coaster: Coaster) => (
						<ProductListItemShow
							key={coaster.id}
							item_id={coaster.id}
							item_description={coaster.coaster_description}
							item_image_url={coaster.coaster_image_url}
						/>
					))}
				</List>
			</Box>
		</>
	)
}

export default ProductIndex
