import { IconProps } from '@/types'

const ChevronEndRightIcon = ({ className }: IconProps) => (
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
			d='M7.5 8.75 11 12l-3.5 3.25M16 7v10'
		/>
	</svg>
)
export default ChevronEndRightIcon
