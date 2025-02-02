import BuyIcon from '@/assets/icons/BuyIcon'
import SellIcon from '@/assets/icons/SellIcon'
import VerticalDotsIcon from '@/assets/icons/VerticalDotsIcon'
import { useModalStore } from '@/store/modalStore'
import Dropdown from './Dropdown'
import Tab from './Tab'

interface TradingTabsProps {
	tradingMode: string
	setTradingMode: (mode: string) => void
}

export default function TradingTabs({
	tradingMode,
	setTradingMode,
}: TradingTabsProps) {
	const openModal = useModalStore(state => state.openModal)

	const handleActionSelect = (option: string) => {
		if (option === 'Settings') {
			openModal('settings')
		}
		if (option === 'Unwrap') {
			setTradingMode('unwrap')
		}
	}

	return (
		<div
			className={`h-[38px] w-full border-b border-dark-700 lg:w-auto justify-start items-start gap-5 lg:gap-6 inline-flex`}
		>
			<Tab active={tradingMode === 'buy'} onClick={() => setTradingMode('buy')}>
				<BuyIcon />
				Buy
			</Tab>
			<Tab
				active={tradingMode === 'sell'}
				onClick={() => setTradingMode('sell')}
			>
				<SellIcon />
				Sell
			</Tab>

			<div className='ml-auto flex items-center gap-2'>
				<Dropdown type='actions' align='right' onChange={handleActionSelect}>
					<div className=' flex items-center justify-start icn-white-hover'>
						<VerticalDotsIcon className='mb-max' />
					</div>
				</Dropdown>
			</div>
		</div>
	)
}
