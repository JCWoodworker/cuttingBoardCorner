import { useState } from "react"
import { Box, Button, FormControl, TextField, Typography } from "@mui/material"
import { NewUserLinkType, Requests } from "../../../requests/Requests"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"

interface Props {
	setNewLinkFormVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const NewLinkForm: React.FC<Props> = ({ setNewLinkFormVisible }) => {
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
		<Box
			sx={{
				m: "0 auto",
				width: { xs: "90%", md: "600px" },
				display: "grid",
				placeItems: "center",
			}}
		>
			<form onSubmit={onFormSubmit} style={{ width: "100%" }}>
				<Typography variant="h6">Create New Link</Typography>
				<FormControl fullWidth sx={{ my: 2, gap: 2 }}>
					<TextField
						id="LinkName"
						label="Title"
						variant="outlined"
						required
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
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
						onChange={(e) =>
							setFormData({ ...formData, notes: e.target.value })
						}
					/>
					<Box
						sx={{
							m: "0 auto",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							gap: 1,
						}}
					>
						<Button
							variant="contained"
							type="submit"
							sx={{ m: "0 auto", width: "100px" }}
						>
							Submit
						</Button>

						<Button
							variant="contained"
							color="error"
							sx={{ width: "100px" }}
							onClick={() => setNewLinkFormVisible(false)}
						>
							Cancel
						</Button>
					</Box>
				</FormControl>
			</form>
		</Box>
	)
}

export default NewLinkForm
