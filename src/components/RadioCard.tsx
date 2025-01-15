import Radio from '@/components/Radio'

interface RadioCardProps {
	selected: boolean
	onClick: () => void
	children: React.ReactNode
}

const RadioCard = ({ selected, onClick, children }: RadioCardProps) => {
	return (
		<div
			className={`group w-full relative flex transition-all duration-300 items-start flex-col gap-3 p-5 bg-dark-800 rounded-[10px] border ${
				selected
					? 'border-purple-100'
					: 'border-dark-700 cursor-pointer hover:bg-dark-750 hover:opacity-80 hover:scale-[0.995] active:scale-[0.975] hover:border-dark-600/50'
			}`}
			onClick={onClick}
		>
			<Radio className='absolute right-5 top-5' checked={selected} />
			{children}
		</div>
	)
}

export default RadioCard
