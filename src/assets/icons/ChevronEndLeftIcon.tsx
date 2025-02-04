import { IconProps } from '@/types'

const ChevronEndLeftIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		className={className}
	>
		<path
			stroke='#C9C9C9'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M16.5 8.75 13 12l3.5 3.25M8 7v10'
		/>
	</svg>
)
export default ChevronEndLeftIcon
