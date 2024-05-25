import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import { Requests } from "../requests/Requests"

import BoardDataShow from "./BoardDataShow"
import Contact from "./Contact"
import NotFound from "./NotFound"
import NavDrawer from "../navigation/NavDrawer"

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
			<NavDrawer />
			<Box
				sx={{
					pt: "3rem",
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
			<Contact />
		</>
	)
}

export default BoardDataIndex
