import { Typography } from "@mui/material"

interface Props {
	text: string
}

const ComponentTitle: React.FC<Props> = ({ text }) => {
	return <Typography variant="h4">{text}</Typography>
}

export default ComponentTitle
