import { IconProps } from '@/types'

const LockIcon = ({ className }: IconProps) => (
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
			d='M5.75 11.75a1 1 0 0 1 1-1h10.5a1 1 0 0 1 1 1v5.5a2 2 0 0 1-2 2h-8.5a2 2 0 0 1-2-2v-5.5ZM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.625 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157'
		/>
	</svg>
)
export default LockIcon
