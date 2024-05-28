import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import NavDrawer from "../../navigation/NavDrawer"

const InventoryIndex = () => {
	return (
		<>
      <NavDrawer />
			<Box sx={{ pt: "3rem" }}>Inventory Index</Box>
			<Outlet />
		</>
	)
}

export default InventoryIndex
