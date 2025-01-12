import { IconProps } from '@/types'

const ChevronRightIcon = ({ className }: IconProps) => (
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
			d='m10.75 8.75 3.5 3.25-3.5 3.25'
		/>
	</svg>
)
export default ChevronRightIcon
