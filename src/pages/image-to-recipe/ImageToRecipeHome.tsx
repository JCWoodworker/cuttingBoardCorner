import RecipeCard from "./recipe/RecipeCard"
import ImageUpload from "./ImageUpload"
import ImageToRecipeHeader from "./ImageToRecipeHeader"
import SectionLayout from "./SectionLayout"
import RedundantNavButtonLayout from "../../navigation/RedundantNavButtonLayout"
import MainComponentLayout from "../../layouts/MainComponentLayout"
import PageMessage from "./PageMessage"

const ImageToRecipeHome = () => {
	const sections = [
		{
			component: <PageMessage />,
			title: "Page Message",
		},
		{
			component: <ImageToRecipeHeader />,
			title: "Image To Recipe Header",
		},
		{
			component: <ImageUpload />,
			title: "Image Upload Button",
		},
		{
			component: <RecipeCard />,
			title: "Recipe Card",
		},
	]

	return (
		<MainComponentLayout>
			<RedundantNavButtonLayout buttonOptionArray={["home"]} />
			{sections.map((section) => (
				<SectionLayout key={section.title}>{section.component}</SectionLayout>
			))}
		</MainComponentLayout>
	)
}

export default ImageToRecipeHome
