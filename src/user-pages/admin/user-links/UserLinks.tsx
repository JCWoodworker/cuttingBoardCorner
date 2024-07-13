import NavButtonLayout from "../../../components/nav-button/NavButtonLayout"
import NavigationButton from "../../../components/nav-button/NavigationButton"
import MainComponentLayout from "../../../layouts/MainComponentLayout"
import ComponentTitle from "../../../layouts/ComponentTitle"

const UserLinks = () => {
  return (
    <MainComponentLayout>
      <NavButtonLayout>
          <NavigationButton path={"/"} text="User Home" icon="back" />
					<NavigationButton path={"/my-products"} text="My Products" />
				</NavButtonLayout>
      <ComponentTitle text="User Links" />
    </MainComponentLayout>
  )
}

export default UserLinks