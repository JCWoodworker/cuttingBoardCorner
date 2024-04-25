import { Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface Props {
	inputType: "boards" | "coasters"
}

const EnterIdForm: React.FC<Props> = ({ inputType }) => {
	const navigate = useNavigate()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const itemId =
			inputType === "boards"
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(event.target as any).boardsId.value
				: // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(event.target as any).coastersId.value
		navigate(`/${inputType}/${itemId}`)
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<label>
				<Typography variant="h6">
					Enter Your {inputType === "boards" ? "Board" : "Coaster"} ID
				</Typography>
				<Typography variant="subtitle1">{`(Numbers Only)`}</Typography>
			</label>
			<TextField
				id={`${inputType}Id`}
				name={`${inputType}Id`}
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
					"aria-label": `Enter Your ${inputType} ID`,
					"aria-required": "true",
				}}
				style={{ width: "5rem" }}
			/>
			<Button type="submit">Submit</Button>
		</form>
	)
}

export default EnterIdForm
