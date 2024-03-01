import { useState, createContext } from "react"

interface Props {
	children: React.ReactNode[]
}

export interface BoardData {
	id: number
	name: string
	description: string
	type: string
	image: string
}

export interface BoardDataContextType {
	boardData: BoardData
	setBoardData: React.Dispatch<React.SetStateAction<BoardData>>
}

export const BoardDataContext = createContext<BoardDataContextType>({
	boardData: {
		id: 0,
		name: "",
		description: "",
		type: "",
		image: "",
	},
	setBoardData: () => {},
})

const BoardDataProvider: React.FC<Props> = ({ children }) => {
	const [boardData, setBoardData] = useState<BoardData>({
		id: 0,
		name: "",
		description: "",
		type: "",
		image: "",
	})
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
