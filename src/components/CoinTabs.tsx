import AmmIcon from '@/assets/icons/AmmIcon'
import CardsIcon from '@/assets/icons/CardsIcon'
import CloseIcon from '@/assets/icons/CloseIcon'
import FilterIcon from '@/assets/icons/FilterIcon'
import PauseIcon from '@/assets/icons/PauseIcon'
import PlayIcon from '@/assets/icons/PlayIcon'
import PoolIcon from '@/assets/icons/PoolIcon'
import { CoinType, useFilterStore } from '@/store/filterStore'
import Tab from './Tab'

export default function CoinTabs({ isSticky }: { isSticky: boolean }) {
	const {
		coinType,
		setCoinType,
		isPaused,
		explicitlyPause,
		explicitlyUnpause,
		filtersShown,
		showFilters,
		hideFilters,
	} = useFilterStore()
	const isMobile = window.innerWidth < 1024
	return (
		<div
			className={`h-[38px] ${
				filtersShown || !isMobile
					? 'border-b border-dark-700 lg:border-b-0'
					: ''
			} w-full lg:w-auto justify-start items-center gap-5 lg:gap-6 inline-flex`}
		>
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
			<div className='ml-auto flex items-center gap-2'>
				<div
					className={`cursor-pointer lg:ml-0 h-[38px] items-center justify-start ${
						isMobile ? '' : 'icn-white-hover'
					} ${isPaused ? 'icn-red' : ''}`}
					onClick={isPaused ? explicitlyUnpause : explicitlyPause}
				>
					{isPaused ? <PauseIcon /> : <PlayIcon />}
				</div>
				<div
					className={`${
						isSticky && isMobile ? '' : 'hidden'
					} cursor-pointer lg:ml-0 h-[38px] items-center justify-start ${
						isMobile ? '' : 'icn-white-hover'
					}`}
					onClick={filtersShown ? hideFilters : showFilters}
				>
					{filtersShown ? <CloseIcon /> : <FilterIcon />}
				</div>
			</div>
		</div>
	)
}
