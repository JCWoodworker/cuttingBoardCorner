import { Box } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"

interface Props {
	children: React.ReactNode
}

const MainComponentLayout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<NavDrawer />
			<Box
				sx={{
					pt: "3rem",
					maxWidth: {
						xs: "95%",
						sm: "90%",
						// md: "800px",
					},
					margin: "0 auto",
				}}
			>
				{children}
			</Box>
		</>
	)
}

export default MainComponentLayout
