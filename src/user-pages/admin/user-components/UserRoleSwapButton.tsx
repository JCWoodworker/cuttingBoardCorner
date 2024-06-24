import { Button } from "@mui/material"
import useEnv from "../../../hooks/use-env"
import useUserDataContext from "../../../hooks/use-user-data-context"

const UserRoleSwapButton = () => {
	const { userInfo } = useUserDataContext()
	const environment = useEnv()

	if (!userInfo) return null
	if (environment !== "dev" && environment !== "preprod") return null
	const userRole = userInfo.role
	const nextUserRole = userRole === "admin" ? "basic" : "admin"

	return (
		<>
			<Button onClick={() => alert("This is not functional just yet")}>{`Switch user role to: ${nextUserRole}`}</Button>
		</>
	)
}
export default UserRoleSwapButton
