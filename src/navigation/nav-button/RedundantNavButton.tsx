import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

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
	const navigate = useNavigate()
	return (
		<Button
			variant="outlined"
			onClick={() => navigate(path)}
			size={size}
			sx={{ flex: "auto" }}
		>
			{text}
		</Button>
	)
}

export default RedundantNavButton
