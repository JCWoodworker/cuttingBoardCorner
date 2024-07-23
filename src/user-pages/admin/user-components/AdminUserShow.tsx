// import { useState } from "react"
import { Box, Divider, Typography } from "@mui/material"
import useUserStore from "../../../zustand/userStore"
const AdminProductShow: React.FC = () => {
	const { selectedUser } = useUserStore()

	return (
		<>
			{selectedUser && (
				<>
					<Box
						className="admin-user-show"
						sx={{ m: "0 auto", mb: "1rem", maxWidth: { xs: "100%", md: "800px" } }}
					>
						<Typography variant="h6">{`${selectedUser?.first_name} ${selectedUser?.last_name}`}</Typography>
            <Typography variant="body1">{selectedUser?.email}</Typography>
            <Typography variant="body1"><strong>Role:</strong> {selectedUser?.role}</Typography>
            <Typography variant="body1"><strong>ID:</strong> {selectedUser?.id}</Typography>
					</Box>
					<Divider sx={{ mb: "1rem" }} />
				</>
			)}
		</>
	)
}

export default AdminProductShow
