import { Box, Typography } from "@mui/material"
import ComponentTitle from "../layouts/ComponentTitle"
import { ProductType } from "../pages/products/ProductDataIndex"

interface Props {
	selectedProduct: ProductType | null
}

const AdminProductShow: React.FC<Props> = ({ selectedProduct }) => {
	return (
		<>
			{selectedProduct && (
				<Box sx={{ mt: "1rem" }}>
					<Box
						sx={{
							margin: "0 auto",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							// border: "1px solid rgba(121, 121, 121, 0.7)",
							borderRadius: "0.25rem",
						}}
					>
						<ComponentTitle
							text={selectedProduct?.title ?? "No Product Selected"}
						/>

						<img
							src={selectedProduct?.image_url}
							style={{
                margin: "1rem",
								width: "auto",
								height: "100px",
								borderRadius: "1rem",
								boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
							}}
						/>
						<Typography variant="body1">
							<strong>Type:</strong> {selectedProduct?.type}
						</Typography>
						<Typography variant="body1">
							<strong>Description:</strong> {selectedProduct?.description}
						</Typography>
					</Box>
				</Box>
			)}
		</>
	)
}

export default AdminProductShow
