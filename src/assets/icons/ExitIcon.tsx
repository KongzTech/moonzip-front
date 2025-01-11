import { IconProps } from '@/types'

const ExitIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		className={className}
	>
		<path
			stroke='#EEA1B9'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='m5.75 4.75 7.5 3.071V19.25l-7.5-3.071V4.75Zm0 0 11.506.066a1 1 0 0 1 .994 1V16.25a1 1 0 0 1-1 1h-4'
		/>
	</svg>
)
export default ExitIcon
