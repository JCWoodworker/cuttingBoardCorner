import { Box, Button } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"

interface Props {
	productId?: number
	handleDelete?: (id: number) => void
}

const ListItemActionButtons: React.FC<Props> = ({
	productId,
	handleDelete,
}) => {
	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (e.currentTarget.name === "edit") {
			alert("Cannot edit products yet")
		} else if (e.currentTarget.name === "delete" && handleDelete && productId) {
			handleDelete(productId)
		} else {
			alert("There was an issue with the button you just clicked")
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "flex-start",
			}}
		>
			<Button name="edit" onClick={handleClick}>
				<Edit fontSize="small" />
			</Button>
			{productId ?? (
				<Button name="delete" onClick={handleClick}>
					<Delete fontSize="small" />
				</Button>
			)}
		</Box>
	)
}

export default ListItemActionButtons
