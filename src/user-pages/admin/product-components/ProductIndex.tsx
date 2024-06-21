import { useState, useEffect, memo } from "react"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import { Requests } from "../../../requests/Requests"

import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import { ProductType } from "../../../pages/products/ProductDataIndex"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

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

	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "ID",
			width: 82,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "image_url",
			headerName: "Image",
			width: 110,
			renderCell: (params) => (
				<Box // Wrap the Avatar in a Box component
					sx={{
						display: "flex", // Use flexbox for centering
						justifyContent: "flex-start", // Center horizontally
						alignItems: "center", // Center vertically
						height: "100%", // Match the cell height
					}}
				>
					<Avatar src={params.value} alt="Product Image" />
				</Box>
			),
		},
		{
			field: "title",
			headerName: "Title",
			width: 200,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "type",
			headerName: "Type",
			width: 100,
			renderCell: (params) => params.value ?? "-",
		},
	]

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
				<Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
					Product List
				</Typography>
				{allProductData ? (
					<DataGrid
						rows={allProductData}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 10 },
							},
						}}
						pageSizeOptions={[10, 20, 50, 100]}
						sx={{
							"& .MuiDataGrid-columnHeaders": {
								backgroundColor: "#f5f5f5",
							},
							"& .MuiDataGrid-cell": {
								borderBottom: "1px solid #ccc",
							},
							"& .MuiDataGrid-cell:hover": {
								cursor: "pointer",
							},
							"& .MuiDataGrid-cell:focus": {
								outline: "none",
							},
						}}
					/>
				) : (
					<CircularProgress />
				)}
			</MainComponentLayout>
		</>
	)
})

export default ProductIndex
