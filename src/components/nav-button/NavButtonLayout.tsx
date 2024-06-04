import { Box } from "@mui/material"

interface Props {
	children: React.ReactNode
}

const NavButtonLayout: React.FC<Props> = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<Box
			sx={{
				padding: "1rem 0",
				width: "100%",
				margin: "0 auto",
				maxWidth: "350px",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				alignItems: "center",
				gap: "0.5rem",
			}}
		>
			{children}
		</Box>
	)
}

export default NavButtonLayout
