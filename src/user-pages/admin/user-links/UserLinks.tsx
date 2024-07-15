import { useState, useEffect } from "react"
import { Box, Button, Link, ListItem, Typography } from "@mui/material"
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
	const [displayLinksAsList, setDisplayLinksAsList] = useState(false)

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

	const showLinksAsBoxes = (
		<>
			{allUserLinks.map((userLink) => (
				<Box
					sx={{
						m: "0.25rem",
						p: "1rem",
						height: "auto",
						minHeight: "90px",
						border: "1px solid rgba(121, 121, 121, 0.7)",
						borderRadius: "0.25rem",
						width: "340px",
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
		</>
	)

	const showLinksAsTitleList = (
		<>
			{allUserLinks.map((userLink) => (
				<ListItem
					sx={{
            width: "200px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						textAlign: "center",
            gap: 2,
					}}
					key={userLink.id}
				>
					<Link href={userLink.url} target="_blank">
						{userLink.title}
					</Link>
					<DeleteForever
						sx={{
							color: "red",
						}}
						onClick={() => handleDeleteLink(userLink.id)}
					/>
				</ListItem>
			))}
		</>
	)

	return (
		<MainComponentLayout>
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/my-products"} text="My Products" />
			</NavButtonLayout>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<ComponentTitle text="My Links" />
				<Button
					variant="text"
					sx={{ height: "20px" }}
					onClick={() => setDisplayLinksAsList(!displayLinksAsList)}
				>
					{displayLinksAsList ? "(Show with notes)" : "(show titles only)"}
				</Button>
			</Box>
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
					m: "0 auto",
					width: { xs: "100%", md: "600px" },
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					flexWrap: { xs: "nowrap", md: "wrap" },
					justifyContent: "space-evenly",
					alignItems: "center",
				}}
			>
				{displayLinksAsList ? showLinksAsTitleList : showLinksAsBoxes}
			</Box>
		</MainComponentLayout>
	)
}

export default UserLinks
