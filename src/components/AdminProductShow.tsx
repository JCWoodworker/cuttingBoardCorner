import { Box, Divider } from "@mui/material"
import useThemeContext from "../hooks/use-theme-context"
import useProductStore from "../zustand/productStore"

import AdminProductEditForm from "./AdminProductEditForm"

const AdminProductShow: React.FC = () => {
	const { selectedProduct } = useProductStore()
	const { theme } = useThemeContext()

	return (
		<>
			{selectedProduct && (
				<>
					<Box
						className="admin-product-show"
						sx={{ m: "0 auto", maxWidth: { xs: "100%", md: "800px" } }}
					>
						<img
							className="admin-product-image"
							src={selectedProduct?.image_url}
							style={{
								margin: "1rem",
								width: "auto",
								height: "100px",
								alignSelf: "center",
								borderRadius: "1rem",
								boxShadow:
									theme === "dark"
										? "0 0 10px rgba(255, 255, 255, 0.5)"
										: "0 0 10px rgba(0, 0, 0, 0.5)",
							}}
							alt={selectedProduct?.description}
							loading="lazy"
						/>
						<AdminProductEditForm />
					</Box>
					<Divider sx={{ mb: "1rem" }} />
				</>
			)}
		</>
	)
}

export default AdminProductShow
