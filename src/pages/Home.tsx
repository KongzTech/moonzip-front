import CoinCard from '@/components/CoinCard'
import CoinCardSkeleton from '@/components/CoinCardSkeleton'
import Filters from '@/components/Filters'
import Highlight from '@/components/Highlight'
import HighlightSkeleton from '@/components/HighlightSkeleton'
import { sampleCoins } from '@/data/sampleCoins'
import { useEffect, useState } from 'react'

const Home = () => {
	const [loading, setLoading] = useState(true)
	const [coins, setCoins] = useState<typeof sampleCoins>([])

	useEffect(() => {
		// Simulate loading delay
		const timer = setTimeout(() => {
			setCoins(sampleCoins)
			setLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className='flex flex-col items-center max-w-[1440px] px-4 md:px-8 w-full gap-4 mx-auto'>
			{loading ? <HighlightSkeleton /> : <Highlight />}
			<Filters />
			<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full'>
				{loading
					? Array(6)
							.fill(0)
							.map((_, index) => <CoinCardSkeleton key={index} />)
					: coins.map(coin => <CoinCard key={coin.ca} coin={coin} />)}
			</div>
		</div>
	)
}

export default Home
