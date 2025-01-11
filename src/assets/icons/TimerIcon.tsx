import { IconProps } from '@/types'

const TimerIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		className={className}
	>
		<path
			stroke='#fff'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M18.25 13a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0ZM16.5 8.5l.75-.75M12 6.5V4.75m0 0H9.75m2.25 0h2.25M12 9.75v3.5'
		/>
	</svg>
)
export default TimerIcon
