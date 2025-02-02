import ExternalIcon from '@/assets/icons/ExternalIcon'
import { Trade } from '@/types/trade'
import { formatNumber } from '@/utils/formatNumber'
import { formatDistanceToNow } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'

interface TradesTableProps {
	trades: Trade[]
	coinTicker: string
}

const TradesTable = ({ trades, coinTicker }: TradesTableProps) => {
	return (
		<div className='flex flex-col rounded-[10px] overflow-hidden border border-dark-700 bg-dark-700'>
			<table className='w-full border-collapse bg-dark-700'>
				<tbody className='flex flex-col gap-[1px]'>
					<AnimatePresence>
						{trades.map((trade, index) => (
							<motion.tr
								key={index}
								initial={{ backgroundColor: 'rgb(147, 51, 234)', opacity: 0.7 }}
								animate={{ backgroundColor: 'rgb(17, 17, 17)', opacity: 1 }}
								whileHover={{
									backgroundColor: 'rgb(26, 26, 26)',
									opacity: 0.8,
								}}
								transition={{ duration: 0.3 }}
								className='bg-dark-800 text-sm font-ibm-sans font-medium text-light-100 flex w-full'
							>
								<td className='px-4 py-3 w-[120px]'>
									<div className='flex items-center gap-2'>
										<img
											src={trade.profilePicture}
											alt='Profile'
											className='w-6 h-6 rounded-full'
										/>
										<span className='text-light-100'>{trade.userAddress}</span>
									</div>
								</td>
								<td className='px-4 py-3 w-[80px]'>
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
								<td className='px-4 py-3 w-[120px] text-light-100'>
									{trade.solAmount} SOL
								</td>
								<td className='px-4 py-3 w-[160px] text-light-100'>
									{trade.type === 'BUY'
										? `+ ${formatNumber(trade.coinAmount)} $${coinTicker}`
										: `- ${formatNumber(trade.coinAmount)} $${coinTicker}`}
								</td>
								<td className='px-4 py-3 flex-1 text-right text-light-300'>
									<a
										href={`https://solscan.io/tx/${trade.txHash}`}
										target='_blank'
										rel='noopener noreferrer'
										className='icn-white-hover inline-flex items-center gap-1'
									>
										{formatDistanceToNow(trade.timestamp, {
											addSuffix: false,
										})}{' '}
										ago
										<ExternalIcon />
									</a>
								</td>
							</motion.tr>
						))}
					</AnimatePresence>
				</tbody>
			</table>
		</div>
	)
}

export default TradesTable
