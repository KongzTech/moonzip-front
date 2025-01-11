import { NavItemProps } from '@/types'

export default function NavItem({ active, children }: NavItemProps) {
	return (
		<div
			className={`${
				active
					? 'text-purple-100 icn-purple'
					: 'text-light-100 icn-white-hover hover:text-light-0 '
			}  flex gap-1 font-semibold items-center justify-center rounded-md uppercase text-sm font-ibm-mono leading-snug cursor-pointer active:opacity-80 transition-colors`}
		>
			{children}
		</div>
	)
}
