import { useState, useEffect } from "react"
import { Box, Button, Link, Typography } from "@mui/material"
import { DeleteForever } from "@mui/icons-material"

import { Requests } from "../../../requests/Requests"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"
import { UserLinkType } from "../../../requests/Requests.ts"

import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"
import NewLinkForm from "./NewLinkForm"

const UserLinks = () => {
	const [allUserLinks, setAllUserLinks] = useState<UserLinkType[]>([])
	const [newLinkFormVisible, setNewLinkFormVisible] = useState(false)

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

	const handleDeleteLink = async (linkId: string) => {
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		const response = await Requests.DELETE(
			`/subapps/mycuttingboard/links/${linkId}`,
			accessToken as string
		)
		if (response.status === 200) {
			getAllUserLinks()
		} else {
			console.error("Something went wrong")
			console.error(response.data)
		}
	}

	return (
		<MainComponentLayout>
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/my-products"} text="My Products" />
			</NavButtonLayout>
			<ComponentTitle text="My Links" />
			<Button
				variant="contained"
				color={newLinkFormVisible ? "error" : "success"}
				sx={{ m: "1rem" }}
				onClick={() => setNewLinkFormVisible(!newLinkFormVisible)}
			>
				{newLinkFormVisible ? "Close/Cancel" : "Add New Link"}
			</Button>
			{newLinkFormVisible ? <NewLinkForm /> : null}
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
							position: "relative",
						}}
						key={userLink.id}
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
						<DeleteForever
							sx={{
								color: "red",
								position: "absolute",
								bottom: 8,
								right: 8,
							}}
							onClick={() => handleDeleteLink(userLink.id)}
						/>
					</Box>
				))}
			</Box>
		</MainComponentLayout>
	)
}

export default UserLinks
