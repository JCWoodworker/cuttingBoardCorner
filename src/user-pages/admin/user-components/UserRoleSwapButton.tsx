import { Button } from "@mui/material"
import useEnv from "../../../hooks/use-env"
import useUserDataContext from "../../../hooks/use-user-data-context"
import { Requests } from "../../../requests/Requests"
import { LocalStorageElements } from "../../../utils/clearLocalStorage"
import useThemeContext from "../../../hooks/use-theme-context"

const UserRoleSwapButton = () => {
	const { userInfo } = useUserDataContext()
	const environment = useEnv()
	const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
	const { theme } = useThemeContext()

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
		<Button
			className={
				theme === "dark"
					? "button-shadow-dark-mode"
					: "button-shadow-light-mode"
			}
			variant="outlined"
			sx={{
				width: "80%",
				height: "5rem",
				border: "2px solid red",
				background: "rgba(255, 0, 0, 0.5)",
				"&:hover": {
					background: "rgba(255, 0, 0, 0.8)",
					fontWeight: "bolder",
				},
			}}
			onClick={handleClick}
		>{`Switch role to ${nextUserRole}`}</Button>
	)
}
export default UserRoleSwapButton
