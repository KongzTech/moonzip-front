import BadgeIcon from '@/assets/icons/BadgeIcon'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon'
import { Coin } from '@/types/coin'
import { formatGraduation } from '@/utils/formatGraduation'
import { formatNumber } from '@/utils/formatNumber'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

enum LockStatus {
	SECURE = 'text-green-100',
	NEUTRAL = 'text-light-100',
	UNLOCKED = 'text-yellow-100',
}

const getLockStatus = (lock: number | undefined): LockStatus => {
	if (!lock) return LockStatus.UNLOCKED
	if (lock > 1) return LockStatus.SECURE
	return LockStatus.NEUTRAL
}

const isMobile = window.innerWidth < 768

export default function TableView({ coins }: { coins: Coin[] }) {
	const navigate = useNavigate()
	return (
		<div className='w-full overflow-x-auto'>
			<table className='w-full lg:bg-dark-700 lg:rounded-[10px] overflow-hidden lg:border lg:border-dark-700 border-collapse'>
				<thead className='bg-dark-800 hidden lg:table-header-group w-full rounded-t-[10px]'>
					<tr className='text-left text-sm font-ibm-mono uppercase text-light-100'>
						<th className='px-4 py-3'>Token</th>
						<th className='px-4 py-3'>MCAP</th>
						<th className='px-4 py-3'>Type</th>
						<th className='px-4 py-3'>Lock</th>
						<th className='px-4 py-3'>Time</th>
					</tr>
				</thead>
				<tbody>
					<AnimatePresence>
						{coins.map(coin => (
							<motion.tr
								key={coin.ca}
								initial={{ backgroundColor: 'rgb(147, 51, 234)', opacity: 0.7 }}
								animate={{ backgroundColor: 'rgb(17, 17, 17)', opacity: 1 }}
								transition={{ duration: 0.3 }}
								className='!cursor-pointer first:border-t-0 lg:first:border-t border-t border-dark-700 hover:bg-dark-750 hover:opacity-80 text-light-100 font-ibm-mono font-semibold uppercase text-sm lg:table-row flex items-center'
								onClick={() => navigate(`/coin/${coin.ca}`)}
							>
								<td className='pr-2 lg:px-4 py-5 flex-1 lg:py-3 '>
									<div className='flex items-center  gap-2.5 lg:gap-4'>
										<div
											className={` w-[62px] hidden lg:flex items-center gap-1 ${
												coin.score === 100 ? 'icn-purple' : ''
											}`}
										>
											<BadgeIcon />
											<span
												className={`${
													coin.score === 100
														? 'text-purple-100'
														: 'text-light-100'
												} text-sm font-semibold`}
											>
												{coin.score ? (coin.score / 10).toFixed(1) : '0.0'}
											</span>
										</div>
										<img
											className='w-8 h-8 lg:w-9 lg:h-9 rounded-[10px]'
											src={coin.image}
											alt={coin.name}
										/>
										<div className='flex flex-col lg:flex-row gap-1 lg:gap-2 max-w-[80px] lg:max-w-[400px] overflow-hidden'>
											<div className='text-light-0 capitalize truncate '>
												{coin.name}
											</div>
											<span className='lg:text-sm truncate text-xs'>
												${coin.ticker}
											</span>
										</div>
									</div>
								</td>
								<td className='pr-2 py-3 lg:px-4 w-[100px] lg:w-auto'>
									<div className='flex flex-col text-xs lg:text-sm lg:flex-row gap-1'>
										<div>
											{isMobile
												? 'MC: $' + formatNumber(coin.mcap ?? 0)
												: '$' + formatNumber(coin.mcap ?? 0)}
										</div>
										<div className='lg:hidden flex gap-1'>
											<div>{coin.type}</div>•
											<div className={` ${getLockStatus(coin.lock)}`}>
												{coin.lock ? coin.lock.toString() + 'D ' : 'NO '}
											</div>
										</div>
									</div>
								</td>
								<td className='px-4 py-3 hidden lg:table-cell'>
									<div className=''>{coin.type}</div>
								</td>
								<td className='px-4 py-3 hidden lg:table-cell'>
									<div
										className={`${getLockStatus(
											coin.lock
										)} text-sm font-semibold font-ibm-mono`}
									>
										{coin.lock ? coin.lock.toString() + 'D ' : 'NO '}
									</div>
								</td>
								<td className='lg:px-4 py-3 flex lg:table-cell items-center text-xs lg:text-sm justify-between'>
									<div className='flex flex-col lg:items-center lg:flex-row gap-1'>
										<div
											className={`h-[16px] w-[62px] flex lg:hidden items-center ${
												coin.score === 100 ? 'icn-purple' : ''
											}`}
										>
											<BadgeIcon className='scale-75 ' />
											<span
												className={`${
													coin.score === 100
														? 'text-purple-100'
														: 'text-light-100'
												} `}
											>
												{coin.score ? (coin.score / 10).toFixed(1) : '0.0'}
											</span>
										</div>
										<div className='flex-1'>
											{formatGraduation(coin.graduation)}
										</div>
										<ChevronRightIcon className='hidden lg:block' />
									</div>

									<ChevronRightIcon className='lg:hidden' />
								</td>
							</motion.tr>
						))}
					</AnimatePresence>
				</tbody>
			</table>
		</div>
	)
}
