import { useEffect, useState } from "react"
import { Box, Divider, Skeleton, Typography } from "@mui/material"
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
	const [imageLoaded, setImageLoaded] = useState(false)
	const { type, image_url } = productData

	useEffect(() => {
		const img = new Image()
		img.src = image_url
		img.onload = () => setImageLoaded(true)
	}, [image_url])

	if (!productData) {
		return <NotFound />
	}

	return (
		<Box>
			<Box>
				<Typography variant="h3">My {productData.title}</Typography>
				<Typography variant="body1">{productData.description}</Typography>
				{!imageLoaded && (
					<Skeleton
					variant="rectangular"
					width="300px"
					height="200px"
					sx={{ margin: "0 auto", borderRadius: "5px" }}
					animation="wave"
					/>
				)}
				{imageLoaded && (
					<ImageContainer
					url={productData.image_url}
					description={productData.description}
					type="cutting-board"
					/>
				)}
				<Typography variant="subtitle2">ID: {productData.id}</Typography>
				<br />
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
