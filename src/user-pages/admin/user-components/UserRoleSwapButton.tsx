import { Box, Button } from "@mui/material"
import useEnv from "../../../hooks/use-env"
import useUserDataContext from "../../../hooks/use-user-data-context"
import { Requests } from "../../../requests/Requests"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"

const UserRoleSwapButton = () => {
	const { userInfo } = useUserDataContext()
	const environment = useEnv()
	const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)

	if (!userInfo) return null
	if (!accessToken) return null
	if (environment !== "dev" && environment !== "preprod") return null
	const nextUserRole = userInfo.role === "admin" ? "basic" : "admin"

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			await Requests.POST(
				"/subapps/mycuttingboard/user-role-swap",
				{ role: nextUserRole },
				true,
				accessToken
			)
			window.location.reload()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Box sx={{ mt: 2 }}>
			<Button
				variant="outlined"
				sx={{
					width: "80%",
					height: "5rem",
				}}
				onClick={handleClick}
			>{`Switch role to ${nextUserRole}`}</Button>
		</Box>
	)
}
export default UserRoleSwapButton
