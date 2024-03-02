import { Typography, Box, Link, List, ListItem } from "@mui/material"

const CaringForYourBoard = () => {
	return (
		<Box sx={{ mt: 2, textAlign: "center" }}>
			<hr />
			<br />
			<Typography variant="h5">Caring For Your Board</Typography>
			<br />
			<Link href="https://youtu.be/nh0Ysgq8F20?si=kJEzUMX5bS34gFRr">
				Click here to watch a Youtube video about caring for your board if you
				want to skip reading all the steps - featuring Ryan at West Coast
				Cutting Boards!
			</Link>
			<Typography variant="h6" sx={{ mt: 2 }}>
				Quick Steps - Cleaning
			</Typography>
			<List
				sx={{
					textAlign: "center",
					width: "80%",
					mx: "auto",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ListItem>Wipe down the board with a warm soapy sponge.</ListItem>
				<ListItem>
					Wipe dry with a rag or towel and leave it to dry on it's feet or on
					it's side
				</ListItem>
			</List>
			<Typography variant="h6">Quick Steps - Oiling</Typography>
			<List
				sx={{
					textAlign: "center",
					width: "80%",
					mx: "auto",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ListItem>
					Your board has come pre-conditioned, so you'll just need to maintain
					it over the years
				</ListItem>
				<ListItem>
					Once every week or two you can apply a layer of mineral oil to the
					board and spread around evenly
				</ListItem>
				<ListItem>
					Let it absorb for about an hour then wipe off the excess
				</ListItem>
				<ListItem>
					Make sure to oil the bottom of the board even if you aren't using it.
					This will help to keep the board from warping.
				</ListItem>
			</List>
			<hr />
			<br />
			<Typography variant="h5">What NOT to do</Typography>
			<Typography variant="subtitle1">If you want to avoid warping</Typography>
			<List
				sx={{
					textAlign: "center",
					width: "80%",
					mx: "auto",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ListItem>DON'T submerge your board in water</ListItem>
				<ListItem>DON'T wash your board in the dishwasher</ListItem>
				<ListItem>DON'T leave the board in direct sunlight</ListItem>
			</List>
		</Box>
	)
}

export default CaringForYourBoard
