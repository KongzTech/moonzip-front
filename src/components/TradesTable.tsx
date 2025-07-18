import ArchiveIcon from '@/assets/icons/ArchiveIcon'
import ExternalIcon from '@/assets/icons/ExternalIcon'
import { Trade } from '@/types/trade'
import { formatNumber } from '@/utils/formatNumber'
import { AnimatePresence, motion } from 'framer-motion'
import TimeAgo from './TimeAgo'

interface SerializedTrade extends Omit<Trade, 'timestamp'> {
	timestamp: string
}

interface TradesTableProps {
	trades: SerializedTrade[]
	coinTicker: string
}

const TradesTable = ({ trades, coinTicker }: TradesTableProps) => {
	return (
		<div className='flex flex-col rounded-[10px] overflow-hidden border border-dark-700 bg-dark-700'>
			<table className='w-full border-collapse bg-dark-700'>
				<tbody className='flex flex-col gap-[1px]'>
					<AnimatePresence>
						{trades.length > 0 ? (
							trades.slice(0, 10).map(trade => (
								<motion.tr
									key={trade.txHash}
									initial={{
										backgroundColor: 'rgb(147, 51, 234)',
										opacity: 0.7,
									}}
									animate={{ backgroundColor: 'rgb(17, 17, 17)', opacity: 1 }}
									whileHover={{
										backgroundColor: 'rgb(26, 26, 26)',
										opacity: 0.8,
									}}
									transition={{ duration: 0.3 }}
									className='bg-dark-800 text-sm font-ibm-sans font-medium text-light-100 flex w-full'
								>
									<td className='px-4 py-3 w-[120px]'>
										<div className='flex flex-col md:flex-row md:items-center md:gap-2'>
											<div className='flex items-center gap-2'>
												<img
													src={trade.profilePicture}
													alt='Profile'
													className='w-6 h-6 rounded-full'
												/>
												<span className='text-light-100'>
													{trade.userAddress.slice(0, 5)}
												</span>
											</div>
											<span className='md:hidden text-light-100'>
												<TimeAgo timestamp={trade.timestamp} />
											</span>
										</div>
									</td>
									<td className='px-4 hidden md:flex items-center py-3 w-[80px]'>
										<span
											className={`${
												trade.type === 'BUY'
													? 'text-green-100 font-ibm-mono font-semibold'
													: 'text-red-100 font-ibm-mono font-semibold'
											}`}
										>
											{trade.type}
										</span>
									</td>
									<td className='px-4 py-3 flex flex-1 md:flex-none flex-col md:flex-row md:w-[120px] text-light-100'>
										<div className='flex flex-1 justify-between items-center'>
											<span className=''>{trade.solAmount} SOL</span>
											<a
												href={`https://solscan.io/tx/${trade.txHash}`}
												target='_blank'
												rel='noopener noreferrer'
												className='icn-white-hover inline-flex items-center gap-1  md:hidden'
											>
												<ExternalIcon />
											</a>
										</div>

										<span
											className={`block md:hidden mt-0.5 ${
												trade.type === 'BUY'
													? 'text-green-100 font-ibm-mono font-semibold'
													: 'text-red-100 font-ibm-mono font-semibold'
											}`}
										>
											{trade.type === 'BUY'
												? `+${formatNumber(trade.coinAmount)} $${coinTicker}`
												: `-${formatNumber(trade.coinAmount)} $${coinTicker}`}
										</span>
									</td>
									<td
										className={`px-4 hidden md:flex items-center md:flex-1 py-3  text-light-100 `}
									>
										{trade.type === 'BUY'
											? `+${formatNumber(trade.coinAmount)} $${coinTicker}`
											: `-${formatNumber(trade.coinAmount)} $${coinTicker}`}
									</td>
									<td className='pr-4 md:px-4 py-3 text-right text-light-300 hidden md:flex items-center'>
										<a
											href={`https://solscan.io/tx/${trade.txHash}`}
											target='_blank'
											rel='noopener noreferrer'
											className='icn-white-hover inline-flex items-center gap-1'
										>
											<span className='hidden md:block'>
												<TimeAgo timestamp={trade.timestamp} />
											</span>
											<ExternalIcon />
										</a>
									</td>
								</motion.tr>
							))
						) : (
							<tr>
								<td className='px-4 py-8 bg-dark-800 text-light-100  font-ibm-mono text-sm flex items-center justify-center flex-col uppercase font-semibold gap-2 w-full'>
									<ArchiveIcon className='opacity-60' />
									<p className='opacity-60'>No trades found</p>
								</td>
							</tr>
						)}
					</AnimatePresence>
				</tbody>
			</table>
		</div>
	)
}

export default TradesTable
