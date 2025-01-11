import { IconProps } from '@/types'

const RocketIcon = ({ className }: IconProps) => (
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
			d='M13.456 6.855a8 8 0 0 1 5.408-2.105h.386v.386a8 8 0 0 1-2.105 5.408l-6.15 6.704-4.243-4.243 6.704-6.15ZM7.25 16.75l-2.5 2.5M9.25 18.75l-.5.5M5.25 14.75l-.5.5M13 19.25 14.24 14 11 17.25l2 2ZM6.75 13 10 9.75l-5.25 1 2 2.25Z'
		/>
	</svg>
)
export default RocketIcon
