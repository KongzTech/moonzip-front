import { IconProps } from '@/types'

const PFPPlaceholderIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={48}
		height={48}
		fill='none'
		className={className}
	>
		<g clipPath='url(#a)'>
			<rect width={48} height={48} fill='url(#b)' rx={24} />
			<path
				fill='#606060'
				fillRule='evenodd'
				d='M32.37 46.5A23.95 23.95 0 0 1 24 48a23.889 23.889 0 0 1-13.5-4.154V43.5H12V42h1.5v-3H15v-1.5h1.5v-3H15V33h-1.5v-1.5H12v-15h1.5V15H15v-1.5h16.5V15h3v24H33v1.5h-4.5v3H30V45h1.5v1.5h.87Z'
				clipRule='evenodd'
			/>
		</g>
		<defs>
			<linearGradient
				id='b'
				x1={24}
				x2={24}
				y1={0}
				y2={48}
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#262626' />
				<stop offset={1} stopColor='#242424' />
			</linearGradient>
			<clipPath id='a'>
				<path fill='#fff' d='M0 0h48v48H0z' />
			</clipPath>
		</defs>
	</svg>
)
export default PFPPlaceholderIcon
