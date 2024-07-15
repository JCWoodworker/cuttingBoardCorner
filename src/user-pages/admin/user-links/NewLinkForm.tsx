import { useState } from "react"
import { Button, FormControl, TextField, Typography } from "@mui/material"
import { NewUserLinkType, Requests } from "../../../requests/Requests"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"

const NewLinkForm: React.FC = () => {
	const [formData, setFormData] = useState<NewUserLinkType>({
		title: "",
		url: "",
		notes: "",
	})

	const resetForm = () => {
		setFormData({
			title: "",
			url: "",
			notes: "",
		})
	}

	const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const payload = formData
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		const response = await Requests.POST(
			"/subapps/mycuttingboard/links",
			payload,
			true,
			accessToken as string
		)
		if (response.status === 201) {
      resetForm()
			window.location.reload()
		} else {
			console.error("Something went wrong")
			console.error(response.data)
		}
	}

	return (
		<form onSubmit={onFormSubmit}>
			<Typography variant="h6">Create New Link</Typography>
			<FormControl fullWidth sx={{ my: 2, gap: 2 }}>
				<TextField
					id="LinkName"
					label="Title"
					variant="outlined"
					required
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>
				<TextField
					id="LinkName"
					label="URL"
					variant="outlined"
					required
					onChange={(e) => setFormData({ ...formData, url: e.target.value })}
				/>
				<TextField
					id="LinkName"
					label="Notes"
					variant="outlined"
					onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
				/>
				<Button variant="contained" type="submit">
					Submit
				</Button>
			</FormControl>
		</form>
	)
}

export default NewLinkForm
