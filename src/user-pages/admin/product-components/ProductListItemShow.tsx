import { ListItem, Typography } from "@mui/material"
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
				<img
					className="product-thumbnail"
					src={item_image_url}
					alt={item_description}
				/>
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
