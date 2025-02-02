import { IconProps } from '@/types'

const ExternalIcon = ({ className }: IconProps) => (
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
			d='M17.25 15.25v-8.5h-8.5M17 7 6.75 17.25'
		/>
	</svg>
)
export default ExternalIcon
