import { useEffect, useState } from "react"
import { Box, ListItem, Skeleton, Typography } from "@mui/material"
import ProductListItemActionButtons from "./ProductListItemActionButtons"

interface Props {
	item_id: number
	item_title: string
	item_description: string
	item_image_url: string
	item_category: string
	handle_delete_product: (itemId: number, category: string) => void
}

const ProductListItemShow: React.FC<Props> = ({
	item_id,
	item_title,
	item_description,
	item_image_url,
	item_category,
	handle_delete_product,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = item_image_url
		img.onload = () => setImageLoaded(true)
	}, [item_image_url])

	return (
		<>
			<ListItem
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					gap: 2,
				}}
				divider
				key={item_id}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: 1,
					}}
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
						<img className="product-thumbnail" src={item_image_url} />
					)}
				</Box>
				<Typography
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
					}}
				>
					{item_title}
				</Typography>
				<Typography
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: { xs: "none", sm: "block" },
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
					}}
				>
					{item_description}
				</Typography>
				<ProductListItemActionButtons
					itemId={item_id}
					category={item_category}
					handle_delete_product={handle_delete_product}
				/>
			</ListItem>
		</>
	)
}

export default ProductListItemShow
