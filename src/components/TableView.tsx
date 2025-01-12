import BadgeIcon from '@/assets/icons/BadgeIcon'
import { Coin } from '@/types/coin'
import { formatNumber } from '@/utils/formatNumber'

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

const formatGraduationTime = (graduationDate: Date | undefined): string => {
	if (!graduationDate) return ''

	const timeLeft = graduationDate.getTime() - Date.now()

	if (timeLeft < 0) return 'Grad'

	return timeLeft > 60000
		? `${Math.floor(timeLeft / 60000)}m`
		: `${Math.floor(timeLeft / 1000)}s`
}

export default function TableView({ coins }: { coins: Coin[] }) {
	return (
		<div className='w-full overflow-x-auto'>
			<table className='w-full bg-dark-700 rounded-[10px] overflow-hidden border border-dark-700 border-collapse'>
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
					{coins.map(coin => (
						<tr
							key={coin.ca}
							className='border-t border-dark-700 bg-dark-800 text-light-100 font-ibm-mono font-semibold uppercase text-sm'
						>
							<td className='px-4 py-4 lg:py-3 '>
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
							<td className='px-3 py-3'>
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
							<td className='p-4 flex flex-col text-xs lg:text-sm gap-1'>
								<div
									className={` w-[62px] flex lg:hidden items-center ${
										coin.score === 100 ? 'icn-purple' : ''
									}`}
								>
									<BadgeIcon className='scale-75' />
									<span
										className={`${
											coin.score === 100 ? 'text-purple-100' : 'text-light-100'
										} `}
									>
										{coin.score ? (coin.score / 10).toFixed(1) : '0.0'}
									</span>
								</div>
								<div>{formatGraduationTime(coin.graduation)}</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
