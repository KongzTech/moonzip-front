import { IconProps } from '@/types'

const PauseIcon = ({ className }: IconProps) => (
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
			d='M15.25 6.75v10.5M8.75 6.75v10.5'
		/>
	</svg>
)
export default PauseIcon
