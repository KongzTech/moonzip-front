import { IconProps } from '@/types'

const Separator = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={64}
		height={16}
		fill='none'
		className={className}
	>
		<g fill='#868686' clipPath='url(#a)'>
			<path
				fillRule='evenodd'
				d='M4.221 4.541a5 5 0 0 1-2.474 8.422c-.407.088-.557.662-.162.796a6 6 0 1 0 0-11.364c-.395.133-.245.707.162.795.907.196 1.77.646 2.474 1.351Z'
				clipRule='evenodd'
				opacity={0.6}
			/>
			<path
				d='M31.437 1.597a.6.6 0 0 1 1.126 0l1.502 4.06a.6.6 0 0 0 .355.355l4.06 1.502a.6.6 0 0 1 0 1.125l-4.06 1.503a.6.6 0 0 0-.355.354l-1.502 4.06a.6.6 0 0 1-1.126 0l-1.502-4.06a.6.6 0 0 0-.354-.354l-4.06-1.503a.6.6 0 0 1 0-1.125l4.06-1.502a.6.6 0 0 0 .354-.355l1.502-4.06Z'
				opacity={0.6}
			/>
			<path
				fillRule='evenodd'
				d='M59.779 4.541a5 5 0 0 0 2.474 8.422c.407.088.557.662.162.796a6 6 0 1 1 0-11.364c.395.133.245.707-.162.795a4.976 4.976 0 0 0-2.474 1.351Z'
				clipRule='evenodd'
				opacity={0.6}
			/>
		</g>
		<defs>
			<clipPath id='a'>
				<path fill='#fff' d='M0 0h64v16H0z' />
			</clipPath>
		</defs>
	</svg>
)
export default Separator
