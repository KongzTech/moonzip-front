interface LockPeriodSelectorProps {
	value: string
	onChange: (period: string) => void
}

const LockPeriodSelector = ({ value, onChange }: LockPeriodSelectorProps) => {
	return (
		<div className='grid grid-cols-3 mt-1 w-full gap-2'>
			{['1', '7', '30'].map(days => (
				<button
					key={days}
					onClick={() => onChange(days)}
					className={`p-2 rounded-[10px] ${
						value === days
							? 'bg-purple-100 text-dark-800'
							: 'bg-dark-700 text-light-100'
					}`}
				>
					{days === '1' ? '1 day' : days === '7' ? '1 week' : '30 days'}
				</button>
			))}
		</div>
	)
}

export default LockPeriodSelector
