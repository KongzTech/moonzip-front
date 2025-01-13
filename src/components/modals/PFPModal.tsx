import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon'
import CloseIcon from '@/assets/icons/CloseIcon'
import PFPPlaceholderIcon from '@/assets/icons/PFPPlaceholderIcon'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { ModalType, useModalStore } from '@/store/modalStore'
import { useUserStore } from '@/store/userStore'
import { useWallet } from '@solana/wallet-adapter-react'

export default function ProfileModal() {
	const closeModal = useModalStore(
		(state: { closeModal: () => void }) => state.closeModal
	)
	const openModal = useModalStore(
		(state: { openModal: (modal: ModalType) => void }) => state.openModal
	)

	const { publicKey } = useWallet()
	const walletAddress = publicKey?.toBase58() || ''
	const moonHandle = useUserStore(state => state.moonHandle)
	const setMoonHandle = useUserStore(state => state.setMoonHandle)

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[200]'>
			<div className='md:w-[324px] w-full bg-dark-800 rounded-t-[20px] md:rounded-[20px] p-6 flex flex-col items-center md:relative absolute bottom-0'>
				{/* Close Button */}
				<button
					onClick={closeModal}
					className='absolute right-6 top-6 text-light-100 icn-white-hover'
				>
					<CloseIcon />
				</button>
				<button
					onClick={() => openModal('profile')}
					className='absolute left-6 top-6 text-light-100 icn-white-hover'
				>
					<ChevronLeftIcon />
				</button>

				{/* Content */}
				<div className='w-full text-center mb-6'>
					<h2 className='text-light-0 text-xl font-bold font-barlow mb-3'>
						Profile Picture
					</h2>
					<p className='text-light-100 text-sm font-medium font-ibm-sans'>
						Choose your pfp wisely, anon
					</p>
				</div>

				{/* Form */}
				<form className='w-full'>
					<div className='flex flex-col gap-2'>
						<label className='text-light-100 text-sm font-semibold font-ibm-mono uppercase'>
							Moon handle
						</label>
						<Input
							value={moonHandle}
							onChange={e => setMoonHandle(e.target.value)}
							placeholder={`@ ${walletAddress.slice(
								0,
								5
							)}...${walletAddress.slice(-5)}`}
							className='w-full mb-5'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label className='text-light-100 text-sm font-semibold font-ibm-mono uppercase'>
							Selected pfp
						</label>
						<div className='w-full p-4 border hover:opacity-80 hover:bg-dark-750 cursor-pointer border-dark-700 flex items-center gap-3 rounded-xl mb-6'>
							<PFPPlaceholderIcon />
							<div className='text-light-100 flex-1 text-sm font-medium font-ibm-sans flex flex-col gap-0.5'>
								Undeads
								<div className='text-light-0 text-sm font-semibold font-ibm-mono'>
									Moon Cadet
								</div>
							</div>
							<ChevronRightIcon />
						</div>
					</div>

					<Button className='w-full' onClick={closeModal}>
						Create Profile
					</Button>
				</form>
			</div>
		</div>
	)
}
