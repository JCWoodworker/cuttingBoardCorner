import { useState, useEffect } from "react"
// import { Requests } from "../../../requests/Requests"
import { Box, Link, Typography } from "@mui/material"

import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"

const UserLinks = () => {
	const [allUserLinks, setAllUserLinks] = useState([
		{
			title: "Grilled Chicken Breasts",
			url: "https://www.allrecipes.com/best-grilled-chicken-breasts-recipe-8648903",
			notes: "Found this back in 2021.  Make sure to add a little lemon juice",
		},
		{
			title: "Second Test Link",
			url: "https://www.google.com",
			notes: "My notes go here",
		},
		{
			title: "Third Test Link",
			url: "https://www.google.com",
			notes: "My notes go here",
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
					}}
				>
					<Box
						sx={{
							m: "0.25rem",
							p: "1rem",
							border: "1px solid rgba(121, 121, 121, 0.7)",
							borderRadius: "0.25rem",
							width: "320px",
							height: "auto",
						}}
					>
						<Link href={userLink.url} target="_blank">
							<Typography variant="h6">{userLink.title}</Typography>
						</Link>
						<Typography
							variant="body1"
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{userLink.notes}
						</Typography>
					</Box>
				</Box>
			))}
		</MainComponentLayout>
	)
}

export default UserLinks
