import { Button } from "@mui/material"
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
	const userRole = userInfo.role
	const nextUserRole = userRole === "admin" ? "basic" : "admin"

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const result = Requests.POST(
			"/user/role",
			{ role: nextUserRole },
			true,
			accessToken
		)
    console.log(result)
	}

	return (
		<>
			<Button
				onClick={() => handleClick}
			>{`Switch user role to: ${nextUserRole}`}</Button>
		</>
	)
}
export default UserRoleSwapButton
