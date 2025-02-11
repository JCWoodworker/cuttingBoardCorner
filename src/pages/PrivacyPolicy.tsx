import ContactMe from "./ContactMe"
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material"

const PrivacyPolicy = () => {
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
						Privacy Policy for CuttingBoardCorner.com
					</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<Typography variant="body1" paragraph>
					Effective Date: October 26, 2023
				</Typography>

				<Typography variant="body1" paragraph>
					This Privacy Policy describes how CuttingBoardCorner.com ("we," "us,"
					or "our") collects, uses, and protects the information of users ("you"
					or "your") who visit and use our website. We are committed to
					protecting your privacy and handling your information responsibly.
				</Typography>

				<Typography variant="h3">Information We Collect:</Typography>
				<Typography variant="body1" paragraph>
					We may collect the following types of information:
				</Typography>
				<ul>
					<li>
						<b>Personal Information:</b> This may include your name, email
						address, username, and any other information you choose to provide
						during the registration process or when contacting us.
					</li>
					<li>
						<b>Usage Information:</b> We may collect information about how you
						use our website, such as the pages you visit, the links you click,
						and the time you spend on our site. This information may be
						collected using cookies, log files, and other tracking technologies.
					</li>
					<li>
						<b>Device Information:</b> We may collect information about the
						device you use to access our website, including your IP address,
						browser type, operating system, and screen resolution.
					</li>
				</ul>

				<Typography variant="h3">How We Use Your Information:</Typography>
				<Typography variant="body1" paragraph>
					We may use your information for the following purposes:
				</Typography>
				<ul>
					<li>
						<b>Account Management:</b> To create and manage your account,
						provide you with access to your personalized cutting board
						information, and communicate with you about your account.
					</li>
					<li>
						<b>Website Improvement:</b> To analyze website usage and improve the
						functionality and user experience of CuttingBoardCorner.com.
					</li>
					<li>
						<b>Communication:</b> To respond to your inquiries, provide customer
						support, and send you updates or notifications related to your
						account or our services.
					</li>
					<li>
						<b>Legal Compliance:</b> To comply with applicable laws and
						regulations.
					</li>
				</ul>

				<Typography variant="h3">Information Sharing:</Typography>
				<Typography variant="body1" paragraph>
					We do not sell, rent, or share your personal information with third
					parties for marketing purposes. We may disclose your information in
					the following limited circumstances:
				</Typography>
				<ul>
					<li>
						<b>Service Providers:</b> We may share your information with trusted
						service providers who assist us in operating our website, such as
						hosting providers or email marketing services. These service
						providers are contractually obligated to protect your information
						and only use it for the purposes we specify.
					</li>
					<li>
						<b>Legal Compliance:</b> We may disclose your information if
						required by law, court order, or government request.
					</li>
					<li>
						<b>Business Transfers:</b> In the event of a merger, acquisition, or
						sale of all or a portion of our assets, your information may be
						transferred as part of that transaction.
					</li>
				</ul>

				<Typography variant="h3">Cookies:</Typography>
				<Typography variant="body1" paragraph>
					We use cookies to enhance your experience on CuttingBoardCorner.com.
					Cookies are small text files that are stored on your device. You can
					control cookies through your browser settings, but disabling cookies
					may limit some functionality of our website.
				</Typography>

				<Typography variant="h3">Data Security:</Typography>
				<Typography variant="body1" paragraph>
					We take reasonable measures to protect your information from
					unauthorized access, use, or disclosure. However, no method of
					transmission over the internet or electronic storage is 100% secure.
				</Typography>

				<Typography variant="h3">Children's Privacy:</Typography>
				<Typography variant="body1" paragraph>
					Our website is not intended for children under the age of 13. We do
					not knowingly collect personal information from children under 13.
				</Typography>

				<Typography variant="h3">Changes to this Privacy Policy:</Typography>
				<Typography variant="body1" paragraph>
					We may update this Privacy Policy from time to time. Any changes will
					be posted on this page with a revised "Effective Date."
				</Typography>

				<Typography variant="h3">Contact Us:</Typography>
				<Typography variant="body1" paragraph>
					If you have any questions about this Privacy Policy, please contact us
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

export default PrivacyPolicy
