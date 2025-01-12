import AmmIcon from '@/assets/icons/AmmIcon'
import CardsIcon from '@/assets/icons/CardsIcon'
import PauseIcon from '@/assets/icons/PauseIcon'
import PlayIcon from '@/assets/icons/PlayIcon'
import PoolIcon from '@/assets/icons/PoolIcon'
import { CoinType, useFilterStore } from '@/store/filterStore'
import Tab from './Tab'

export default function CoinTabs() {
	const { coinType, setCoinType, isPaused, pause, unpause } = useFilterStore()

	return (
		<div className='h-[38px] border-b border-dark-700 lg:border-b-0  w-full lg:w-auto justify-start items-center gap-5 lg:gap-6 inline-flex'>
			<Tab
				active={coinType === CoinType.ALL}
				onClick={() => setCoinType(CoinType.ALL)}
			>
				<CardsIcon />
				All Coins
			</Tab>
			<Tab
				active={coinType === CoinType.POOL}
				onClick={() => setCoinType(CoinType.POOL)}
			>
				<PoolIcon />
				Pools
				<div className='px-1.5 bg-light-100 ml-1 text-dark-800 rounded justify-start items-center uppercase text-xs font-bold font-ibm-mono hidden lg:block'>
					Suggested
				</div>
			</Tab>
			<Tab
				active={coinType === CoinType.AMM}
				onClick={() => setCoinType(CoinType.AMM)}
			>
				<AmmIcon />
				AMM
			</Tab>
			<div
				className={`cursor-pointer ml-auto lg:ml-0 h-[38px] items-center justify-start icn-white-hover ${
					isPaused ? 'icn-red' : ''
				}`}
				onClick={isPaused ? unpause : pause}
			>
				{isPaused ? <PauseIcon /> : <PlayIcon />}
			</div>
		</div>
	)
}
