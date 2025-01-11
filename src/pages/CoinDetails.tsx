import { useParams } from 'react-router-dom'

const CoinDetails = () => {
	const { coinCA } = useParams()

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Coin Details</h1>
			<p>Contract Address: {coinCA}</p>
		</div>
	)
}

export default CoinDetails
