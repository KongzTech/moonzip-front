import ProfileModal from '@/components/modals/ProfileModal'
import { useModalStore } from '@/store/modalStore'

export default function ModalManager() {
	const currentModal = useModalStore(state => state.currentModal)

	if (!currentModal) return null

	const modals = {
		profile: <ProfileModal />,
	}

	return modals[currentModal]
}
