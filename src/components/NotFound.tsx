import Button from '@/components/Button'
import { RetroGrid } from '@/components/RetroGrid'
import { useNavigate } from 'react-router-dom'

interface NotFoundProps {
	title?: string
	message?: string
}

const NotFound = ({
	title = 'Coin Not Found',
	message = "The coin CA you're looking for doesn't exist.",
}: NotFoundProps) => {
	const navigate = useNavigate()

	return (
		<div className='flex relative flex-col items-center justify-center min-h-[60vh] px-4'>
			<div
				className='text-6xl font-semibold font-ibm-mono text-red-100 mb-4
				animate-pulse
				[text-shadow:0_0_7px_#ff6b6b,0_0_12px_#ff6b6b]'
			>
				404
			</div>
			<h1 className='text-2xl font-bold uppercase font-ibm-mono text-light-100 mb-2'>
				{title}
			</h1>
			<p className='text-light-100 opacity-80 font-ibm-mono text-center font-semibold mb-8'>
				{message}
			</p>
			<Button onClick={() => navigate('/')}>
				<div className='px-4'>Back to Home</div>
			</Button>
			<RetroGrid className='mt-[280px]' />
		</div>
	)
}

export default NotFound
