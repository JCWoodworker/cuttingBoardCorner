import { useState, useEffect } from "react"
import { Box, Link, Typography } from "@mui/material"

import { Requests } from "../../../requests/Requests"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"

import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"

type UserLinkType = {
  user_id: string
	title: string
	url: string
	notes: string
}

const UserLinks = () => {
	const [allUserLinks, setAllUserLinks] = useState<UserLinkType[]>([])

	const getAllUserLinks = async () => {
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		const response = await Requests.GET(
			"/subapps/mycuttingboard/links",
			false,
			true,
			accessToken as string
		)
		setAllUserLinks(response.data)

		return true
	}

	useEffect(() => {
		getAllUserLinks()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<MainComponentLayout>
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/my-products"} text="My Products" />
			</NavButtonLayout>
			<ComponentTitle text="My Links" />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{allUserLinks.map((userLink) => (
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
							{userLink.notes ?? "Unable to add notes yet"}
						</Typography>
					</Box>
				))}
			</Box>
		</MainComponentLayout>
	)
}

export default UserLinks
