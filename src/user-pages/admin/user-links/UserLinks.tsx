import { useState, useEffect } from "react"
import { Box, Button, Link, ListItem, Typography } from "@mui/material"
import { DeleteForever } from "@mui/icons-material"

import { Requests } from "../../../requests/Requests"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"
import { UserLinkType } from "../../../requests/Requests.ts"
import RedundantNavButtonLayout from "../../../navigation/RedundantNavButtonLayout.tsx"

import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"
import NewLinkForm from "./NewLinkForm"
import useThemeContext from "../../../hooks/use-theme-context.tsx"

const UserLinks = () => {
	const [allUserLinks, setAllUserLinks] = useState<UserLinkType[]>([])
	const [newLinkFormVisible, setNewLinkFormVisible] = useState(false)
	const [displayLinksAsList, setDisplayLinksAsList] = useState(false)
	const [showEditLinkIcons, setShowEditLinkIcons] = useState(false)
	const { theme } = useThemeContext()

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
		if (window.confirm("Are you sure you want to delete this link?")) {
			const accessToken = localStorage.getItem(
				LocalStorageElements.ACCESS_TOKEN
			)
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
		} else {
			return
		}
	}

	const showLinksAsBoxes = (
		<>
			{allUserLinks.map((userLink) => (
				<Box
					className={
						theme === "dark"
							? "button-shadow-dark-mode"
							: "button-shadow-light-mode"
					}
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
					{showEditLinkIcons && (
						<DeleteForever
							sx={{
								color: "orange",
								position: "absolute",
								top: 8,
								right: 8,
								cursor: "pointer",
								"&:hover": {
									color: "red",
								},
							}}
							onClick={() => handleDeleteLink(userLink.id)}
						/>
					)}
				</Box>
			))}
		</>
	)

	const showLinksAsTitleList = (
		<>
			{allUserLinks.map((userLink) => (
				<ListItem
					sx={{
						m: "0.25rem",
						width: "200px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						textAlign: "center",
						border: showEditLinkIcons ? "1px solid red" : "none",
						borderRadius: "0.25rem",
						gap: 2,
					}}
					key={userLink.id}
				>
					<Link href={userLink.url} target="_blank">
						{userLink.title}
					</Link>
					{showEditLinkIcons && (
						<DeleteForever
							sx={{
								color: "orange",
								cursor: "pointer",
								"&:hover": {
									color: "red",
								},
							}}
							onClick={() => handleDeleteLink(userLink.id)}
						/>
					)}
				</ListItem>
			))}
		</>
	)

	return (
		<MainComponentLayout>
			<RedundantNavButtonLayout
				buttonOptionArray={["userHome", "myProducts"]}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
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

			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{!newLinkFormVisible ? (
					<Button
						variant="contained"
						color={newLinkFormVisible ? "error" : "success"}
						sx={{ m: "1rem" }}
						onClick={() => setNewLinkFormVisible(!newLinkFormVisible)}
					>
						New Link
					</Button>
				) : null}

				{!newLinkFormVisible && allUserLinks.length != 0 ? (
					<Button
						variant="contained"
						color={showEditLinkIcons ? "secondary" : "info"}
						sx={{ m: "1rem" }}
						onClick={() => setShowEditLinkIcons(!showEditLinkIcons)}
					>
						{showEditLinkIcons ? "Done Editing" : "Edit Links"}
					</Button>
				) : null}
			</Box>

			{newLinkFormVisible ? (
				<NewLinkForm setNewLinkFormVisible={setNewLinkFormVisible} />
			) : null}

			<hr style={{ width: "500px" }} />

			{allUserLinks ? (
				<Box
					sx={{
						m: "1rem auto",
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						flexWrap: { xs: "nowrap", sm: "wrap" },
						justifyContent: "space-evenly",
						alignItems: "center",
					}}
				>
					{displayLinksAsList ? showLinksAsTitleList : showLinksAsBoxes}
				</Box>
			) : null}
		</MainComponentLayout>
	)
}

export default UserLinks
