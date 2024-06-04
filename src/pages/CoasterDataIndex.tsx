import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Divider } from "@mui/material"
import { Requests } from "../requests/Requests"

import CoasterDataShow from "./CoasterDataShow"
import CocktailGenerator from "../components/CocktailGenerator"
import Contact from "./Contact"
import NotFound from "./NotFound"
import MainComponentLayout from "../layouts/MainComponentLayout"

export interface Coaster {
	id: number
	user_id: string
	coaster_type: string
	coaster_description: string
	customer_message: string
	coaster_image_url: string
}


const CoasterDataIndex: React.FC = () => {
	const { coasterId } = useParams()

	const [coasterData, setCoasterData] = useState({})
	const [error, setError] = useState<boolean>(false)

	useMemo(() => {
		const fetchCoasterData = async () => {
			try {
				const response = await Requests.GET(
					`/subapps/mycuttingboard/coasters/${coasterId}`,
					false,
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
			<MainComponentLayout>
				{error ? <NotFound /> : <CoasterDataShow coasterData={coasterData} />}{" "}
				<Divider sx={{ my: 2, width: "100%" }} />
				<CocktailGenerator />
				<Contact />
			</MainComponentLayout>
		</>
	)
}

export default CoasterDataIndex
