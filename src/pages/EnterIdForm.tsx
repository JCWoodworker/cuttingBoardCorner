import { Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const EnterIdForm: React.FC = () => {
	const navigate = useNavigate()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const itemId = event.currentTarget.ProductId.value
		navigate(`/products/${itemId}`)
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<label>
				<Typography variant="subtitle1">{`(Numbers Only)`}</Typography>
			</label>
			<TextField
				id={`ProductId`}
				name={`ProductId`}
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
					"aria-label": `Enter Your Product's ID`,
					"aria-required": "true",
				}}
				style={{ width: "5rem" }}
			/>
			<Button type="submit">Submit</Button>
		</form>
	)
}

export default EnterIdForm
