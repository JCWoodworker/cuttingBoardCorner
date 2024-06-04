import NavigationButton from "../components/nav-button/NavigationButton"
import NavButtonLayout from "../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"

const UserProducts = () => {
	return (
		<>
			<MainComponentLayout>
				<NavButtonLayout>
					<NavigationButton path={"/"} text="User Home" icon="back" />
				</NavButtonLayout>
				<ComponentTitle text="My Products" />
			</MainComponentLayout>
		</>
	)
}

export default UserProducts
