import { useEffect, useState } from "react"
import { ListItem, Skeleton, Typography } from "@mui/material"
import ProductListItemActionButtons from "./ProductListItemActionButtons"

interface Props {
	item_id: number
	// item_type: string
	item_description: string
	item_image_url: string
}

const ProductListItemShow: React.FC<Props> = ({
	item_id,
	// item_type,
	item_description,
	item_image_url,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = item_image_url
		img.onload = () => setImageLoaded(true)
	}, [item_image_url])

	console.log(`${item_image_url}?w=70&h=70&fit=cover&auto=format`)

	return (
		<>
			<ListItem
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					gap: 2,
				}}
				divider
				key={item_id}
			>
				<Typography>{item_id}</Typography>
				{!imageLoaded && (
					<Skeleton
						variant="rectangular"
						width="70px"
						height="70px"
						sx={{ borderRadius: "5px" }}
						animation="wave"
					/>
				)}
				{imageLoaded && (
					<img
						className="product-thumbnail"
						src={`${item_image_url}?w=70&h=70&fit=cover`}
					/>
				)}
				<Typography
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
					}}
				>
					{item_description}
				</Typography>
				<ProductListItemActionButtons />
			</ListItem>
		</>
	)
}

export default ProductListItemShow
