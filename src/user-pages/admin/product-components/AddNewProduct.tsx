import {
	Box,
	FormControl,
	FormHelperText,
	InputLabel,
	TextField,
	Typography,
	Button,
} from "@mui/material"
import NavDrawer from "../../../navigation/NavDrawer"

const AddNewProduct = () => {
	return (
		<>
			<NavDrawer />
			<Box sx={{ pt: "3rem" }}>
				<Typography variant="h4">Add New Product</Typography>
				<Box
					sx={{
						mt: "1rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<FormControl>
						<InputLabel htmlFor="Type">Type</InputLabel>
						<TextField id="type" aria-describedby="type-helper-text" />
						<FormHelperText id="type-helper-text">
							Similar to a title
						</FormHelperText>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="Description">Description</InputLabel>
						<TextField
							id="description"
							aria-describedby="description-helper-text"
						/>
						<FormHelperText id="description-helper-text">
							Write your description here.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="Image URL">ImageUrl</InputLabel>
						<TextField id="imageUrl" aria-describedby="image-helper-text" />
						<FormHelperText id="image-helper-text">
							Paste the image URL here
						</FormHelperText>
					</FormControl>
					<Button variant="contained">Submit</Button>
				</Box>
			</Box>
		</>
	)
}

export default AddNewProduct
