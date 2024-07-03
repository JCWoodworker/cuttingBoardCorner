import { Box } from "@mui/material"
import ComponentTitle from "../layouts/ComponentTitle"

interface Props {
  productName: string | null
}

const AdminProductShow: React.FC<Props> = ({productName}) => {
	return (
		<Box sx={{ mt: "1rem" }}>
			<Box
				sx={{
					width: "600px",
					height: "400px",
          margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
          border: "1px solid rgba(121, 121, 121, 0.7)",
          borderRadius: "0.25rem",
				}}
			>
				<ComponentTitle text={productName?? "No Product Selected"} />
			</Box>
		</Box>
	)
}

export default AdminProductShow
