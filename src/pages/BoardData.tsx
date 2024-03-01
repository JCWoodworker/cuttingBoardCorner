import { useEffect } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"
import { getBackendUrl } from "../utils/getBackendUrl"
import useBoardData from "../hooks/useBoardData"

import BoardDataShow from "./BoardDataShow"

const BoardData = () => {
	const { boardId } = useParams()
	const { boardData, setBoardData } = useBoardData()

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
	}, [])

	return (
		<>
			<BoardDataShow boardData={boardData} />
		</>
	)
}

export default BoardData
