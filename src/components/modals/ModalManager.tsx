import ProfileModal from '@/components/modals/ProfileModal'
import { useModalStore } from '@/store/modalStore'
import PFPModal from './PFPModal'
import SettingsModal from './SettingsModal'

export default function ModalManager() {
	const currentModal = useModalStore(state => state.currentModal)

	if (!currentModal) return null

	const modals = {
		profile: <ProfileModal />,
		pfp: <PFPModal />,
		settings: <SettingsModal />,
	}

	return modals[currentModal]
}
