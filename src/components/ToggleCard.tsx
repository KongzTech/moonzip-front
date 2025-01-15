import Toggle from '@/components/Toggle'

interface ToggleCardProps {
	selected: boolean
	onClick: () => void
	children: React.ReactNode
}

const ToggleCard = ({ selected, onClick, children }: ToggleCardProps) => {
	return (
		<div
			className={`group w-full relative flex transition-all duration-300 items-start flex-col gap-3 p-5 bg-dark-800 rounded-[10px] border border-dark-700 `}
		>
			<Toggle
				className='absolute right-5 top-5'
				checked={selected}
				onChange={onClick}
			/>
			{children}
		</div>
	)
}

export default ToggleCard
