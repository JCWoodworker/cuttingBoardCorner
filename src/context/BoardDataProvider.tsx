import { useState, createContext, useEffect } from "react"

interface Props {
	children: React.ReactNode[]
}

export interface BoardData {
	id: number | undefined
	board_description: string
	board_type: string
	board_image_url: string
	customer_message: string
}

export interface BoardDataContextType {
	boardData: BoardData
	setBoardData: React.Dispatch<React.SetStateAction<BoardData>>
}

const defaultBoardData = {
	id: undefined,
	board_description: "",
	board_type: "",
	board_image_url: "",
	customer_message: "",
}

export const BoardDataContext = createContext<BoardDataContextType>({
	boardData: defaultBoardData,
	setBoardData: () => {},
})

const BoardDataProvider: React.FC<Props> = ({ children }) => {
	const persistedBoardData = localStorage.getItem("boardData")
	const [boardData, setBoardData] = useState<BoardData>(
		persistedBoardData ? JSON.parse(persistedBoardData) : defaultBoardData
	)

	useEffect(() => {
		localStorage.setItem("boardData", JSON.stringify(boardData))
	}, [boardData])

	return (
		<BoardDataContext.Provider
			value={{
				boardData,
				setBoardData,
			}}
		>
			{children}
		</BoardDataContext.Provider>
	)
}

export default BoardDataProvider
