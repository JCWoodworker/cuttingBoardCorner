import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import { getBackendUrl } from "../utils/getBackendUrl"

import BoardDataShow from "./BoardDataShow"
import NotFound from "./NotFound"

const BoardDataIndex = () => {
	const { boardId } = useParams()
	const [boardData, setBoardData] = useState({})
	const [error, setError] = useState<boolean>(false)

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

	useEffect(() => {
		fetchBoardData()
	}, [boardId])

	return <>{error ? <NotFound /> : <BoardDataShow boardData={boardData} />}</>
}

export default BoardDataIndex
