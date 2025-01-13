import CloseIcon from '@/assets/icons/CloseIcon'
import ButtonPrimary from '@/components/Button'
import Input from '@/components/Input'
import { useModalStore } from '@/store/modalStore'

export default function ProfileModal() {
	const closeModal = useModalStore(
		(state: { closeModal: () => void }) => state.closeModal
	)

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[200] animate-fade-in'>
			<div className='w-[312px] bg-dark-800 rounded-[20px] p-6 flex flex-col items-center relative animate-fade-in-up'>
				{/* Close Button */}
				<button
					onClick={closeModal}
					className='absolute right-6 top-6 text-light-100 hover:text-light-0'
				>
					<CloseIcon />
				</button>

				{/* Illustration */}
				<div className='w-16 h-16 rounded-full bg-dark-700 mb-6' />

				{/* Content */}
				<div className='w-full text-center mb-8'>
					<h2 className='text-light-0 text-xl font-bold font-barlow mb-2'>
						Create Profile
					</h2>
					<p className='text-light-100 text-sm font-medium font-ibm-sans'>
						Set up your profile to start trading
					</p>
				</div>

				{/* Form */}
				<div className='w-full space-y-4'>
					<Input placeholder='Enter username' className='w-full' />
					<ButtonPrimary className='w-full' onClick={closeModal}>
						Create Profile
					</ButtonPrimary>
				</div>
			</div>
		</div>
	)
}
