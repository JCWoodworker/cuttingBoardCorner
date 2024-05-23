import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import useBaseUrl from "../utils/use-base-url"

import BoardDataShow from "./BoardDataShow"
import NotFound from "./NotFound"
import { Box, PaletteMode } from "@mui/material"
import GuestNavDrawer from "../navigation/GuestNavDrawer"

// Need to create a type for boardData

interface Props {
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const BoardDataIndex: React.FC<Props> = ({
	setLoggedIn,
	themeProp,
	setThemeProp,
}) => {
	const { boardId } = useParams()
	const [boardData, setBoardData] = useState({})
	const [error, setError] = useState<boolean>(false)
	const urlPrefix = useBaseUrl()

	useMemo(() => {
		const fetchBoardData = async () => {
			try {
				const response = await axios.get(
					`${urlPrefix}/subapps/mycuttingboard/boards/${boardId}`
				)
				if (response.status === 200) {
					const data = await response.data
					setBoardData(data)
				} else {
					setError(true)
				}
			} catch (error) {
				setError(true)
			}
		}

		fetchBoardData()
	}, [boardId, urlPrefix])

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
				{error ? <NotFound /> : <BoardDataShow boardData={boardData} />}{" "}
			</Box>
		</>
	)
}

export default BoardDataIndex
