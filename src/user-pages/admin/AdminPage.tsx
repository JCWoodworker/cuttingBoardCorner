import NavigationButton from "../../components/nav-button/NavigationButton"
import NavButtonLayout from "../../components/nav-button/NavButtonLayout"
import MainComponentLayout from "../../layouts/MainComponentLayout"
import ComponentTitle from "../../layouts/ComponentTitle"

const AdminPage = () => {
	return (
		<>
			<MainComponentLayout>
				<NavButtonLayout>
					<NavigationButton path={"/"} text="User Home" icon="back" />
					<NavigationButton
						path="/admin/add-new-product"
						text="New Product"
						icon="forward"
					/>
				</NavButtonLayout>
				<ComponentTitle text="Admin" />
				<br />
				<NavigationButton
					path={"/admin/all-inventory"}
					text="All Products"
					size="large"
				/>
			</MainComponentLayout>
		</>
	)
}
export default AdminPage
