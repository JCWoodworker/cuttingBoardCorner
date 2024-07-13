import { useState, useEffect } from "react"
// import { Requests } from "../../../requests/Requests"
import { Box, Typography } from "@mui/material"

import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"

const UserLinks = () => {
	const [allUserLinks, setAllUserLinks] = useState([
		{
			title: "First Test Link",
			url: "https://www.google.com",
			notes: ["Note one", "Note two", "Note three"],
		},
		{
			title: "Second Test Link",
			url: "https://www.google.com",
			notes: ["Note one", "Note two", "Note three"],
		},
		{
			title: "Third Test Link",
			url: "https://www.google.com",
			notes: ["Note one", "Note two", "Note three"],
		},
	])

	const getAllUserLinks = async () => {
		// const response = await Requests.GET(
		// 	"/subapps/mycuttingboard/user-links",
		// 	false,
		// 	true,
		// 	"accessToken"
		// )


		if (allUserLinks.length != 3) {
			setAllUserLinks([])
		}

    return true
	}

	useEffect(() => {
		console.log("No GET request endpoint set up yet")
		getAllUserLinks()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<MainComponentLayout>
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/my-products"} text="My Products" />
			</NavButtonLayout>
			<ComponentTitle text="User Links" />
			{allUserLinks.map((userLink) => (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Box
						sx={{
							m: "1rem",
							p: "1rem",
							border: "1px solid rgba(121, 121, 121, 0.7)",
						}}
					>
						<a href={userLink.url} target="_blank">
							<Typography variant="body1">{userLink.title}</Typography>
						</a>
						<Typography
							variant="body1"
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{userLink.notes.map((note) => (
								<Typography variant="body2">{note}</Typography>
							))}
						</Typography>
					</Box>
				</Box>
			))}
		</MainComponentLayout>
	)
}

export default UserLinks
