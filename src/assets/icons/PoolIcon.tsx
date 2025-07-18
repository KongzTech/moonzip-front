import { IconProps } from '@/types'

const PoolIcon = ({ className }: IconProps) => (
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
			d='M19.25 15.81c0 2.023-1.455 3.44-3.25 3.44s-3.25-1.417-3.25-3.44c0-2.024 3.25-5.06 3.25-5.06s3.25 3.036 3.25 5.06ZM11.25 9.81c0 2.023-1.455 3.44-3.25 3.44s-3.25-1.417-3.25-3.44C4.75 7.786 8 4.75 8 4.75s3.25 3.036 3.25 5.06Z'
		/>
	</svg>
)
export default PoolIcon
