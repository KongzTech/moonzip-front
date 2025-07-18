import { IconProps } from '@/types'

const WebsiteIcon = ({ className }: IconProps) => (
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
			d='M19.25 12a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z'
		/>
		<path
			stroke='#C9C9C9'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M15.25 12c0 4.5-2.007 7.25-3.25 7.25-1.243 0-3.25-2.75-3.25-7.25S10.757 4.75 12 4.75c1.243 0 3.25 2.75 3.25 7.25ZM5 12h14'
		/>
	</svg>
)
export default WebsiteIcon
