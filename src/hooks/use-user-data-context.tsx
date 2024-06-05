import { useContext } from "react"
import { UserDataContext } from "../context/UserDataContextProvider"

const useUserDataContext = () => {
	const context = useContext(UserDataContext)
	if (!context) {
		throw new Error("userDataContext must be used within a userDataContext")
	}
	return context
}

export default useUserDataContext
