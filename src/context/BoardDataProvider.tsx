import { useState, createContext, useEffect } from "react"

interface Props {
	children: React.ReactNode[]
}

export interface BoardData {
	id: number | undefined
	name: string
	description: string
	type: string
	image: string
}

export interface BoardDataContextType {
	boardData: BoardData
	setBoardData: React.Dispatch<React.SetStateAction<BoardData>>
}

const defaultBoardData = {
	id: undefined,
	name: "",
	description: "",
	type: "",
	image: "",
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
