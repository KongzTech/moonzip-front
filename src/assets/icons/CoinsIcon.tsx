import { IconProps } from '@/types'

const CoinsIcon = ({ className }: IconProps) => (
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
			d='M8.75 9.25V6.5m10.5 0v4c0 .432-.47.828-1.25 1.133M19.25 6.5c0 .966-2.35 1.75-5.25 1.75S8.75 7.466 8.75 6.5m10.5 0c0-.966-2.35-1.75-5.25-1.75s-5.25.784-5.25 1.75M15.25 13.5v4c0 .966-2.35 1.75-5.25 1.75s-5.25-.784-5.25-1.75v-4m10.5 0c0 .966-2.35 1.75-5.25 1.75s-5.25-.784-5.25-1.75m10.5 0c0-.966-2.35-1.75-5.25-1.75s-5.25.784-5.25 1.75'
		/>
	</svg>
)
export default CoinsIcon
