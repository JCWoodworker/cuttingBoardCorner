import { useEffect, useState } from "react"
import { Box, Divider, Skeleton, Typography } from "@mui/material"

import { ProductType } from "../ProductDataIndex"
import { SkeletonPropEnums } from "../../../enums/enums"
import CocktailGenerator from "../../../components/CocktailGenerator"
import RedundantNavButtonLayout from "../../../navigation/nav-button/RedundantNavButtonLayout"

import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"

import NotFound from "../../NotFound"
import ImageContainer from "../../../components/ImageContainer"

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
		<MainComponentLayout>
			<Box>
				<ComponentTitle text={productData.title} />
				<Typography variant="body1">{productData.description}</Typography>
				{!imageLoaded && (
					<Skeleton
						variant={SkeletonPropEnums.VARIANT}
						width="300px"
						height="200px"
						sx={{ margin: "0 auto", borderRadius: "5px" }}
						animation={SkeletonPropEnums.ANIMATION}
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
			<RedundantNavButtonLayout buttonOptionArray={["careAndMaintenance"]} />
			<Divider sx={{ my: 2, width: "100%" }} />
			{type === "coaster" && <CocktailGenerator />}
		</MainComponentLayout>
	)
}

export default ProductDataShow
