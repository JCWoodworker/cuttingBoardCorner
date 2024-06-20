import { useState, useEffect, memo } from "react"
import {
	Table,
	CircularProgress,
	List,
	Typography,
	TableRow,
	TableCell,
	TableHead,
	TableBody,
  Box,
} from "@mui/material"
import { Requests, UserType } from "../../../requests/Requests"

// import UserListItem from "./UserListItem"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"

const UserIndex: React.FC = memo(() => {
	const [allUserData, setAllUserData] = useState<UserType[] | null>(null)

	const tableRows = allUserData?.map((user) => {
		return (
			<TableRow
				key={user.id}
				sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
			>
				<TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
				<TableCell>{user.email}</TableCell>
				<TableCell>{user.role}</TableCell>
        <TableCell>{user.id}</TableCell>
			</TableRow>
		)
	})
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

	// const handleDeleteUser = async (itemId: number) => {
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
	// 			getAllUserData()
	// 		}
	// 	} else {
	// 		return
	// 	}
	// }

	useEffect(() => {
		getAllUserData()
	}, [])

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
				<List>
					<Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
						User List
					</Typography>
					{allUserData ? (
						<Box sx={{ width: "100%", overflowX: "auto" }}>
							<Table>
								<TableHead>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Role</TableCell>
                  <TableCell>ID</TableCell>
								</TableHead>
								<TableBody>{tableRows}</TableBody>
							</Table>
						</Box>
					) : (
						<CircularProgress />
					)}
				</List>
			</MainComponentLayout>
		</>
	)
})

export default UserIndex
