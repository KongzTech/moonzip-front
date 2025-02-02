import { IconProps } from '@/types'

const VerticalDotsIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		className={className}
	>
		<path
			stroke='#C9C9C9'
			d='M12.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM12.5 12a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM12.5 16a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z'
		/>
	</svg>
)
export default VerticalDotsIcon
