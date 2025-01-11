import Header from '@/components/Header'
import CoinDetails from '@/pages/CoinDetails'
import CreateCoin from '@/pages/CreateCoin'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// Import wallet styles
import '@solana/wallet-adapter-react-ui/styles.css'

export default function App() {
	const endpoint = 'https://api.mainnet-beta.solana.com'
	const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<Router>
						<Header />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/coin/:coinCA' element={<CoinDetails />} />
							<Route path='/create' element={<CreateCoin />} />
						</Routes>
					</Router>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}
