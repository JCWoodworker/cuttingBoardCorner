import { useState, useEffect, memo } from "react"
import { CircularProgress, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Requests, UserType } from "../../../requests/Requests"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"

const UserIndex: React.FC = memo(() => {
	const [allUserData, setAllUserData] = useState<UserType[] | null>(null)
	const getAllUserData = async () => {
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		const response = await Requests.GET(
			"/subapps/mycuttingboard/admin/all-users",
			false,
			true,
			accessToken as string
		)
		// debugger
		setAllUserData(response.data)
	}

	// const handleDeleteUser = async (userId: string) => {
	// 	if (window.confirm("Are you sure you want to delete this product?")) {
	// 		const accessToken = localStorage.getItem(
	// 			LocalStorageElements.ACCESS_TOKEN
	// 		)
	// 		const response = await Requests.DELETE(
	// 			`/subapps/mycuttingboard/admin/delete-product/${userId}`,
	// 			accessToken as string
	// 		)
	// 		if (response.status === 200) {
	// 			alert("Product deleted successfully")
	// 			getAllUserData()
	// 		}
	// 	} else {
	// 		return
	// 	}
	// }

	useEffect(() => {
		getAllUserData()
	}, [])

	const columns: GridColDef[] = [
		{
			field: "first_name",
			headerName: "First Name",
			width: 140,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "last_name",
			headerName: "Last Name",
			width: 140,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "role",
			headerName: "Role",
			width: 100,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "id",
			headerName: "ID",
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
					User List
				</Typography>
				{allUserData ? (
					<DataGrid
						rows={allUserData}
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

export default UserIndex
