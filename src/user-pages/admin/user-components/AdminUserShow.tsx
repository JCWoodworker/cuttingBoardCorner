// import { useState } from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import useUserStore from "../../../zustand/userStore"
import { Delete } from "@mui/icons-material"
import useThemeContext from "../../../hooks/use-theme-context"
const AdminProductShow: React.FC = () => {
	const { selectedUser, deleteUser } = useUserStore()
	const { theme } = useThemeContext()

	return (
		<>
			{selectedUser && (
				<>
					<Box
						className="admin-user-show"
						sx={{
							m: "0 auto",
							maxWidth: { xs: "100%", md: "800px" },
						}}
					>
						<Typography variant="h6">{`${selectedUser.first_name} ${selectedUser.last_name}`}</Typography>
						<Typography variant="body1">{selectedUser.email}</Typography>
						<Typography variant="body1">
							<strong>Role:</strong> {selectedUser.role}
						</Typography>
						<Typography variant="body1">
							<strong>ID:</strong> {selectedUser.id}
						</Typography>
					</Box>
					<Box>
						{/* <Button
							className={
								theme === "dark"
									? "button-shadow-dark-mode"
									: "button-shadow-light-mode"
							}
							variant="outlined"
							sx={{ m: "1rem", p: "0.5rem 1.5rem" }}
							color="success"
							type="submit"
						>
							<Save sx={{ color: "green" }} />
						</Button> */}
						<Button
							className={
								theme === "dark"
									? "button-shadow-dark-mode"
									: "button-shadow-light-mode"
							}
							variant="outlined"
							sx={{ m: "1rem", p: "0.5rem 1.5rem" }}
							color="error"
						>
							<Delete
								sx={{ color: "red" }}
								onClick={() => deleteUser(selectedUser.id)}
							/>
						</Button>
					</Box>
					<Divider sx={{ mb: "1rem" }} />
				</>
			)}
		</>
	)
}

export default AdminProductShow
