import { Box, Typography } from "@mui/material"

import NavDrawer from "../../navigation/NavDrawer"

const ProductIndex = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Typography variant="h4">All Products</Typography>
			</Box>
		</>
	)
}

export default ProductIndex
