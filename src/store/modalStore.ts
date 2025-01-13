import { create } from 'zustand'

export type ModalType = 'profile' | null

interface ModalState {
	currentModal: ModalType
	openModal: (modal: ModalType) => void
	closeModal: () => void
}

export const useModalStore = create<ModalState>(set => ({
	currentModal: null,
	openModal: modal => set({ currentModal: modal }),
	closeModal: () => set({ currentModal: null }),
}))
