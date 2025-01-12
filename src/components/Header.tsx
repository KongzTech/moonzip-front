import DiscoverIcon from '@/assets/icons/DiscoverIcon'
import ExitIcon from '@/assets/icons/ExitIcon'
import LogoMzipIcon from '@/assets/icons/LogoMzipIcon'
import MenuIcon from '@/assets/icons/MenuIcon'
import ProfileIcon from '@/assets/icons/ProfileIcon'
import RocketIcon from '@/assets/icons/RocketIcon'
import WalletIcon from '@/assets/icons/WalletIcon'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import ButtonSecondary from './ButtonSecondary'
import MobileMenu from './MobileMenu'
import NavItem from './NavItem'
import Search from './Search'

export default function Header() {
	const { setVisible } = useWalletModal()
	const { publicKey, disconnect } = useWallet()
	const { connection } = useConnection()
	const [balance, setBalance] = useState<number>(0)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const location = useLocation()
	const currentPath = location.pathname
	const [isWalletOpen, setIsWalletOpen] = useState(false)
	const walletDropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const getBalance = async () => {
			if (!publicKey) return
			try {
				const balance = await connection.getBalance(publicKey)
				setBalance(balance / LAMPORTS_PER_SOL)
			} catch (e) {
				console.error('Error fetching balance:', e)
			}
		}

		getBalance()
		const intervalId = setInterval(getBalance, 1000)

		return () => clearInterval(intervalId)
	}, [publicKey, connection])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				walletDropdownRef.current &&
				!walletDropdownRef.current.contains(event.target as Node)
			) {
				setIsWalletOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className='w-full sticky md:static top-0 px-4 md:px-8 py-2.5 md:py-4 border-b border-neutral-800 bg-dark-800 z-20 items-center justify-center flex'>
			<div className='flex items-center gap-2 md:gap-4 w-full max-w-[1376px] justify-between'>
				<div className='justify-start items-center gap-6 flex'>
					<Link to='/' className='justify-start items-center gap-2 flex'>
						<LogoMzipIcon className='mr-2 md:mr-0' />
						<div className='px-1 py-0.5 bg-dark-600 rounded md:block hidden text-dark-800 text-xs font-bold font-ibm-mono uppercase'>
							beta
						</div>
					</Link>
					<Link to='/' className='md:block hidden'>
						<NavItem active={currentPath === '/'}>
							<DiscoverIcon />
							EXPLORE
						</NavItem>
					</Link>
					<Link to='/create' className='md:block hidden'>
						<NavItem active={currentPath === '/create'}>
							<RocketIcon />
							LAUNCH NEW COIN
						</NavItem>
					</Link>
				</div>
				<Search />
				{publicKey ? (
					<div className='relative' ref={walletDropdownRef}>
						<ButtonSecondary
							className='md:w-auto'
							onClick={() => setIsWalletOpen(!isWalletOpen)}
						>
							<WalletIcon className='md:block hidden' />
							<div>{balance.toFixed(2)} SOL</div>
						</ButtonSecondary>

						{isWalletOpen && (
							<div className='absolute right-0 z-50 pt-2'>
								<div className='bg-dark-750 rounded-xl border border-neutral-800 shadow-lg overflow-hidden animate-fade-in-down min-w-[200px] whitespace-nowrap'>
									<div className='py-1'>
										<Link
											to='/profile'
											className='text-light-100 mx-1 hover:bg-dark-700 rounded-lg flex cursor-pointer items-center gap-1 text-sm font-ibm-mono font-semibold uppercase px-3 py-[7px] transition-opacity'
											onClick={() => setIsWalletOpen(false)}
										>
											<ProfileIcon />
											Your Profile
										</Link>

										<div
											className='text-red-100 mx-1 hover:bg-dark-700 rounded-lg flex cursor-pointer items-center gap-1 text-sm font-ibm-mono uppercase font-semibold px-3 py-[7px] transition-opacity'
											onClick={() => {
												disconnect()
												setIsWalletOpen(false)
											}}
										>
											<ExitIcon className='icn-red' />
											Disconnect
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				) : (
					<Button
						className='w-[30px] !px-0 md:!px-3 md:w-auto'
						onClick={() => setVisible(true)}
					>
						<WalletIcon />
						<div className='md:block hidden'>Connect Wallet</div>
					</Button>
				)}
				<button
					className='md:hidden block icn-white-hover h-[38px] pl-1'
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<MenuIcon />
				</button>
			</div>

			{isMobileMenuOpen && (
				<MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
			)}
		</div>
	)
}
