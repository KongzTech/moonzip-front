import { IconProps } from '@/types'

const PlayIcon = ({ className }: IconProps) => (
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
			d='M16.674 12.844a1 1 0 0 0 0-1.688L8.537 5.978A1 1 0 0 0 7 6.822v10.356a1 1 0 0 0 1.537.844l8.137-5.178Z'
		/>
	</svg>
)
export default PlayIcon
