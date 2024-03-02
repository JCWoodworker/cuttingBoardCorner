import { Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const HomePage: React.FC = () => {
	const navigate = useNavigate()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const boardId = (event.target as any).boardId.value
		navigate(`/boards/${boardId}`)
	}

	return (
		<>
			<Typography variant="h2">My Cutting Board</Typography>
			<br />
			<form className="form" onSubmit={handleSubmit}>
				<label>Enter Your 6-Digit Board ID</label>
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
						minLength: 0,
						maxLength: 6,
						style: { textAlign: "center" },
						"aria-label": "Enter Your Board ID",
						"aria-required": "true",
					}}
					style={{ width: "5rem" }}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</>
	)
}

export default HomePage
