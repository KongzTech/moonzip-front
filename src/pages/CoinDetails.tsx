import BadgeIcon from '@/assets/icons/BadgeIcon'
import Separator from '@/assets/icons/SeparatorIcon'
import TelegramIcon from '@/assets/icons/Telegram'
import TwitterIcon from '@/assets/icons/TwitterIcon'
import WebsiteIcon from '@/assets/icons/WebsiteIcon'
import Button from '@/components/Button'
import ButtonSecondary from '@/components/ButtonSecondary'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import TopHolders from '@/components/TopHolders'
import TradesTable from '@/components/TradesTable'
import TradingTabs from '@/components/TradingTabs'
import { sampleCoins } from '@/data/sampleCoins'
import { sampleHolders } from '@/data/sampleHolders'
import { sampleTrades } from '@/data/sampleTrades'
import { formatNumber } from '@/utils/formatNumber'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const TradingTerminal = ({
	coinData,
	tradingMode,
	setTradingMode,
	solBalance,
	wCoinBalance,
	coinBalance,
	tradingToken,
	setTradingToken,
}) => (
	<div className='flex flex-col w-full'>
		<div className='flex flex-col gap-4 self-stretch border border-dark-700 p-5 rounded-[10px] mb-4'>
			<TradingTabs tradingMode={tradingMode} setTradingMode={setTradingMode} />
			<div className=' flex flex-col gap-2'>
				<label className='text-light-100 mt-1 font-ibm-mono uppercase font-semibold text-sm'>
					{tradingMode === 'buy'
						? 'Purchase'
						: tradingMode === 'sell'
						? 'Sale'
						: 'Unwrap'}{' '}
					amount
				</label>
				<div className='relative w-full'>
					<Input
						type='number'
						min='0'
						max={
							tradingMode === 'buy'
								? solBalance
								: tradingMode === 'sell'
								? tradingToken === coinData.ticker
									? coinBalance
									: wCoinBalance
								: wCoinBalance
						}
						step='0.01'
						placeholder='Input the amount'
					/>
					<div className='absolute right-3 z-10 top-1/2 -translate-y-1/2 text-light-100 text-base font-semibold'>
						{tradingMode === 'buy' ? (
							<div className='text-light-100 text-base font-semibold opacity-30'>
								SOL
							</div>
						) : tradingMode === 'sell' ? (
							<Dropdown
								type='tokenType'
								align='right'
								value={coinData.ticker}
								onChange={value => {
									setTradingToken(value)
								}}
							>
								{tradingToken}
							</Dropdown>
						) : (
							<div className='text-light-100 text-base font-semibold opacity-30'>
								mw{coinData.ticker}
							</div>
						)}
					</div>
				</div>
			</div>
			<Button className='w-full'>
				{tradingMode === 'buy'
					? `Purchase $${coinData.ticker}`
					: tradingMode === 'sell'
					? `Sell $${tradingToken}`
					: 'Unwrap'}
			</Button>
			<div className='w-full flex items-center gap-4 justify-center'>
				<div className='h-[1px] flex-1 bg-dark-700'></div>
				<Separator className='opacity-60' />
				<div className='h-[1px] flex-1 bg-dark-700'></div>
			</div>
			<div className='flex w-full flex-col gap-2'>
				<label className='text-light-100 mt-1 font-ibm-mono uppercase font-semibold text-sm'>
					Your holdings
				</label>
				<div className='self-stretch flex flex-col gap-[1px] rounded-[10px] overflow-hidden'>
					<div className='flex items-center gap-2 w-full bg-dark-700 px-4 py-3'>
						<img src={coinData.image} alt={coinData.name} className='w-5 h-5' />
						<span className='text-light-100 font-ibm-mono font-semibold text-sm flex-1'>
							{formatNumber(wCoinBalance)} $mw{coinData.ticker}
						</span>

						<button
							className='text-light-100 font-ibm-mono uppercase underline hover:text-light-0 transition-colors duration-300 font-semibold text-sm'
							onClick={() => setTradingMode('unwrap')}
						>
							Unwrap
						</button>
					</div>
					<div className='flex items-center gap-2 w-full bg-dark-700 px-4 py-3'>
						<img src={coinData.image} alt={coinData.name} className='w-5 h-5' />

						<span className='text-light-100 font-ibm-mono font-semibold flex-1 text-sm'>
							{formatNumber(coinBalance)} ${coinData.ticker}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div className='flex flex-col gap-4 self-stretch border items-center justify-center text-light-100 border-dark-700 p-5 rounded-[10px] text-sm mb-8'>
			<div className='flex gap-2 font-ibm-mono font-semibold uppercase'>
				<span className={coinData.type === 'pool' ? 'text-green-100' : ''}>
					{coinData.type}
				</span>
				<span>•</span>
				<span className={coinData.lock !== 0 ? 'text-green-100' : ''}>
					{coinData.lock === 0 ? 'NO DEV LOCK' : `${coinData.lock}D DEV LOCK`}
				</span>
			</div>
			<p className='font-ibm-sans font-medium text-center'>
				This is a pool launch. Everyone shares the same price at Pump launch,
				snipers-free
			</p>
		</div>
		<div className='group max-w-full relative p-5 bg-gradient-to-b from-[#2B1853] to-[#391E73] rounded-[10px] shadow-[inset_0px_-3px_10.899999618530273px_0px_rgba(72,38,145,0.67)] border border-[#8769de] border-opacity-30 flex-col justify-start items-start gap-3 flex'>
			<div className='flex flex-col gap-1'>
				<div className='flex gap-1 justify-start items-center text-light-0 icn-white font-barlow font-bold text-xl'>
					<BadgeIcon />
					<span>{coinData.score ? (coinData.score / 10).toFixed(1) : 0}</span>
				</div>
				<p className='text-light-100 font-ibm-sans font-medium text-sm'>
					Coin's moon score
				</p>
			</div>
			<div className='flex flex-col gap-1 border-t border-light-0/10 pt-4 text-light-100 font-ibm-sans font-medium text-sm'>
				We value transparency. Coins with a high moon score get better exposure
				on moon.zip
			</div>
		</div>
	</div>
)

