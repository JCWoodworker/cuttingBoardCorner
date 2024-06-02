import { useState, useEffect } from "react"
import {
	Box,
	CircularProgress,
	List,
	ListItem,
	Typography,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { Requests } from "../../requests/Requests"

import NavDrawer from "../../navigation/NavDrawer"
import { Board } from "../../pages/BoardDataIndex"
import { Coaster } from "../../pages/CoasterDataIndex"

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
							<ListItem
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									gap: 2,
								}}
								divider
								key={board.id}
							>
								<img
									className="product-thumbnail"
									src={board.board_image_url}
									alt={board.board_description}
								/>
								<Typography
									sx={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										display: "-webkit-box",
										WebkitLineClamp: 2,
										WebkitBoxOrient: "vertical",
									}}
								>
									{board.board_description}
								</Typography>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										gap: 2,
									}}
								>
									<Edit fontSize="small" />
									<Delete fontSize="small" />
								</Box>
							</ListItem>
						))
					) : (
						<CircularProgress />
					)}
				</List>
				<List>
					<Typography variant="h4">Coasters</Typography>
					{allProductData?.coasters?.map((coaster: Coaster) => (
						<ListItem
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
								gap: 2,
							}}
							divider
							key={coaster.id}
						>
							<img
								className="product-thumbnail"
								src={coaster.coaster_image_url}
								alt={coaster.coaster_description}
							/>
							<Typography
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
								}}
							>
								{coaster.coaster_description}
							</Typography>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									gap: 2,
								}}
							>
								<Edit fontSize="small" />
								<Delete fontSize="small" />
							</Box>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	)
}

export default ProductIndex
