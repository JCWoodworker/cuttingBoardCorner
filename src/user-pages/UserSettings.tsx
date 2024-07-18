import RedundantNavButtonLayout from "../navigation/RedundantNavButtonLayout"
import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"

const UserSettings = () => {
	return (
		<>
			<MainComponentLayout>
				<RedundantNavButtonLayout buttonOptionArray={["userHome"]} />
				<ComponentTitle text="User Settings" />
			</MainComponentLayout>
		</>
	)
}

export default UserSettings
