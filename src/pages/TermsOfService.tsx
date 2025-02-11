import ContactMe from "./ContactMe"
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material"

const TermsOfService = () => {
	return (
		<Box
			sx={{
				margin: "0 auto",
				width: {
					sm: "100%",
					md: "60%",
				},
			}}
		>
			<AppBar position="static" sx={{ marginBottom: "1rem" }}>
				<Toolbar sx={{ display: "flex", justifyContent: "center" }}>
					<Typography variant="h6">
						Terms of Service for CuttingBoardCorner.com
					</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<Typography variant="body1" paragraph>
					Effective Date: January 01, 2023
				</Typography>

				<Typography variant="body1" paragraph>
					Welcome to CuttingBoardCorner.com! By accessing and using our website,
					you agree to be bound by these Terms of Service ("Terms"). Please read
					these Terms carefully before using our website.
				</Typography>

				<Typography variant="h3">Use of Our Website:</Typography>
				<Typography variant="body1" paragraph>
					You may use our website for lawful purposes only. You agree not to:
				</Typography>
				<ul>
					<li>
						Use our website in any way that violates applicable laws or
						regulations.
					</li>
					<li>
						Impersonate any person or entity, or falsely state or otherwise
						misrepresent your affiliation with a person or entity.
					</li>
					<li>
						Interfere with or disrupt the operation of our website or the
						servers or networks connected to our website.
					</li>
					<li>
						Attempt to gain unauthorized access to any part of our website or
						other user accounts.
					</li>
				</ul>

				<Typography variant="h3">User Accounts:</Typography>
				<Typography variant="body1" paragraph>
					If you create an account on our website, you are responsible for
					maintaining the confidentiality of your account credentials. You agree
					to notify us immediately of any unauthorized access to your account.
				</Typography>

				<Typography variant="h3">Content:</Typography>
				<Typography variant="body1" paragraph>
					You are solely responsible for any content you submit or post on our
					website. You agree not to submit or post any content that is unlawful,
					harmful, threatening, abusive, harassing, defamatory, vulgar, obscene,
					libelous, invasive of another's privacy, hateful, or racially,
					ethnically or otherwise objectionable.
				</Typography>

				<Typography variant="h3">Intellectual Property:</Typography>
				<Typography variant="body1" paragraph>
					All content on our website, including text, graphics, logos, images,
					and software, is the property of CuttingBoardCorner.com and is
					protected by copyright and other intellectual property laws.
				</Typography>

				<Typography variant="h3">Disclaimer:</Typography>
				<Typography variant="body1" paragraph>
					Our website is provided "as is" without any warranties of any kind,
					either express or implied. We do not warrant that our website will be
					uninterrupted, error-free, or secure.
				</Typography>

				<Typography variant="h3">Limitation of Liability:</Typography>
				<Typography variant="body1" paragraph>
					To the fullest extent permitted by law, we will not be liable for any
					damages arising out of or in connection with your use of our website.
				</Typography>

				<Typography variant="h3">Governing Law:</Typography>
				<Typography variant="body1" paragraph>
					These Terms will be governed by and construed in accordance with the
					laws of [Your State/Jurisdiction].
				</Typography>

				<Typography variant="h3">Changes to these Terms:</Typography>
				<Typography variant="body1" paragraph>
					We may update these Terms from time to time. Any changes will be
					posted on this page with a revised "Effective Date."
				</Typography>

				<Typography variant="h3">Contact Us:</Typography>
				<Typography variant="body1" paragraph>
					If you have any questions about these Terms, please contact us
				</Typography>
				<ContactMe buttonText="Click Here to Contact Us" />
			</Container>
			<footer>
				<Typography variant="body2" align="center">
					© 2023 CuttingBoardCorner.com
				</Typography>
			</footer>
		</Box>
	)
}

export default TermsOfService
