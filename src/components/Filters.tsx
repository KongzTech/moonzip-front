import LockIcon from '@/assets/icons/LockIcon'
import { useEffect, useRef, useState } from 'react'
import CoinTabs from './CoinTabs'
import Dropdown from './Dropdown'
import LayoutTab from './LayoutTab'

const isMobile: boolean = window.innerWidth < 1440

export default function Filters() {
	const [isSticky, setIsSticky] = useState(false)
	const stickyRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (stickyRef.current) {
				const elementTop = stickyRef.current.getBoundingClientRect().top
				const shouldBeSticky = elementTop <= 71 // Accounting for header height
				console.log('Scroll position:', {
					elementTop,
					shouldBeSticky,
					currentlySticky: isSticky,
				})
				setIsSticky(shouldBeSticky)
			}
		}

		window.addEventListener('scroll', handleScroll)
		// Initial check
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [isSticky])

	return (
		<>
			<div
				ref={stickyRef}
				className={`sticky top-[59px] md:top-[71px] px-4 lg:px-8 z-20 bg-dark-900 bg-dark-800 border-b w-screen transition-shadow duration-200 ${
					isSticky
						? 'shadow-[0_4px_12px_rgba(0,0,0,0.3)]  border-dark-700'
						: 'border-dark-800'
				}`}
			>
				<div
					className={`relative max-w-[1440px] w-full lg:border-b ${
						isSticky ? 'border-dark-800' : 'border-dark-700'
					}`}
				>
					<div className=' flex flex-col -pb-[1px] lg:flex-row items-center pt-4 gap-4'>
						<CoinTabs />
						<div className='lg:ml-auto self-stretch lg:mt-0 flex items-center lg:gap-6 gap-4'>
							<Dropdown
								className='max-w-fit h-[38px] pb-[14px]'
								align={isMobile ? 'left' : 'right'}
								type='devLock'
							>
								<div className='flex items-center gap-1'>
									<LockIcon className='lg:block hidden' />
									<div className='text-light-100 hidden lg:block mr-2'>
										Dev Lock
									</div>
								</div>
							</Dropdown>
							<Dropdown
								className='mr-auto lg:mr-0 max-w-[180px] h-[38px] pb-[14px]'
								align={isMobile ? 'left' : 'right'}
								type='sort'
							/>
							<LayoutTab />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
