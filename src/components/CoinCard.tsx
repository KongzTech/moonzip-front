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

export default function CoinCard({ coin }: { coin: Coin }) {
	return (
		<div className='flex-1 h-[222px] p-6 bg-dark-800 rounded-[10px] border border-dark-700 flex-col text-light-100 justify-start items-start gap-6 inline-flex overflow-hidden'>
			<div className='self-stretch h-32 flex-col justify-start items-start gap-5 flex'>
				<div className='self-stretch justify-start items-center gap-4 inline-flex'>
					<img className='w-16 h-16 rounded-[10px]' src={coin.image} />

					<div className='flex-1 flex-col justify-start items-start gap-1 flex'>
						<div
							className={`self-stretch justify-start items-center gap-1 inline-flex ${
								coin.score === 100 ? 'icn-purple' : ''
							}`}
						>
							<div
								className={`grow shrink basis-0 text-light-100 text-sm font-semibold font-ibm-mono uppercase leading-snug `}
							>
								${coin.ticker}
							</div>
							<BadgeIcon
								className={`${coin.score === 100 ? 'icn-purple' : 'icn-white'}`}
							/>
							<div
								className={`${
									coin.score === 100 ? 'text-purple-100' : 'text-light-100'
								} text-sm font-semibold font-ibm-mono leading-snug`}
							>
								{coin.score ? (coin.score / 10).toFixed(1) : '0.0'}
							</div>
						</div>
						<div className='self-stretch text-light-0 text-xl font-bold font-barlow leading-snug'>
							{coin.name}
						</div>
					</div>
				</div>
				<div className='self-stretch text-light-100 text-sm font-medium font-ibm-sans leading-snug line-clamp-2'>
					{coin.description}
				</div>
			</div>
			<div className='self-stretch justify-start items-center gap-1.5 inline-flex'>
				<div className='grow shrink basis-0 text-light-100 text-sm font-semibold font-ibm-mono leading-snug'>
					MC: ${formatNumber(coin.mcap ?? 0)}
				</div>
				<div>
					<span
						className={`${
							coin.type === 'AMM' ? 'text-light-100' : 'text-light-100'
						} text-sm font-semibold font-ibm-mono leading-snug uppercase`}
					>
						{coin.type}
					</span>
					<span> • </span>
					<span
						className={`${getLockStatus(
							coin.lock
						)} text-sm font-semibold font-ibm-mono leading-snug uppercase`}
					>
						{coin.lock ? coin.lock.toString() + 'D ' : 'NO '}LOCK
					</span>
					<span> • </span>
					<span className='text-light-100 text-sm font-semibold font-ibm-mono leading-snug'>
						{coin.graduation &&
							(new Date(coin.graduation).getTime() - Date.now() > 60000
								? `${Math.floor(
										(new Date(coin.graduation).getTime() - Date.now()) / 60000
								  )}m`
								: `${Math.floor(
										(new Date(coin.graduation).getTime() - Date.now()) / 1000
								  )}s`)}
					</span>
				</div>
			</div>
		</div>
	)
}
