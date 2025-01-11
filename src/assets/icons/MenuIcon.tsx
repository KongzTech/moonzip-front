import { IconProps } from '@/types'

const MenuIcon = ({ className }: IconProps) => (
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
			d='M4.75 5.75h14.5M4.75 18.25h14.5M4.75 12h14.5'
		/>
	</svg>
)
export default MenuIcon
