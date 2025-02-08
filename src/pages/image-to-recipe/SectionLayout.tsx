import { Box } from "@mui/material"

const SectionLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Box
				sx={{
					margin: "0.5rem auto",
					padding: 2,
					width: {
						sm: "100%",
						md: "60%",
					},
					minHeight: "100px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
					border: "1px solid white",
				}}
			>
				{children}
			</Box>
		</>
	)
}

export default SectionLayout