import useUserDataContext from "../../hooks/use-user-data-context"
import NavButtonLayout from "./NavButtonLayout"
import NavigationButton from "./NavigationButton"

const RedundantNavButtonData = () => {
	const { userInfo } = useUserDataContext()

	return (
		<>
			{/* AdminPage */}
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton
					path="/admin/add-new-product"
					text="New Product"
					icon="forward"
				/>
			</NavButtonLayout>
			{/* AddNewProduct */}
			<NavButtonLayout>
				<NavigationButton path={"/admin"} text="Admin" icon="back" />
				<NavigationButton
					path={"/admin/all-inventory"}
					text="Products"
					icon="back"
				/>
			</NavButtonLayout>
			{/* ProductIndex */}
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/admin"} text="Admin" icon="back" />
				<NavigationButton
					path="/admin/add-new-product"
					text="New Product"
					icon="forward"
				/>
			</NavButtonLayout>

			{/* UserHomePage */}
			<NavButtonLayout>
				{userInfo?.role === "admin" ? (
					<NavigationButton path={"/admin"} text="Admin" />
				) : null}
				<NavigationButton path={"/my-products"} text="My Products" />
				<NavigationButton path={"/my-links"} text="My Links" />
			</NavButtonLayout>
			{/* UserIndex */}
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/admin"} text="Admin" icon="back" />
				<NavigationButton
					path="/admin/add-new-product"
					text="New Product"
					icon="forward"
				/>
			</NavButtonLayout>
			{/* UserLinks */}
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/my-products"} text="My Products" />
			</NavButtonLayout>
			{/* UserProducts */}
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
				<NavigationButton path={"/my-links"} text="My Links" />
			</NavButtonLayout>
			{/* UserSettings */}
			<NavButtonLayout>
				<NavigationButton path={"/"} text="User Home" icon="back" />
			</NavButtonLayout>

			{/* CaringForYourBoard */}
			<NavButtonLayout>
				<NavigationButton path={"/"} text={"Home"} icon="back" />
			</NavButtonLayout>
			{/* ProductDataShow */}
			<NavButtonLayout>
				<NavigationButton
					path={"/care-and-maintenance"}
					text="Care & Maintenance Instructions"
				/>
			</NavButtonLayout>
		</>
	)
}

export default RedundantNavButtonData
