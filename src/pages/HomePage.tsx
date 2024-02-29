import { useState } from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const HomePage: React.FC = () => {
	const [myBoardId, setMyBoardId] = useState<number>(0)
	const navigate = useNavigate()

	const handleSetBoardId = (boardId: number) => {
		setMyBoardId(boardId)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const boardId = Number(e.target.value)
		handleSetBoardId(boardId)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		handleSetBoardId(myBoardId)
		navigate(`/boards/${myBoardId}`)
	}

	console.log(myBoardId)

	return (
		<>
			<Typography variant="h2">My Cutting Board</Typography>
			<br />
			<form className="form" onSubmit={handleSubmit}>
				<label>Enter Your Board ID</label>
				<input
					className="form-input-box"
					type="float"
					name="boardId"
					onChange={handleChange}
					value={myBoardId}
				/>
				<button className="form-submit" type="submit">
					Submit
				</button>
			</form>
		</>
	)
}

export default HomePage
