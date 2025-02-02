import { IconProps } from '@/types'

const SellIcon = ({ className }: IconProps) => (
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
			d='M9.25 4.75h-.5a4 4 0 0 0-4 4v.5M9.25 19.25h-.5a4 4 0 0 1-4-4v-.5M14.75 4.75h.5a4 4 0 0 1 4 4v.5M14.75 19.25h.5a4 4 0 0 0 4-4v-.5M8.75 12h6.5'
		/>
	</svg>
)
export default SellIcon
