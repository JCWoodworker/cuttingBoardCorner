import { Box, Button } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"

interface Props {
	itemId: number
	category: string
	handle_delete_product: (itemId: number, category: string) => void
}

const ProductListItemActionButtons: React.FC<Props> = ({
	itemId,
	category,
	handle_delete_product,
}) => {
	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (e.currentTarget.name === "edit") {
			alert("Cannot edit products yet")
		} else if (e.currentTarget.name === "delete") {
			handle_delete_product(itemId, category)
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button name="edit" onClick={handleClick}>
				<Edit fontSize="small" />
			</Button>
			<Button name="delete" onClick={handleClick}>
				<Delete fontSize="small" />
			</Button>
		</Box>
	)
}

export default ProductListItemActionButtons
