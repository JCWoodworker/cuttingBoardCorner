import { useState, useEffect, memo } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import { Requests } from "../../../requests/Requests"

import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import { ProductType } from "../../../pages/products/ProductDataIndex"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Delete, Edit } from "@mui/icons-material"

const ProductIndex: React.FC = memo(() => {
	const [allProductData, setAllProductData] = useState<ProductType[] | null>(
		null
	)
	const navigate = useNavigate()
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

	const handleDeleteProduct = async (itemId: number) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			const accessToken = localStorage.getItem(
				LocalStorageElements.ACCESS_TOKEN
			)
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
		{
			field: "actions",
			headerName: "",
			width: 100,
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						gap: "0.5rem",
					}}
				>
					<Edit
						fontSize="small"
						onClick={() => navigate(`/admin/edit-user/${params.row.id}`)}
					/>
					<Delete
						fontSize="small"
						sx={{ color: "red" }}
						onClick={() => handleDeleteProduct(params.row.id)}
					/>
				</Box>
			),
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
