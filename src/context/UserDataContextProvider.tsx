import { useState, SetStateAction, createContext } from "react"
import { UserInfo } from "../App"

type UserDataContextProps = {
	children: React.ReactNode
}
type UserDataContextType = {
	userInfo: UserInfo
	setUserInfo: React.Dispatch<SetStateAction<UserInfo>>
	loggedIn: boolean
	setLoggedIn: React.Dispatch<SetStateAction<boolean>>
}

export const UserDataContext = createContext<UserDataContextType | null>(null)

const UserDataContextProvider: React.FC<UserDataContextProps> = ({
	children,
}) => {
	const [userInfo, setUserInfo] = useState<UserInfo>({
		firstName: "",
		lastName: "",
		image: "",
	})
	const [loggedIn, setLoggedIn] = useState<boolean>(false)

	return (
		<UserDataContext.Provider
			value={{ userInfo, setUserInfo, loggedIn, setLoggedIn }}
		>
			{children}
		</UserDataContext.Provider>
	)
}

export default UserDataContextProvider
