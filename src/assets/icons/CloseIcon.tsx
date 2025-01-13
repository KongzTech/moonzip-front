import { IconProps } from '@/types'

const CloseIcon = ({ className }: IconProps) => (
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
			d='m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5'
		/>
	</svg>
)
export default CloseIcon
