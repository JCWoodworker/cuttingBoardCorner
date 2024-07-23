// import { useState } from "react"
import { Box, Divider } from "@mui/material"
import { ProductType } from "../pages/products/ProductDataIndex"
import useThemeContext from "../hooks/use-theme-context"

import AdminProductEditForm from "./AdminProductEditForm"

interface Props {
	selectedProduct: ProductType | null
	getAllProductData: () => void
	setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType | null>>
}

const AdminProductShow: React.FC<Props> = ({
	selectedProduct,
	getAllProductData,
	setSelectedProduct,
}) => {
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
							<AdminProductEditForm
								selectedProduct={selectedProduct}
								setSelectedProduct={setSelectedProduct}
								getAllProductData={getAllProductData}
							/>
					</Box>
					<Divider sx={{ mb: "1rem" }} />
				</>
			)}
		</>
	)
}

export default AdminProductShow
