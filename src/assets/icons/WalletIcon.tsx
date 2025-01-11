import { IconProps } from '@/types'

const WalletIcon = ({ className }: IconProps) => (
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
			d='M19.25 8.25v9a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V6.75'
		/>
		<path
			stroke='#C9C9C9'
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z'
		/>
		<path
			stroke='#C9C9C9'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M17.25 8.25H6.5a1.75 1.75 0 1 1 0-3.5h8.75a2 2 0 0 1 2 2v1.5Zm0 0h2'
		/>
	</svg>
)
export default WalletIcon
