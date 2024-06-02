import { Box, Button } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"

const ProductListItemActionButtons = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button onClick={() => alert("this action not active yet")}>
				<Edit fontSize="small" />
			</Button>
			<Button onClick={() => alert("this action not active yet")}>
				<Delete fontSize="small" />
			</Button>
		</Box>
	)
}

export default ProductListItemActionButtons
