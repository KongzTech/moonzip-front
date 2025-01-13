import { create } from 'zustand'

interface UserState {
	moonHandle: string
	setMoonHandle: (handle: string) => void
}

export const useUserStore = create<UserState>(set => ({
	moonHandle: '',
	setMoonHandle: handle => set({ moonHandle: handle }),
}))
