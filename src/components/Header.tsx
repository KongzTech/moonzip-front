import DiscoverIcon from '@/assets/icons/DiscoverIcon'
import LogoMzipIcon from '@/assets/icons/LogoMzipIcon'
import MenuIcon from '@/assets/icons/MenuIcon'
import RocketIcon from '@/assets/icons/RocketIcon'
import WalletIcon from '@/assets/icons/WalletIcon'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import NavItem from './NavItem'
import Search from './Search'

export default function Header() {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<div className='w-full h-[68px] px-4 md:px-8 py-4 border-b border-neutral-800 items-center justify-center flex'>
			<div className='flex items-center gap-4 w-full max-w-[1376px] justify-between'>
				<div className='justify-start items-center gap-6 flex'>
					<Link to='/' className='justify-start items-center gap-2 flex'>
						<LogoMzipIcon />
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
				<Button className='w-38'>
					<WalletIcon />
					<div className='md:block hidden'>Connect Wallet</div>
				</Button>
				<button className='md:hidden block icn-white-hover h-[38px] w-[38px]'>
					<MenuIcon />
				</button>
			</div>
		</div>
	)
}
