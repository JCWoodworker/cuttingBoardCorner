import { Box, Divider, Typography } from "@mui/material"
import NotFound from "../../NotFound"
import CaringForYourBoard from "../../CaringForYourBoard"
import ImageContainer from "../../../components/ImageContainer"
import { ProductType } from "../ProductDataIndex"
import CocktailGenerator from "../../../components/CocktailGenerator"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	productData: ProductType
}

const ProductDataShow: React.FC<Props> = ({ productData }) => {
	if (!productData) {
		return <NotFound />
	}
	const { type } = productData

	return (
		<Box>
			<Box>
				<Typography variant="h3">My {productData.title}</Typography>
				<Typography variant="body1">{productData.description}</Typography>
				<Typography variant="subtitle2">ID: {productData.id}</Typography>
				<ImageContainer
					url={productData.image_url}
					description={productData.description}
					type="cutting-board"
				/>{" "}
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{productData.customer_message}
				</Typography>
				<br />
			</Box>
			<Divider sx={{ my: 2, width: "100%" }} />
			{type === "board" && <CaringForYourBoard />}
			{type === "coaster" && <CocktailGenerator />}
		</Box>
	)
}

export default ProductDataShow
