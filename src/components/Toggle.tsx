interface ToggleProps {
	checked: boolean
	onChange: (checked: boolean) => void
	className?: string
}

const Toggle = ({ checked, onChange, className = '' }: ToggleProps) => {
	return (
		<label className={`inline-flex items-center cursor-pointer ${className}`}>
			<div
				className={`relative w-[34px] h-[22px] rounded-full transition-colors duration-200 ${
					checked ? 'bg-purple-100' : 'bg-dark-700'
				}`}
				onClick={() => onChange(!checked)}
			>
				<div
					className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full transition-transform duration-200 ${
						checked ? 'bg-dark-800' : 'bg-light-100'
					}`}
					style={{
						transform: checked ? 'translateX(12px)' : 'translateX(0)',
					}}
				/>
			</div>
		</label>
	)
}

export default Toggle
