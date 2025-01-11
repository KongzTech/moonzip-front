import { useSearchParams } from 'react-router-dom'

const CreateCoin = () => {
	const [searchParams] = useSearchParams()

	const params: {
		name: string | null
		ticker: string | null
		desc: string | null
		launch: string | null
		devbuy: number | null
		lock: number | null
	} = {
		name: searchParams.get('name'),
		ticker: searchParams.get('ticker'),
		desc: searchParams.get('description'),
		launch: searchParams.get('type'),
		devbuy: searchParams.get('sol')
			? parseFloat(searchParams.get('sol')!)
			: null,
		lock: searchParams.get('lock')
			? parseFloat(searchParams.get('lock')!)
			: null,
	}

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Create Coin</h1>
			<div className='mt-4'>
				<p>Name: {params.name}</p>
				<p>Ticker: {params.ticker}</p>
				<p>Description: {params.desc}</p>
				<p>Launch Type: {params.launch}</p>
				<p>Dev Buy: {params.devbuy} SOL</p>
				<p>Lock Period: {params.lock}</p>
			</div>
		</div>
	)
}

export default CreateCoin
