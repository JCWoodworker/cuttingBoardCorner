import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import { getBackendUrl } from "../utils/getBackendUrl"

import BoardDataShow from "./BoardDataShow"

const BoardData = () => {
	const { boardId } = useParams()
	const [boardData, setBoardData] = useState({})

	const fetchBoardData = async () => {
		try {
			const urlPrefix = await getBackendUrl()
			const response = await axios.get(
				`${urlPrefix}/subapps/mycuttingboard/boards/${boardId}`
			)
			if (response.status === 200) {
				setBoardData(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchBoardData()
	}, [boardId])

	return (
		<>
			<BoardDataShow boardData={boardData} />
		</>
	)
}

export default BoardData
