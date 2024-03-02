import { Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
const BoardIdForm = () => {
	const navigate = useNavigate()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const boardId = (event.target as any).boardId.value
		navigate(`/boards/${boardId}`)
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<label>
				<Typography variant="h6">Enter Your Board ID</Typography>
				<Typography variant="subtitle1">{`(Numbers Only)`}</Typography>
			</label>
			<TextField
				id="boardId"
				name="boardId"
				variant="outlined"
				size="small"
				required
				autoFocus
				inputProps={{
					inputMode: "numeric",
					pattern: "[0-9]*",
					minLength: 1,
					maxLength: 6,
					style: { textAlign: "center" },
					"aria-label": "Enter Your Board ID",
					"aria-required": "true",
				}}
				style={{ width: "5rem" }}
			/>
			<Button type="submit">Submit</Button>
		</form>
	)
}

export default BoardIdForm
