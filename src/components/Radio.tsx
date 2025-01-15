interface RadioProps {
	checked: boolean
	className?: string
}

const Radio = ({ checked, className = '' }: RadioProps) => {
	return (
		<div
			className={`w-5 h-5 rounded-full transition-colors duration-200 ${
				checked
					? 'border-purple-100 border-4'
					: 'border border-dark-700 group-hover:border-dark-600/50'
			} ${className}`}
		></div>
	)
}

export default Radio
