import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import { getBackendUrl } from "../utils/getBackendUrl"

import CoasterDataShow from "./CoasterDataShow"
import NotFound from "./NotFound"
import { Box, PaletteMode } from "@mui/material"
import CocktailGenerator from "../components/CocktailGenerator"
import Contact from "./Contact"
import Divider from "@mui/material/Divider"
import GuestNavDrawer from "../navigation/GuestNavDrawer"

interface Props {
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const CoasterDataIndex: React.FC<Props> = ({
	setLoggedIn,
	themeProp,
	setThemeProp,
}) => {
	const { coasterId } = useParams()

	const [coasterData, setCoasterData] = useState({})
	const [error, setError] = useState<boolean>(false)

	useMemo(() => {
		const fetchCoasterData = async () => {
			try {
				const urlPrefix = await getBackendUrl()
				const response = await axios.get(
					`${urlPrefix}/subapps/mycuttingboard/coasters/${coasterId}`
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
			<GuestNavDrawer
				themeProp={themeProp}
				setThemeProp={setThemeProp}
				setLoggedIn={setLoggedIn}
			/>
			<Box
				sx={{
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
				<Divider sx={{ my: 2, width: "100%" }} />
				<Contact />
			</Box>
		</>
	)
}

export default CoasterDataIndex
