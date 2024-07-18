import useUserDataContext from "../hooks/use-user-data-context"
import UserRoleSwapButton from "./admin/user-components/UserRoleSwapButton"
import RedundantNavButtonLayout, {
	ButtonOptionType,
} from "../navigation/nav-button/RedundantNavButtonLayout"

import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"
const UserHomePage: React.FC = () => {
	const { userInfo } = useUserDataContext()
	const buttonOptionArray: ButtonOptionType[] = ["myProducts", "myLinks"]
	userInfo.role === "admin" && buttonOptionArray.splice(0, 0, "admin")

	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={buttonOptionArray} />
				<ComponentTitle text="My Home" />
				<UserRoleSwapButton />
			</MainComponentLayout>
		</>
	)
}

export default UserHomePage
