import RedundantNavButtonLayout from "../navigation/RedundantNavButtonLayout"
import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"

const UserProducts = () => {
	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={["userHome", "myLinks"]} />
				<ComponentTitle text="My Products" />
			</MainComponentLayout>
		</>
	)
}

export default UserProducts
