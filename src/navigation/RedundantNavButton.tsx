import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import useProductStore from "../zustand/productStore"
import useUserStore from "../zustand/userStore"

interface Props {
	path: string
	text: string
	size?: "small" | "medium" | "large"
}

const RedundantNavButton: React.FC<Props> = ({
	path,
	text,
	size = "small",
}) => {
	const { setSelectedProduct } = useProductStore()
	const { setSelectedUser } = useUserStore()
	const navigate = useNavigate()
	const handleButtonClick = () => {
		if (path === "/admin/all-inventory") {
			setSelectedProduct(null)
		} else if (path === "/admin/all-users") {
			setSelectedUser(null)
		}
		navigate(path)
	}
	return (
		<Button
			variant="outlined"
			onClick={handleButtonClick}
			size={size}
			sx={{ flex: "auto" }}
		>
			{text}
		</Button>
	)
}

export default RedundantNavButton
