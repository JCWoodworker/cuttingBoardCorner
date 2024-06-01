import { useState, useEffect } from "react"
import {
	Box,
	CircularProgress,
	Grid,
	List,
	ListItem,
	Typography,
} from "@mui/material"
import { Requests } from "../../requests/Requests"

import NavDrawer from "../../navigation/NavDrawer"

interface Board {
	id: number
	user_id: string
	board_type: string
	board_description: string
	customer_message: string
	board_image_url: string
}

interface Coaster {
	id: number
	user_id: string
	coaster_type: string
	coaster_description: string
	customer_message: string
	coaster_image_url: string
}

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
				<Typography variant="h4">All Boards</Typography>
				{/* <List>
				{allProductData ? (
					allProductData?.boards?.map((board: Board) => (
						<Typography key={board.id} variant="body1">
							<img
								className="product-thumbnail"
								src={board.board_image_url}
								alt={board.board_description}
							/>
						</Typography>
					))
				) : (
					<CircularProgress />
				)}
				</List> */}
				<Typography variant="h4">All Coasters</Typography>
				<Grid container spacing={1}>
					{allProductData?.coasters?.map((coaster: Coaster) => (
						<Grid item xs={12} sm={6} md={4} key={coaster.id}>
							{" "}
							{/* Adjust column sizes for responsiveness */}
							<img
								className="product-thumbnail"
								src={coaster.coaster_image_url}
								alt={coaster.coaster_description}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	)
}

export default ProductIndex
