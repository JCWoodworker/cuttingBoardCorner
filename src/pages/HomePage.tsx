import { Box } from "@mui/material"
import EnterIdForm from "./EnterIdForm"
import MainComponentLayout from "../layouts/MainComponentLayout"
import ComponentTitle from "../layouts/ComponentTitle"
import HomePageMessage from "../components/HomePageMessage"
import ContactMe from "./ContactMe"

const HomePage: React.FC = () => {
	return (
		<>
			<MainComponentLayout>
				<Box>
					<ComponentTitle text="Search by ID" />
					<EnterIdForm />
				</Box>
				<br />
				<hr />
				<br />
				<HomePageMessage />
				<ContactMe />
			</MainComponentLayout>
		</>
	)
}

export default HomePage
