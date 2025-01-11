import AmmIcon from '@/assets/icons/AmmIcon'
import CardsIcon from '@/assets/icons/CardsIcon'
import PoolIcon from '@/assets/icons/PoolIcon'
import { CoinType, useFilterStore } from '@/store/filterStore'
import Tab from './Tab'

export default function CoinTabs() {
	const { coinType, setCoinType } = useFilterStore()

	return (
		<div
			className={`h-[38px] border-b w-full lg:w-auto border-dark-700 justify-start items-center gap-6 inline-flex`}
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
				<div className='px-1.5 bg-light-100 ml-1 text-dark-800 rounded justify-start items-center uppercase flex text-xs font-bold font-ibm-mono hidden lg:block'>
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
		</div>
	)
}
