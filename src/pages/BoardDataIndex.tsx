import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Requests } from "../requests/Requests"

import BoardDataShow from "./BoardDataShow"
import Contact from "./Contact"
import NotFound from "./NotFound"
import MainComponentLayout from "../layouts/MainComponentLayout"

export interface Board {
	id: number
	user_id: string
	board_type: string
	board_description: string
	customer_message: string
	board_image_url: string
}

const BoardDataIndex: React.FC = () => {
	const { boardId } = useParams()
	const [boardData, setBoardData] = useState({})
	const [error, setError] = useState<boolean>(false)

	useMemo(() => {
		const fetchBoardData = async () => {
			try {
				const response = await Requests.GET(
					`/subapps/mycuttingboard/boards/${boardId}`,
					false,
					false
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
		<>
			<MainComponentLayout>
				{error ? <NotFound /> : <BoardDataShow boardData={boardData} />}{" "}
			</MainComponentLayout>
			<Contact />
		</>
	)
}

export default BoardDataIndex
