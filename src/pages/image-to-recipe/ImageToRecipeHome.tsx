import RecipeCard from "./recipe/RecipeCard"
import ImageUpload from "./ImageUpload"
import ImageToRecipeHeader from "./ImageToRecipeHeader"
import SectionLayout from "./SectionLayout"
const ImageToRecipeHome = () => {
	const sections = [
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
		<>
			{sections.map((section) => (
				<SectionLayout key={section.title}>{section.component}</SectionLayout>
			))}
		</>
	)
}

export default ImageToRecipeHome
