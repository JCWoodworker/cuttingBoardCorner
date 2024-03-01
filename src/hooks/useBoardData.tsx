import { useContext } from "react"
import { BoardDataContext } from "../context/BoardDataProvider"

export const useBoardData = () => {
	const { boardData, setBoardData } = useContext(BoardDataContext)
	return { boardData, setBoardData }
}

export default useBoardData
