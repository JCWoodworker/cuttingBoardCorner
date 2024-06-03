import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ArrowBack, ArrowForward } from "@mui/icons-material"

interface Props {
	path: string
	text: string
	icon?: "back" | "forward" | null
}

const NavigationButton: React.FC<Props> = ({ path, text, icon = null }) => {
	let iconComponent: JSX.Element | null = null
	switch (icon) {
		case "back": {
			iconComponent = <ArrowBack fontSize="small"/>
			break
		}
		case "forward": {
			iconComponent = <ArrowForward  fontSize="small"/>
			break
		}
		default: {
			break
		}
	}

	const navigate = useNavigate()
	return (
		<Button variant="outlined" onClick={() => navigate(path)}>
			{icon ? iconComponent : null} {text}
		</Button>
	)
}

export default NavigationButton
