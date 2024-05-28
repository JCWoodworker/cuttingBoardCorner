import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { Requests } from "../../requests/Requests"

import NavDrawer from "../../navigation/NavDrawer"

const ProductIndex = () => {
	const [testMessage, setTestMessage] = useState<string>("")

	const getMessage = async () => {
		const accessToken = localStorage.getItem("accessToken")
		const response = await Requests.GET(
			"/subapps/mycuttingboard/admin/test-message",
			false,
			true,
			accessToken as string
		)
		setTestMessage(response.data.message)
	}
	
	useEffect(() => {
		getMessage()
	}, [])

	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Typography variant="h4">All Products</Typography>
				{testMessage ? (
					<Typography variant="body1">{testMessage}</Typography>
				) : (
					<Typography variant="body1">No Test Message</Typography>
				)}
			</Box>
		</>
	)
}

export default ProductIndex
