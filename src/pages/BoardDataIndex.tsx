import { useState, useMemo } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import { getBackendUrl } from "../utils/getBackendUrl"

import BoardDataShow from "./BoardDataShow"
import NotFound from "./NotFound"
import { Box } from "@mui/material"

// Need to create a type for boardData

const BoardDataIndex = () => {
	const { boardId } = useParams()
	const [boardData, setBoardData] = useState({})
	const [error, setError] = useState<boolean>(false)

	useMemo(() => {
		const fetchBoardData = async () => {
			try {
				const urlPrefix = await getBackendUrl()
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
	}, [boardId])

	return (
		<Box
			sx={{
				m: "auto",
				display: "flex",
				justifyContent: "center",
				width: {
					xs: 300,
					md: 500,
				},
			}}
		>
			{error ? <NotFound /> : <BoardDataShow boardData={boardData} />}{" "}
		</Box>
	)
}

export default BoardDataIndex
