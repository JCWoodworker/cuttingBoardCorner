import useBoardData from "../hooks/useBoardData"

const LinksContainer: React.FC = () => {
	const { boardData } = useBoardData()
	return (
		<>
			<p>Link Container Placeholder</p>
			<p>{`Board ID From Context: ${boardData.id}`}</p>
		</>
	)
}

export default LinksContainer
