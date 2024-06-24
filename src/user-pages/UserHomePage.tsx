import { pluralNoun } from "../utils/pluralNoun"
import NavigationButton from "../components/nav-button/NavigationButton"
import useUserDataContext from "../hooks/use-user-data-context"
import NavButtonLayout from "../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"
import UserRoleSwapButton from "./admin/user-components/UserRoleSwapButton"
const UserHomePage: React.FC = () => {
	const { userInfo } = useUserDataContext()

	return (
		<>
			<MainComponentLayout>
				<NavButtonLayout>
					{userInfo?.role === "admin" ? (
						<NavigationButton path={"/admin"} text="Admin" />
					) : null}
					<NavigationButton path={"/my-products"} text="My Products" />
					<NavigationButton path={"/user-settings"} text="Settings" />
				</NavButtonLayout>
				<ComponentTitle text={`${pluralNoun(userInfo?.firstName)} Home`} />
				<UserRoleSwapButton />
			</MainComponentLayout>
		</>
	)
}

export default UserHomePage
