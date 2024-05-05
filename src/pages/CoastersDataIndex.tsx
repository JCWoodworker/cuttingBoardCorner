import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import { getBackendUrl } from "../utils/getBackendUrl"

import CoasterDataShow from "./CoasterDataShow"
import NotFound from "./NotFound"
import { Box } from "@mui/material"
import CocktailGenerator from "../components/CocktailGenerator"
import Contact from "./Contact"
import DividerLine from "../components/DividerLine"

const CoasterDataIndex: React.FC = () => {
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
			<DividerLine />
			<CocktailGenerator />
			<DividerLine />
			<Contact />
		</Box>
	)
}

export default CoasterDataIndex
