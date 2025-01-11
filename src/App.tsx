import Header from '@/components/Header'
import CoinDetails from '@/pages/CoinDetails'
import CreateCoin from '@/pages/CreateCoin'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/coin/:coinCA' element={<CoinDetails />} />
				<Route path='/create' element={<CreateCoin />} />
			</Routes>
		</Router>
	)
}

export default App
