import { IconProps } from '@/types'

const ChevronDownIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		className={className}
	>
		<path
			stroke='#868686'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M15.25 10.75 12 14.25l-3.25-3.5'
		/>
	</svg>
)
export default ChevronDownIcon
