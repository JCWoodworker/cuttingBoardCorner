import { useState, useEffect } from "react"
import {
	Accordion,
	AccordionSummary,
	Box,
	CircularProgress,
	List,
	ListItem,
	Typography,
} from "@mui/material"
import { Requests } from "../../requests/Requests"
import NavDrawer from "../../navigation/NavDrawer"
import { AllProducts, Board, Coaster } from "./ProductIndex"

export const ProductIndex = () => {
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
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
					>
						All Boards
					</AccordionSummary>
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
							>
								<img
									className="product-thumbnail"
									src={board.board_image_url}
									alt={board.board_description}
								/>
								<Typography>{board.board_description}</Typography>
							</ListItem>
						))
					) : (
						<CircularProgress />
					)}
				</Accordion>
				<Typography variant="h4">All Coasters</Typography>
				<List>
					{allProductData?.coasters?.map((coaster: Coaster) => (
						<ListItem
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
								gap: 2,
							}}
						>
							<img
								className="product-thumbnail"
								src={coaster.coaster_image_url}
								alt={coaster.coaster_description}
							/>
							<Typography>{coaster.coaster_description}</Typography>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	)
}
