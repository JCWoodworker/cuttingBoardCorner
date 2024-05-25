import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Box, Divider} from "@mui/material"
import { Requests } from "../requests/Requests"

import CoasterDataShow from "./CoasterDataShow"
import CocktailGenerator from "../components/CocktailGenerator"
import Contact from "./Contact"
import NavDrawer from "../navigation/NavDrawer"
import NotFound from "./NotFound"

const CoasterDataIndex: React.FC = () => {
	const { coasterId } = useParams()
	
	const [coasterData, setCoasterData] = useState({})
	const [error, setError] = useState<boolean>(false)

	useMemo(() => {
		const fetchCoasterData = async () => {
			try {
				const response = await Requests.GET(
					`/subapps/mycuttingboard/coasters/${coasterId}`,
					false
				)
				if (response.status === 200) {
					const data = await response.data
					setCoasterData(data)
				} else {
					setError(true)
				}
			} catch (error) {
				setError(true)
			}
		}

		fetchCoasterData()
	}, [coasterId])

	return (
		<>
			<NavDrawer />
			<Box
				sx={{
					pt: 5,
					margin: "0 auto",
					display: "grid",
					placeItems: "center",
					textAlign: "center",
					width: {
						xs: 300,
						md: 500,
					},
				}}
			>
				{error ? <NotFound /> : <CoasterDataShow coasterData={coasterData} />}{" "}
				<Divider sx={{ my: 2, width: "100%" }} />
				<CocktailGenerator />
				<Contact />
			</Box>
		</>
	)
}

export default CoasterDataIndex
