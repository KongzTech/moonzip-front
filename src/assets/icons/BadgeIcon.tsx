import { IconProps } from '@/types'

const BadgeIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		className={className}
	>
		<path
			fill='#C9C9C9'
			fillRule='evenodd'
			d='M9.333 4h5.334v1.778h3.555v3.555H20v5.334h-1.778v3.555h-3.555V20H9.333v-1.778H5.778v-3.555H4V9.333h1.778V5.778h3.555V4Zm.89 8.889v1.778H12v-1.778h1.778V11.11h1.778V9.333h-1.778v1.778H12v1.778h-1.778Zm0 0H8.443V11.11h1.778v1.778Z'
			clipRule='evenodd'
		/>
	</svg>
)
export default BadgeIcon
