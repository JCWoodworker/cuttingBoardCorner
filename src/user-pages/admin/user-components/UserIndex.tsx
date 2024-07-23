import { useEffect, memo } from "react"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import { Delete, Edit } from "@mui/icons-material"
import RedundantNavButtonLayout from "../../../navigation/RedundantNavButtonLayout"
import useUserStore from "../../../zustand/userStore"

const UserIndex: React.FC = memo(() => {
	const { allUserData, getAllUserData, deleteUser } = useUserStore(); // use the store
	const navigate = useNavigate()


	useEffect(() => {
		getAllUserData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
			width: 310,
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
						onClick={() => navigate(`/admin/edit-user/${params.value}`)}
					/>
					<Delete
						fontSize="small"
						sx={{ color: "red" }}
						onClick={() => deleteUser(params.row.id)}
					/>
				</Box>
			),
		},
	]

	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={["admin", "newProduct"]} />
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
							sorting: {
								sortModel: [{ field: "last_name", sort: "desc" }],
							}
						}}
						pageSizeOptions={[10, 20, 50, 100]}
						sx={{
							margin: "0 auto",
							width: "100%",
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
