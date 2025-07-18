import BadgeIcon from '@/assets/icons/BadgeIcon'
import TelegramIcon from '@/assets/icons/Telegram'
import TimerIcon from '@/assets/icons/TimerIcon'
import TwitterIcon from '@/assets/icons/TwitterIcon'
import WebsiteIcon from '@/assets/icons/WebsiteIcon'
import coinGlow from '@/assets/images/coin-glow.png'
import ButtonSecondary from '@/components/ButtonSecondary'
import { sampleCoins } from '@/data/sampleCoins'
import { Coin } from '@/types/coin'
import { formatNumber } from '@/utils/formatNumber'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RetroGrid } from './RetroGrid'
const coin: Coin = sampleCoins[0]

type SocialLink = {
	icon: React.FC<{ className?: string }>
	url: string
}

const socialLinks: SocialLink[] = [
	coin.website && { icon: WebsiteIcon, url: coin.website },
	coin.telegram && { icon: TelegramIcon, url: coin.telegram },
	coin.twitter && { icon: TwitterIcon, url: coin.twitter },
].filter(Boolean) as SocialLink[]

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

console.log(coin)

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

const isMobile: boolean = window.innerWidth < 768

export default function Highlight() {
	const [timeLeft, setTimeLeft] = useState<number>(0)

	useEffect(() => {
		const timer = setInterval(() => {
			const now = Date.now()
			const target = coin.graduation?.getTime() ?? now
			setTimeLeft(Math.floor((target - now) / 1000))
		}, 1000)

		return () => clearInterval(timer)
	}, [coin.graduation])
	const navigate = useNavigate()

	return (
		<div className='w-full flex flex-col items-center relative pb-2 lg:pb-6 justify-center'>
			<RetroGrid className='' />
			<div className='mt-5 lg:mt-8 w-full justify-between font-ibm-mono text-sm font-semibold items-start inline-flex'>
				<div className='text-purple-100 hidden lg:block'>
					HIGHLIGHT • ${coin.ticker}
				</div>
				<div className='justify-start items-center gap-4 w-full lg:w-auto lg:gap-6 flex'>
					<div>
						<span className='text-green-100'>POOL</span>
						<span className='text-light-100'>{' • '}</span>
						<span className={`${getLockStatus(coin.lock)}  `}>
							{coin.lock + 'D ' + (isMobile ? 'LOCK' : 'DEV LOCK')}
						</span>
					</div>
					<div className='text-light-100'>
						{isMobile ? '' : 'MCAP: '} ${formatNumber(coin.mcap ?? 0)}
					</div>
					<div className='justify-start items-center gap-1 ml-auto lg:ml-0 flex icn-white'>
						<TimerIcon className='hidden lg:block' />
						<div className='text-white'>
							{isMobile ? '' : 'ENDS IN'} {formatTime(timeLeft)}
						</div>
					</div>
				</div>
			</div>
			<div className='px-0 lg:px-4 relative w-full mt-8 lg:mt-5 justify-start items-center lg:items-start gap-7 flex flex-col lg:flex-row'>
				<img
					className='absolute hidden lg:block w-[160px] h-[160px] -z-10 -left-[12px] -top-[28px]'
					src={coinGlow}
				/>
				<div className=' justify-start items-center gap-2.5 flex'>
					<img
						className='w-[80px] h-[80px] lg:w-[104px] lg:h-[104px] rounded-[10px]'
						draggable='false'
						src={coin.image}
					/>
				</div>
				<div className='absolute top-16 lg:top-20 lg:left-12 max-w-fit right-1/2 translate-x-1/2 lg:right-0 lg:translate-x-0 flex bg-gradient-to-b from-[#8769de]/30 to-[#8769de]/0 p-[1px] rounded-[32px]'>
					<div className='h-8 px-2.5 py-1 bg-gradient-to-b from-[#28174d] to-[#351c69] rounded-[31px] icn-white justify-start items-center gap-1 inline-flex'>
						<BadgeIcon />
						<div className='text-white text-sm font-bold font-ibm-mono leading-snug'>
							{((coin.score ?? 0) / 10).toFixed(1)}
						</div>
					</div>
				</div>
				<div className='self-stretch mt-2 lg:mt-0 flex-col lg:flex-row flex-1 lg:items-center items-center  gap-4 flex'>
					<div className='grow shrink basis-0 flex-col justify-start items-center lg:items-start gap-2 inline-flex'>
						<div className='text-purple-100 font-ibm-mono lg:hidden text-sm font-semibold'>
							HIGHLIGHT • ${coin.ticker}
						</div>
						<h1 className='text-light-0 text-[26px] lg:text-[28px] font-bold font-barlow leading-9 truncate flex-nowrap'>
							{coin.name}
						</h1>
						<p className='max-w-[320px] w-full text-light-100 text-sm font-medium font-ibm-sans text-center lg:text-left mt-1 leading-snug line-clamp-2'>
							{coin.description}
						</p>
					</div>
					<div className='lg:self-stretch justify-start mt-1 lg:mt-0 items-start lg:items-end gap-3 flex flex-row-reverse lg:flex-row'>
						<div className='justify-start absolute top-0 right-0 lg:relative items-center flex'>
							{socialLinks.map((link, index) => (
								<a
									key={index}
									href={link.url}
									target='_blank'
									rel='noopener noreferrer'
									className='w-[34px] h-[34px] p-[5px] rounded-[10px] justify-center items-center gap-2.5 flex icn-white-hover'
								>
									<link.icon />
								</a>
							))}
						</div>
						<ButtonSecondary
							className='h-[42px] px-6 lg:h-[34px] lg:px-3'
							onClick={() => navigate(`/coin/${coin.ca}`)}
						>
							Trade Now
						</ButtonSecondary>
					</div>
				</div>
			</div>
		</div>
	)
}
