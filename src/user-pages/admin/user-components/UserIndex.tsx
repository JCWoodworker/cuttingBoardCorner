import { useEffect, memo } from "react"
import { CircularProgress, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid"

import useUserStore from "../../../zustand/userStore"

import MainComponentLayout from "../../../layouts/MainComponentLayout"
import RedundantNavButtonLayout from "../../../navigation/RedundantNavButtonLayout"

import AdminUserShow from "./AdminUserShow"

const UserIndex: React.FC = memo(() => {
	const { allUserData, getAllUserData, setSelectedUser } = useUserStore() // use the store
	const handleRowClick = (params: GridRowParams) => {
		setSelectedUser(params.row)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	useEffect(() => {
		getAllUserData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const columns: GridColDef[] = [
		{
			field: "first_name",
			headerName: "First Name",
			width: 100,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "last_name",
			headerName: "Last Name",
			width: 100,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "email",
			headerName: "Email",
			width: 150,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "role",
			headerName: "Role",
			width: 60,
			renderCell: (params) => params.value ?? "-",
		},
		{
			field: "id",
			headerName: "ID",
			width: 310,
			renderCell: (params) => params.value ?? "-",
		},
	]


	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={["admin", "newProduct"]} />
				<AdminUserShow />
				<Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
					User List
				</Typography>

				{/* This DataGrid would be better served as it's own re-usable component */}
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
							},
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

export default UserIndex
