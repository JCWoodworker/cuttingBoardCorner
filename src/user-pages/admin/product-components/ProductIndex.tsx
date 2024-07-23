import { useState, useEffect, memo } from "react"
// import { useNavigate } from "react-router-dom"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { GridRowParams } from "@mui/x-data-grid"

import { Requests } from "../../../requests/Requests"
import { ProductType } from "../../../pages/products/ProductDataIndex"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"
import RedundantNavButtonLayout from "../../../navigation/RedundantNavButtonLayout"

import MainComponentLayout from "../../../layouts/MainComponentLayout"
import AdminProductShow from "../../../components/AdminProductShow"
import useThemeContext from "../../../hooks/use-theme-context"

const ProductIndex: React.FC = memo(() => {
	const [allProductData, setAllProductData] = useState<ProductType[] | null>(
		null
	)
	const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
		null
	)
	const { theme } = useThemeContext()

	const handleRowClick = (params: GridRowParams) => {
		setSelectedProduct(params.row)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

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
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center",
						height: "100%",
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
				<RedundantNavButtonLayout buttonOptionArray={["admin", "newProduct"]} />
				<AdminProductShow
					selectedProduct={selectedProduct}
					setSelectedProduct={setSelectedProduct}
					getAllProductData={getAllProductData}
				/>
				<Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
					Product List
				</Typography>

				{/* This DataGrid would be better served as it's own component */}
				{allProductData ? (
					<DataGrid
						className={
							theme === "dark"
								? "button-shadow-dark-mode"
								: "button-shadow-light-mode"
						}
						rows={allProductData}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 10 },
							},
						}}
						pageSizeOptions={[20, 50, 100]}
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
						onRowClick={handleRowClick}
						getRowId={(row) => row.id}
					/>
				) : (
					<CircularProgress />
				)}
			</MainComponentLayout>
		</>
	)
})

export default ProductIndex