const CoinDetails = () => {
	const { coinCA } = useParams()
	const [solBalance, setSolBalance] = useState(0)
	const [coinBalance, setCoinBalance] = useState(0)
	const [wCoinBalance, setWCoinBalance] = useState(832902)
	const [tradingMode, setTradingMode] = useState('buy')

	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

	// Find the coin data from sample coins
	const coinData = sampleCoins.find(coin => coin.ca === coinCA)

	const [tradingToken, setTradingToken] = useState(coinData?.ticker)

	if (!coinData) {
		return <div>Coin not found</div>
	}

	return (
		<div className='mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8 lg:px-8 w-full max-w-[1440px] font-ibm-mono text-sm'>
			<div className='flex flex-1 flex-col font-ibm-mono font-semibold text-sm'>
				<iframe
					className='w-full h-[320px] lg:h-[480px] mb-6 lg:mb-8'
					src='https://s.tradingview.com/widgetembed/?frameElementId=tradingview_cf8e1&symbol=SOLUSDT&interval=60&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=exchange'
					style={{ border: 'none' }}
					allowTransparency={true}
					allowFullScreen={true}
				></iframe>

				<div className='flex flex-col lg:flex-row gap-4 w-full mb-4'>
					<div className='flex flex-1 gap-3'>
						<div className='flex items-center border border-dark-700 rounded-full h-[52px] w-[52px] p-[3px]'>
							<img
								src={coinData.image}
								alt={coinData.name}
								className='w-[44px] h-[44px] rounded-full'
							/>
						</div>
						<div className='flex flex-col gap-1.5 flex-1'>
							<h1 className='text-xl font-barlow text-light-0 font-bold'>
								{coinData.name}
							</h1>
							<p className='text-purple-100 text-sm font-ibm-mono'>
								${coinData.ticker}
							</p>
						</div>
					</div>

					<div className='flex gap-2 w-full lg:w-auto h-[38px] lg:h-[34px]'>
						{coinData.website && (
							<ButtonSecondary
								className='flex-1 lg:flex-initial lg:w-auto'
								onClick={() => window.open(coinData.website, '_blank')}
							>
								<div className=' flex gap-1 items-center md:!px-3 h-[38px] lg:h-[34px]'>
									<WebsiteIcon />
									<div className='ml-[1px]'>WEBSITE </div>
								</div>
							</ButtonSecondary>
						)}
						{coinData.telegram && (
							<ButtonSecondary
								className='flex-1 lg:flex-initial lg:w-auto'
								onClick={() => window.open(coinData.telegram, '_blank')}
							>
								<div className='flex gap-1 items-center md:!px-3 h-[38px] lg:h-[34px]'>
									<TelegramIcon />
									<div className='ml-[1px]'>TELEGRAM</div>
								</div>
							</ButtonSecondary>
						)}
						{coinData.twitter && (
							<ButtonSecondary
								className='flex-1 lg:flex-initial lg:w-auto'
								onClick={() => window.open(coinData.twitter, '_blank')}
							>
								<div className=' flex gap-1 items-center md:!px-3 h-[38px] lg:h-[34px]'>
									<TwitterIcon />
									<div className='ml-[1px]'>TWITTER</div>
								</div>
							</ButtonSecondary>
						)}
					</div>
				</div>

				<div className='relative flex w-full flex-col justify-start gap-2 mb-6 lg:mb-0 lg:mt-0'>
					<p
						className={`text-light-100 font-ibm-sans text-sm font-medium md:max-w-[400px] ${
							!isDescriptionExpanded ? 'line-clamp-2' : ''
						}`}
					>
						{coinData.description}
						{coinData?.description?.length &&
							coinData.description.length > 100 &&
							!isDescriptionExpanded && (
								<button
									onClick={() => setIsDescriptionExpanded(true)}
									className='block lg:absolute lg:bottom-0 lg:right-0 text-light-100 underline uppercase font-ibm-mono font-semibold hover:text-light-0 lg:ml-1'
								>
									See more
								</button>
							)}
					</p>
				</div>

				{/* Trading terminal shown on mobile */}
				<div className='lg:hidden mb-8'>
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
				</div>

				<div className='mt-8'>
					<h2 className='text-light-100 font-ibm-mono text-sm font-semibold mb-3'>
						TRADES
					</h2>
					<TradesTable trades={sampleTrades} coinTicker={coinData.ticker} />
				</div>
			</div>

			{/* Right column with trading terminal shown on desktop */}
			<div className='hidden lg:flex flex-col w-full md:max-w-[340px]'>
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
				<div className='mt-8'>
					<h2 className='text-light-100 font-ibm-mono text-sm font-semibold mb-3'>
						TOP HOLDERS
					</h2>
					<TopHolders holders={sampleHolders} />
				</div>
			</div>
		</div>
	)
}

export default CoinDetails
