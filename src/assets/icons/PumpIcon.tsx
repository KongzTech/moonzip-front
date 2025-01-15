import { IconProps } from '@/types'

const PumpIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		className={className}
	>
		<path
			fill='#C9C9C9'
			d='m3.841 11.256 7.415-7.415a6.303 6.303 0 0 1 8.904 0c2.453 2.454 2.453 6.44 0 8.904l-7.415 7.415c-2.465 2.453-6.45 2.453-8.904 0a6.303 6.303 0 0 1 0-8.904Zm1.49 1.489a4.174 4.174 0 0 0-1.091 4.048l6.282-6.271 4.446 4.446 3.702-3.712a4.175 4.175 0 0 0 0-5.926 4.174 4.174 0 0 0-5.925 0L5.33 12.745Z'
		/>
	</svg>
)
export default PumpIcon
