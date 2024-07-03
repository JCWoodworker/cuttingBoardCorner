import { Box, Divider, Typography } from "@mui/material"
import { ProductType } from "../pages/products/ProductDataIndex"

interface Props {
	selectedProduct: ProductType | null
}

const AdminProductShow: React.FC<Props> = ({ selectedProduct }) => {
	return (
		<>
			{selectedProduct && (
				<>
					<Box sx={{ m: "1rem" }}>
						<Box
							sx={{
								margin: "0 auto",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "flex-start",
								// border: "1px solid rgba(121, 121, 121, 0.7)",
								borderRadius: "0.25rem",
							}}
						>
							<img
								src={selectedProduct?.image_url}
								style={{
									margin: "1rem",
									width: "auto",
									height: "100px",
									alignSelf: "center",
									borderRadius: "1rem",
									boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
								}}
								alt={selectedProduct?.description}
								loading="lazy"
							/>
							<Typography variant="body1">Title: {selectedProduct?.title}</Typography>
              <Typography variant="body1">Type: {selectedProduct?.type}</Typography>
              <Typography variant="body1">Description: {selectedProduct?.description}</Typography>
              <Typography variant="body1">Customer Message: {selectedProduct?.customer_message}</Typography>
              <Typography variant="body1">User ID: {selectedProduct?.user_id}</Typography>
						</Box>
					</Box>
					<Divider sx={{ m: "1rem" }} />
				</>
			)}
		</>
	)
}

export default AdminProductShow
