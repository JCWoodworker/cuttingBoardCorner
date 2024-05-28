import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"

const InventoryIndex = () => {
	return (
		<>
			<Box>Inventory Index</Box>
			<Outlet />
		</>
	)
}

export default InventoryIndex
