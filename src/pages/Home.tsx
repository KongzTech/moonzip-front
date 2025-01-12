import CoinCard from '@/components/CoinCard'
import CoinCardSkeleton from '@/components/CoinCardSkeleton'
import Filters from '@/components/Filters'
import Highlight from '@/components/Highlight'
import HighlightSkeleton from '@/components/HighlightSkeleton'
import TableView from '@/components/TableView'
import { sampleCoins } from '@/data/sampleCoins'
import { useFilterStore, ViewMode } from '@/store/filterStore'
import { useEffect, useState } from 'react'

const Home = () => {
	const [loading, setLoading] = useState(true)
	const [coins, setCoins] = useState<typeof sampleCoins>([])
	const viewMode = useFilterStore(state => state.viewMode)
	const { pause, unpause } = useFilterStore()

	const isMobile = window.innerWidth < 768

	useEffect(() => {
		// Simulate loading delay
		const timer = setTimeout(() => {
			setCoins(sampleCoins)
			setLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className='flex z-0 flex-col pb-10 items-center max-w-[1440px] px-4 md:px-8 w-full gap-4 mx-auto'>
			{loading ? <HighlightSkeleton /> : <Highlight />}
			<Filters />
			{loading ? (
				<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full'>
					{Array(9)
						.fill(0)
						.map((_, index) => (
							<CoinCardSkeleton key={index} />
						))}
				</div>
			) : viewMode === ViewMode.GRID ? (
				<div
					className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full'
					{...(!isMobile && {
						onMouseEnter: pause,
						onMouseLeave: unpause,
					})}
				>
					{coins.map(coin => (
						<CoinCard key={coin.ca} coin={coin} />
					))}
				</div>
			) : (
				<div
					className='w-full'
					{...(!isMobile && {
						onMouseEnter: pause,
						onMouseLeave: unpause,
					})}
				>
					<TableView coins={coins} />
				</div>
			)}
		</div>
	)
}

export default Home
