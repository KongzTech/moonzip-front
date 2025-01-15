import DiscoverIcon from '@/assets/icons/DiscoverIcon'
import RocketIcon from '@/assets/icons/RocketIcon'
import { useModalStore } from '@/store/modalStore'
import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
interface MobileMenuProps {
	setIsMobileMenuOpen: (isOpen: boolean) => void
}

export default function MobileMenu({ setIsMobileMenuOpen }: MobileMenuProps) {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const location = useLocation()
	const currentPath = location.pathname
	const { openModal } = useModalStore()
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsMobileMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div
			ref={dropdownRef}
			className='md:hidden absolute top-[52px] left-0 w-full bg-dark-800 border-b border-neutral-800 animate-fade-in-down z-50'
		>
			<div className='flex flex-col p-4 gap-2'>
				<Link
					to='/'
					className={`flex  flex-col items-start uppercase gap-1 p-3 rounded-lg ${
						currentPath === '/'
							? 'bg-dark-700 icn-purple text-light-0'
							: 'border border-dark-700 text-light-100'
					}`}
					onClick={() => setIsMobileMenuOpen(false)}
				>
					<DiscoverIcon />
					<span className=' font-ibm-mono font-semibold'>EXPLORE</span>
				</Link>
				<Link
					to='/create'
					className={`flex flex-col items-start gap-1 p-3 rounded-lg ${
						currentPath === '/create'
							? 'bg-dark-700 icn-purple text-light-0'
							: 'border border-dark-700 text-light-100'
					}`}
					onClick={() => setIsMobileMenuOpen(false)}
				>
					<RocketIcon />
					<span className='font-ibm-mono font-semibold'>LAUNCH NEW COIN</span>
				</Link>
				<button
					onClick={() => openModal('profile')}
					className='text-light-100 text-sm font-ibm-mono font-semibold'
				>
					SIGN IN
				</button>
			</div>
		</div>
	)
}
