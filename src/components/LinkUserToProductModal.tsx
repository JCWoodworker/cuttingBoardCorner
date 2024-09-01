import {
	SelectChangeEvent,
	FormLabel,
	Select,
	MenuItem,
	Modal,
	Box,
	Button,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import {
	NewUserProductAndDataType,
	Requests,
	UserType,
} from "../requests/Requests"
import useUserStore from "../zustand/userStore"
import { modalStyle } from "../utils/modalStyle"
import { LocalStorageElements } from "../utils/clearLocalStorage"

interface Props {
	productId: number
	addUserModelIsOpen: boolean
	setAddUserModelIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LinkUserToProductModal: React.FC<Props> = ({
	productId,
	addUserModelIsOpen,
	setAddUserModelIsOpen,
}) => {
	const { allUserData, getAllUserData } = useUserStore()
	const [userToConnectToProduct, setUserToConnectToProduct] =
		useState<UserType | null>(null)

	useEffect(() => {
		!allUserData && getAllUserData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleUserToProductConnectionChange = (
		event: SelectChangeEvent<unknown>
	) => {
		const selectedUser = allUserData?.find(
			(user) => user.id === event.target.value
		)
		if (selectedUser) {
			setUserToConnectToProduct(selectedUser)
		}
	}

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		const payload: NewUserProductAndDataType = {
			user_id: userToConnectToProduct!.id,
			product_id: productId,
		}
		try {
			const response = await Requests.POST(
				"/subapps/mycuttingboard/admin/user-and-product/add",
				payload,
				true,
				accessToken as string
			)
			if (response.status === 201) {
				alert(
					`${userToConnectToProduct?.first_name} ${userToConnectToProduct?.last_name} has been linked`
				)
				setAddUserModelIsOpen(false)
			}
		} catch (error) {
			console.log(error)
			alert(
				"There was an error, but we're not sure what happened.  Many apologies."
			)
		}
	}

	return (
		<Modal
			open={addUserModelIsOpen}
			onClose={() => setAddUserModelIsOpen(false)}
		>
			<Box sx={modalStyle}>
				<form onSubmit={handleFormSubmit}>
					<FormLabel sx={{ width: "100%", textAlign: "left" }}>
						Link to user / Change linked user:
					</FormLabel>
					<Select
						name="userToProductConnection"
						value={userToConnectToProduct?.id || ""}
						onChange={handleUserToProductConnectionChange}
						displayEmpty
						sx={{ width: "100%" }}
					>
						<MenuItem value="" disabled>
							Select a user
						</MenuItem>
						{allUserData?.map((user) => (
							<MenuItem key={user.id} value={user.id}>
								{user.last_name}, {user.first_name} - {user.email}
							</MenuItem>
						))}
					</Select>
					<Button type="submit">Set User</Button>
				</form>
			</Box>
		</Modal>
	)
}

export default LinkUserToProductModal
