import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import useBaseUrl from "../utils/use-base-url"

import BoardDataShow from "./BoardDataShow"
import NotFound from "./NotFound"
import { Box, PaletteMode } from "@mui/material"
import NavDrawer from "../navigation/NavDrawer"

interface Props {
	loggedIn: boolean
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	themeProp: PaletteMode
	setThemeProp: React.Dispatch<React.SetStateAction<PaletteMode>>
}

const BoardDataIndex: React.FC<Props> = ({
	loggedIn,
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
			<NavDrawer
				loggedIn={loggedIn}
				themeProp={themeProp}
				setThemeProp={setThemeProp}
				setLoggedIn={setLoggedIn}
			/>
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
				{error ? <NotFound /> : <BoardDataShow boardData={boardData} />}{" "}
			</Box>
		</>
	)
}

export default BoardDataIndex
