import {
	SelectChangeEvent,
	FormLabel,
	Select,
	MenuItem,
	Modal,
	Box,
	Button,
} from "@mui/material"
import { useEffect, useState } from "react"
import { UserType } from "../requests/Requests"
import useUserStore from "../zustand/userStore"
import { modalStyle } from "../utils/modalStyle"

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

	return (
		<Modal open={addUserModelIsOpen} onClose={() => setAddUserModelIsOpen(false)}>
			<Box sx={modalStyle}>
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
				<Button>Set User</Button>
			</Box>
		</Modal>
	)
}

export default LinkUserToProductModal
