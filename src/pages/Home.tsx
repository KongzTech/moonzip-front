import CoinCard from '@/components/CoinCard'
import CoinCardSkeleton from '@/components/CoinCardSkeleton'
import Filters from '@/components/Filters'
import Highlight from '@/components/Highlight'
import HighlightSkeleton from '@/components/HighlightSkeleton'
import TableView from '@/components/TableView'
import { sampleCoins } from '@/data/sampleCoins'
import { useFilterStore, ViewMode } from '@/store/filterStore'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Home = () => {
	const [loading, setLoading] = useState(true)
	const [coins, setCoins] = useState<typeof sampleCoins>([])
	const viewMode = useFilterStore(state => state.viewMode)
	const { pause, unpause, explicitlyPaused } = useFilterStore()

	const isMobile = window.innerWidth < 768

	useEffect(() => {
		// Simulate loading delay
		const timer = setTimeout(() => {
			setCoins(sampleCoins)
			setLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	const addSampleCoin = () => {
		const newCoin = {
			...sampleCoins[Math.floor(Math.random() * sampleCoins.length)],
			ca: `0x${Math.random().toString(16).slice(2, 12)}`,
		}
		setCoins(prev => [newCoin, ...prev])
	}

	return (
		<div className='flex z-0 flex-col pb-10 items-center max-w-[1440px] px-4 md:px-8 w-full gap-4 mx-auto'>
			{loading ? <HighlightSkeleton /> : <Highlight />}
			<Filters />
			{loading ? (
				<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full'>
					<CoinCardSkeleton key={1} />
					<CoinCardSkeleton key={2} />
					<CoinCardSkeleton key={3} />
					<CoinCardSkeleton key={4} />
					<CoinCardSkeleton key={5} />
					<CoinCardSkeleton key={6} />
					<CoinCardSkeleton key={7} />
					<CoinCardSkeleton key={8} />
					<CoinCardSkeleton key={9} />
				</div>
			) : viewMode === ViewMode.GRID ? (
				<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full'>
					<AnimatePresence>
						{coins.map(coin => (
							<motion.div
								key={coin.ca}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.2 }}
								className='flex-1 flex'
							>
								<CoinCard coin={coin} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			) : (
				<div
					className='w-full'
					{...(!isMobile &&
						!explicitlyPaused && {
							onMouseEnter: pause,
						})}
					{...(!explicitlyPaused && { onMouseLeave: unpause })}
				>
					<TableView coins={coins} />
				</div>
			)}

			<motion.button
				className='fixed bottom-6 right-6 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-200 active:scale-95 transition-all'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={addSampleCoin}
			>
				<span className='text-2xl text-white font-bold'>+</span>
			</motion.button>
		</div>
	)
}

export default Home
