import { Box, Typography } from "@mui/material"
import NavDrawer from "../../navigation/NavDrawer"

const AddNewProduct = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Typography variant="h4">Add New Product</Typography>
			</Box>
		</>
	)
}

export default AddNewProduct
