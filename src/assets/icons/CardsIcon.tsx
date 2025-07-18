import { IconProps } from '@/types'

const CardsIcon = ({ className }: IconProps) => (
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
			d='m15.144 8.75-.725-2.543c-.3-1.048-1.446-1.67-2.562-1.39l-5.556 1.4c-1.116.28-1.778 1.358-1.48 2.406l1.76 6.17c.3 1.048 1.446 1.67 2.562 1.39l.607-.153m5.394-7.28H11.75a2 2 0 0 0-2 2v5.28m5.394-7.28h2.106a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-5.5a2 2 0 0 1-2-2v-1.22'
		/>
	</svg>
)
export default CardsIcon
