// File: src/stores/use-user-store.ts (adjust path as needed)

import { create } from "zustand"
import { Requests, UserType } from "../requests/Requests"
import { LocalStorageElements } from "../utils/clearLocalStorage"

interface UserStore {
	allUserData: UserType[] | null
	setAllUserData: (data: UserType[]) => void
	getAllUserData: () => Promise<void>
	deleteUser: (userId: string) => Promise<void>
}

const useUserStore = create<UserStore>((set) => ({
	allUserData: null,
	setAllUserData: (data) => set({ allUserData: data }),
	getAllUserData: async () => {
		const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN)
		try {
			const response = await Requests.GET(
				"/subapps/mycuttingboard/admin/all-users",
				false,
				true,
				accessToken as string
			)
			set({ allUserData: response.data })
		} catch (error) {
			console.error("Error fetching user data:", error)
		}
	},
	deleteUser: async (userId) => {
		if (
			window.confirm("Are you sure you want to delete this user?") &&
			window.confirm(
				"One final check ... this is completely irreversible!! Make sure you really want to completely eradicate all of their data forever!!"
			)
		) {
			const accessToken = localStorage.getItem(
				LocalStorageElements.ACCESS_TOKEN
			)
			const encodedUserId = encodeURIComponent(userId)
			try {
				const response = await Requests.DELETE(
					`/subapps/mycuttingboard/admin/delete-user/${encodedUserId}`,
					accessToken as string
				)
				if (response.status === 200) {
					alert("User deleted successfully")
					set((state) => ({
						allUserData: state.allUserData?.filter(
							(user) => user.id !== userId
						),
					}))
				}
			} catch (error) {
				console.error("Error deleting user:", error)
			}
		}
	},
}))

export default useUserStore
