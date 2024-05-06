import { Button } from "@mui/material"

const UserHomePage = () => {
	const handleLogout = () => {
		localStorage.clear()
    window.location.reload()
	}

	return (
		<div>
			<h1>User Home Page</h1>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	)
}

export default UserHomePage
