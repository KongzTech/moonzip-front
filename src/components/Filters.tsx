import LockIcon from '@/assets/icons/LockIcon'
import CoinTabs from './CoinTabs'
import Dropdown from './Dropdown'
import LayoutTab from './LayoutTab'

const isMobile: boolean = window.innerWidth < 768

export default function Filters() {
	return (
		<div className='flex flex-col lg:flex-row items-center mt-10 gap-6 lg:border-b lg:border-dark-700 w-full'>
			<CoinTabs />
			<div className=' lg:ml-auto self-stretch lg:mt-0 flex items-center lg:gap-6 gap-4'>
				<Dropdown
					className=' max-w-fit h-[38px] pb-[14px]'
					align={isMobile ? 'left' : 'right'}
					type='devLock'
				>
					<div className='flex items-center gap-1'>
						<LockIcon className='lg:block hidden' />
						<div className='text-light-100 hidden lg:block mr-2'>
							Minimal Lock
						</div>
					</div>
				</Dropdown>
				<Dropdown
					className='mr-auto lg:mr-0 max-w-[180px] h-[38px] pb-[14px]'
					align={isMobile ? 'left' : 'right'}
					type='sort'
				/>
				<LayoutTab />
			</div>
		</div>
	)
}
