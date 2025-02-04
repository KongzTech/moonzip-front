import Header from '@/components/Header'
import ModalManager from '@/components/modals/ModalManager'
import CoinDetails from '@/pages/CoinDetails'
import CreateCoin from '@/pages/CreateCoin'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import { store } from '@/store'
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// Import wallet styles
import '@solana/wallet-adapter-react-ui/styles.css'

export default function App() {
	const endpoint =
		'https://solana-mainnet.rpc.extrnode.com/5eafc778-9601-4a48-bf59-311e97ea4f6e'
	const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

	return (
		<Provider store={store}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>
						<Router>
							<ModalManager />
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
		</Provider>
	)
}
