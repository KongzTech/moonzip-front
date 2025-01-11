import { IconProps } from '@/types'

const TelegramIcon = ({ className }: IconProps) => (
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
			d='M18.343 5.096a1.168 1.168 0 0 1 1.202.167c.168.135.297.314.374.518.077.204.1.425.065.64L18.18 17.64c-.175 1.082-1.334 1.702-2.303 1.163a46.249 46.249 0 0 1-3.097-1.87c-.541-.363-2.2-1.525-1.996-2.352.175-.707 2.962-3.363 4.554-4.942.625-.62.34-.979-.398-.408-1.833 1.417-4.775 3.572-5.748 4.179-.858.535-1.305.626-1.84.535-.976-.167-1.882-.424-2.62-.738-.999-.424-.95-1.83-.001-2.24l13.613-5.87Z'
			clipRule='evenodd'
		/>
	</svg>
)
export default TelegramIcon
