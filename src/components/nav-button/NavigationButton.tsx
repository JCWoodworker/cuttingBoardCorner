import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ArrowBack, ArrowForward } from "@mui/icons-material"

interface Props {
	path: string
	text: string
	size?: "small" | "medium" | "large"
	icon?: "back" | "forward" | null
}

const NavigationButton: React.FC<Props> = ({
	path,
	text,
	size = "small",
	icon = null,
}) => {
	const navigate = useNavigate()
	return (
		<Button
			variant="outlined"
			onClick={() => navigate(path)}
			size={size}
			sx={{ flex: "auto" }}
		>
			{icon === "back" ? <ArrowBack fontSize="small" /> : null} {text}{" "}
			{icon === "forward" ? <ArrowForward fontSize="small" /> : null}
		</Button>
	)
}

export default NavigationButton
