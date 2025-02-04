import BadgeIcon from '@/assets/icons/BadgeIcon'
import Separator from '@/assets/icons/SeparatorIcon'
import TimerIcon from '@/assets/icons/TimerIcon'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import TopHolders from '@/components/TopHolders'
import TradingTabs from '@/components/TradingTabs'
import { sampleHolders } from '@/data/sampleHolders'
import { Coin } from '@/types/coin'
import { formatNumber } from '@/utils/formatNumber'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'

interface TradingTerminalProps {
	coinData: Coin
	tradingMode: string
	setTradingMode: (mode: string) => void
	solBalance: number
	wCoinBalance: number
	coinBalance: number
	tradingToken: string
	setTradingToken: (token: string) => void
}

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
	const [timeLeft, setTimeLeft] = useState<number>(0)

	useEffect(() => {
		const timer = setInterval(() => {
			const now = Date.now()
			const target = targetDate.getTime()
			setTimeLeft(Math.max(0, Math.floor((target - now) / 1000)))
		}, 1000)

		return () => clearInterval(timer)
	}, [targetDate])

	const formatTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const secs = seconds % 60

		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
				.toString()
				.padStart(2, '0')}`
		}
		return `${minutes}:${secs.toString().padStart(2, '0')}`
	}

	return <span>{formatTime(timeLeft)}</span>
}

export const TradingTerminal: React.FC<TradingTerminalProps> = ({
	coinData,
	tradingMode,
	setTradingMode,
	solBalance,
	wCoinBalance,
	coinBalance,
	tradingToken,
	setTradingToken,
}) => {
	const [inputValue, setInputValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')
	const [expectedOutput, setExpectedOutput] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(false)

	const debouncedSetValue = useCallback(
		debounce((value: string) => {
			setDebouncedValue(value)
		}, 300),
		[]
	)

	const fetchExpectedOutput = useCallback(async () => {
		if (!debouncedValue) {
			setExpectedOutput(0)
			return
		}

		if (tradingMode === 'unwrap') {
			setExpectedOutput(Number(debouncedValue))
			return
		}

		setIsLoading(true)
		try {
			// Add artificial delay
			await new Promise(resolve => setTimeout(resolve, 800))

			const response = await fetch('/api/getExpectedOutput', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					amount: debouncedValue,
					mode: tradingMode,
					tokenAddress: coinData.ca,
				}),
			})
			const data = await response.json()
			setExpectedOutput(Number(data.expectedAmount))
		} catch (error) {
			console.error('Failed to fetch expected output:', error)
			setExpectedOutput(0)
		} finally {
			setIsLoading(false)
		}
	}, [debouncedValue, tradingMode, coinData.ca])

	useEffect(() => {
		fetchExpectedOutput()
	}, [debouncedValue, tradingMode, fetchExpectedOutput])

	const isLaunched = !coinData.graduation || new Date() >= coinData.graduation
	const isAMM = coinData.type === 'amm'

	return (
		<div className='flex flex-col w-full lg:right-0 lg:top-0'>
			<div className='flex flex-col gap-4 self-stretch border border-dark-700 p-5 rounded-[10px] mb-4'>
				<TradingTabs
					tradingMode={tradingMode}
					setTradingMode={setTradingMode}
					onRefreshRate={fetchExpectedOutput}
				/>
				<div className='flex flex-col gap-2'>
					<label className='text-light-100 mt-1 font-ibm-mono uppercase font-semibold text-sm'>
						{tradingMode === 'buy'
							? 'Purchase'
							: tradingMode === 'sell'
							? 'Sale'
							: 'Unwrap'}{' '}
						amount
					</label>
					<div className='flex flex-col gap-1'>
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
								placeholder='0.00'
								value={inputValue}
								onChange={e => {
									setInputValue(e.target.value)
									debouncedSetValue(e.target.value)
								}}
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
										value={tradingToken}
										baseTicker={coinData.ticker}
										onChange={value => {
											setTradingToken(value)
										}}
									></Dropdown>
								) : (
									<div className='text-light-100 text-base font-semibold opacity-30'>
										mw{coinData.ticker}
									</div>
								)}
							</div>
						</div>
						<div className='flex gap-1.5 mt-1'>
							<button
								onClick={() => {
									setInputValue('')
									debouncedSetValue('')
								}}
								className='px-2 py-1 text-xs font-ibm-mono font-semibold uppercase bg-dark-700 hover:bg-dark-600 text-light-100 rounded-lg transition-colors'
							>
								reset
							</button>
							{tradingMode === 'buy'
								? ['0.1', '0.5', '1'].map(amount => (
										<button
											key={amount}
											onClick={() => {
												setInputValue(amount)
												debouncedSetValue(amount)
											}}
											className='px-2 py-1 text-xs font-ibm-mono font-semibold uppercase bg-dark-700 hover:bg-dark-600 text-light-100 rounded-lg transition-colors'
										>
											{amount} SOL
										</button>
								  ))
								: [25, 50, 75, 100].map(percentage => {
										const currentBalance =
											tradingToken === coinData.ticker
												? coinBalance
												: wCoinBalance
										const amount = (
											(currentBalance * percentage) /
											100
										).toFixed(4)
										return (
											<button
												key={percentage}
												onClick={() => {
													setInputValue(amount)
													debouncedSetValue(amount)
												}}
												className='px-2 py-1 text-xs font-ibm-mono font-semibold uppercase bg-dark-700 hover:bg-dark-600 text-light-100 rounded-lg transition-colors'
											>
												{percentage}%
											</button>
										)
								  })}
						</div>
						<div
							className={`text-sm text-light-100 font-ibm-mono font-semibold mt-2 ${
								isLoading
									? 'animate-[blink_1s_ease-in-out_infinite]'
									: 'opacity-60'
							}`}
						>
							{tradingMode === 'buy'
								? `≈ ${formatNumber(expectedOutput)} ${coinData.ticker}`
								: tradingMode === 'sell'
								? `≈ ${formatNumber(expectedOutput)} SOL`
								: `${formatNumber(expectedOutput)} ${coinData.ticker}`}
						</div>
					</div>
				</div>
				<Button
					className='w-full'
					disabled={!inputValue || Number(inputValue) === 0}
				>
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
							<img
								src={coinData.image}
								alt={coinData.name}
								className='w-5 h-5'
							/>
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
							<img
								src={coinData.image}
								alt={coinData.name}
								className='w-5 h-5'
							/>
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
					{isLaunched || isAMM
						? `This coin is trading on ${coinData.platform?.toUpperCase()} bonding curve`
						: 'This is a pool launch. Everyone shares the same price at Pump launch, snipers-free'}
				</p>
				{coinData.graduation && !isLaunched && !isAMM && (
					<div
						className='flex items-center justify-center 
          gap-1 mt-2 text-light-100 font-semibold 
          font-ibm-mono'
					>
						<TimerIcon />
						<span className='ml-1 mr-2 uppercase'>
							{coinData.platform === 'pump'
								? 'pump launch in '
								: 'curve starts in '}
						</span>
						<CountdownTimer targetDate={coinData.graduation} />
					</div>
				)}
			</div>
			<div className='group max-w-full mb-8 relative p-5 bg-gradient-to-b from-[#2B1853] to-[#391E73] rounded-[10px] shadow-[inset_0px_-3px_10.899999618530273px_0px_rgba(72,38,145,0.67)] border border-[#8769de] border-opacity-30 flex-col justify-start items-start gap-3 flex'>
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
					We value transparency. Coins with a high moon score get better
					exposure on moon.zip
				</div>
			</div>
			<h2 className='text-light-100 font-ibm-mono uppercase text-sm font-semibold mb-3'>
				Top holders
			</h2>
			<TopHolders holders={sampleHolders} />
		</div>
	)
}

export const TradingTerminalSkeleton: React.FC = () => {
	return (
		<div className='flex flex-col w-full lg:right-0 lg:top-0 animate-pulse'>
			<div className='flex flex-col gap-4 self-stretch border border-dark-700 p-5 rounded-[10px] mb-4'>
				<div className='h-8 bg-dark-700 rounded w-full' />
				<div className='h-4 bg-dark-700 rounded w-1/2' />
				<div className='h-10 bg-dark-700 rounded w-full mt-2' />
				<div className='h-10 bg-dark-700 rounded w-1/2 mt-2' />
			</div>
		</div>
	)
}

export default TradingTerminal
