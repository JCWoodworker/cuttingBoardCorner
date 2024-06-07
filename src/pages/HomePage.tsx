import { Box } from "@mui/material"
import EnterIdForm from "./EnterIdForm"
import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"

const HomePage: React.FC = () => {
	return (
		<>
			<MainComponentLayout>
				<Box>
					<ComponentTitle text="Search by ID" />
					<EnterIdForm />
				</Box>
			</MainComponentLayout>
		</>
	)
}

export default HomePage
