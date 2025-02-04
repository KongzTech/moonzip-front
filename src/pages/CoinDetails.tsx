import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon'
import CoinsIcon from '@/assets/icons/CoinsIcon'
import TelegramIcon from '@/assets/icons/Telegram'
import TwitterIcon from '@/assets/icons/TwitterIcon'
import WebsiteIcon from '@/assets/icons/WebsiteIcon'
import ButtonSecondary from '@/components/ButtonSecondary'
import Dropdown from '@/components/Dropdown'
import NotFound from '@/components/NotFound'
import TradesPagination from '@/components/TradesPagination'
import TradesSkeleton from '@/components/TradesSkeleton'
import TradesTable from '@/components/TradesTable'
import TradingTerminal, {
	TradingTerminalSkeleton,
} from '@/components/TradingTerminal'
import { sampleCoins } from '@/data/sampleCoins'
import { AppDispatch, RootState } from '@/store'
import {
	addSampleData,
	fetchTradesForPage,
	setMinSolValue,
} from '@/store/tradesSlice'
import { formatNumber } from '@/utils/formatNumber'
import { formatTimeAgo } from '@/utils/formatTime'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {PriceChart} from "@/components/PriceChart";

const CoinDetails = () => {
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(fetchTradesForPage({ page: 1, minSolValue: '0' }))
	}, [dispatch])

	const { coinCA } = useParams()

	const { trades, currentPage, totalPages, loading, minSolValue } = useSelector(
		(state: RootState) => state.trades
	)
	const navigate = useNavigate()

	const [solBalance] = useState(20)
	const [coinBalance] = useState(90000)
	const [wCoinBalance] = useState(832902)
	const [tradingMode, setTradingMode] = useState('buy')
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
	const [maxChars, setMaxChars] = useState(100)

	useEffect(() => {
		const updateMaxChars = () => {
			if (window.innerWidth < 768) {
				setMaxChars(80)
			} else {
				setMaxChars(180)
			}
		}
		updateMaxChars()
		window.addEventListener('resize', updateMaxChars)
		return () => window.removeEventListener('resize', updateMaxChars)
	}, [])

	const coinData = sampleCoins.find(coin => coin.ca === coinCA)
	const [tradingToken, setTradingToken] = useState(coinData?.ticker || '')
	const [isTradingTerminalLoaded, setIsTradingTerminalLoaded] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsTradingTerminalLoaded(true), 1000)
		return () => clearTimeout(timer)
	}, [])

	if (!coinData) {
		return <NotFound />
	}

	const handlePageChange = (page: number) => {
		dispatch(fetchTradesForPage({ page, minSolValue }))
	}

	const shouldTruncate =
		coinData.description && coinData.description.length > maxChars
	const displayedDescription =
		!shouldTruncate || isDescriptionExpanded
			? coinData.description
			: coinData.description?.substring(0, maxChars).trim() + '...'

	return (
		<div className='mx-auto my-8 px-4 md:px-8 w-full max-w-[1440px] font-ibm-mono text-sm'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_340px] lg:grid-rows-[auto_auto_1fr] gap-8'>
				<div className='order-1 lg:order-1 lg:row-start-1'>
					<div className='text-light-100 text-sm font-ibm-mono font-semibold uppercase mb-3 flex flex-wrap w-full gap-3'>
						<button
							className='flex items-center uppercase h-[20px] underline hover:text-light-0 icn-white-hover'
							onClick={() => navigate(-1)}
						>
							<ChevronLeftIcon />
							Back
						</button>
						<span> • </span>
						<p>MCAP: ${formatNumber(coinData.mcap || 0)}</p>
						<span> • </span>
						<p>{formatTimeAgo(coinData.createdAt.getTime())}</p>
					</div>
          <div className="p-2 relative flex flex-col gap-2 h-[320px] lg:h-[480px]">
            <PriceChart projectId={coinCA || ""} tokenAddress={coinCA || ""} tokenSymbol="COIN" />
          </div>
				</div>

				{/* Green: Token Description Section */}
				<div className='order-2 lg:order-2 lg:row-start-2'>
					<div className='flex gap-4 mb-4 '>
						<div className='flex flex-col lg:flex-row flex-1 gap-3'>
							<div className='flex items-center border border-dark-700 rounded-[13px] h-[52px] w-[52px] p-[3px]'>
								<img
									src={coinData.image}
									alt={coinData.name}
									className='w-[44px] h-[44px] rounded-[10px]'
								/>
							</div>
							<div className='flex flex-col gap-1.5 flex-1'>
								<h1 className='text-xl font-barlow text-light-0 font-bold'>
									{coinData.name}
								</h1>
								<p className='text-purple-100 text-sm font-ibm-mono font-semibold'>
									${coinData.ticker}
								</p>
							</div>
						</div>
						<div className='flex gap-2 h-[38px] lg:h-[34px]'>
							{coinData.website && (
								<ButtonSecondary
									className='flex-1 w-[38px]  lg:flex-initial md:w-auto'
									onClick={() => window.open(coinData.website, '_blank')}
								>
									<div className='flex gap-1 items-center md:!px-3 h-[38px]   lg:h-[34px]'>
										<WebsiteIcon />
										<div className='ml-[1px] hidden md:block'>WEBSITE</div>
									</div>
								</ButtonSecondary>
							)}
							{coinData.telegram && (
								<ButtonSecondary
									className='flex-1 w-[38px]  lg:flex-initial md:w-auto'
									onClick={() => window.open(coinData.telegram, '_blank')}
								>
									<div className='flex gap-1 items-center md:!px-3 h-[38px] lg:h-[34px]'>
										<TelegramIcon />
										<div className='ml-[1px] hidden md:block'>TELEGRAM</div>
									</div>
								</ButtonSecondary>
							)}
							{coinData.twitter && (
								<ButtonSecondary
									className='flex-1 w-[38px]  lg:flex-initial md:w-auto'
									onClick={() => window.open(coinData.twitter, '_blank')}
								>
									<div className='flex gap-1 items-center md:!px-3 h-[38px] lg:h-[34px]'>
										<TwitterIcon />
										<div className='ml-[1px] hidden md:block'>TWITTER</div>
									</div>
								</ButtonSecondary>
							)}
						</div>
					</div>

					<div>
						<p className='inline text-light-100 font-ibm-sans text-sm font-medium'>
							{displayedDescription}&nbsp;
							{shouldTruncate && (
								<span
									onClick={() =>
										setIsDescriptionExpanded(!isDescriptionExpanded)
									}
									className='cursor-pointer text-light-100 underline uppercase font-ibm-mono font-semibold hover:text-light-0'
								>
									{isDescriptionExpanded ? 'See less' : 'See more'}
								</span>
							)}
						</p>
					</div>
				</div>

				{/* Blue: Trading Terminal */}
				<div className='order-3 lg:mt-8 lg:order-4 lg:col-start-2 lg:row-span-3'>
					{!isTradingTerminalLoaded ? (
						<TradingTerminalSkeleton />
					) : (
						<TradingTerminal
							coinData={coinData}
							tradingMode={tradingMode}
							setTradingMode={setTradingMode}
							solBalance={solBalance}
							wCoinBalance={wCoinBalance}
							coinBalance={coinBalance}
							tradingToken={tradingToken}
							setTradingToken={setTradingToken}
						/>
					)}
				</div>

				{/* Purple: Trades Area */}
				<div className='order-4 lg:order-3 lg:row-start-3'>
					<div className='flex justify-between items-center mb-3'>
						<h2 className='text-light-100 font-ibm-mono text-sm font-semibold'>
							TRADES
						</h2>
						<div className='flex items-center gap-2'>
							<Dropdown
								type='solValue'
								value={minSolValue}
								onChange={value => {
									dispatch(setMinSolValue(value))
									dispatch(fetchTradesForPage({ page: 1, minSolValue: value }))
								}}
								className='text-light-100'
								align='right'
							>
								<div className='flex items-center gap-1'>
									<CoinsIcon />
									<p className='text-light-100 mr-2'>Min value</p>
								</div>
							</Dropdown>
							<button
								onClick={() => dispatch(addSampleData())}
								className='px-3 py-1 bg-dark-700 text-light-100 rounded hover:bg-dark-600 transition-colors'
							>
								Add Trade
							</button>
						</div>
					</div>
					{loading ? (
						<TradesSkeleton />
					) : (
						<>
							<TradesTable trades={trades} coinTicker={coinData.ticker} />
							<TradesPagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default CoinDetails
