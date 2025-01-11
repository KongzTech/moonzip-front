export interface ButtonProps {
	children: React.ReactNode
	className?: string
	onClick?: () => void
}

export interface IconProps {
	className?: string
}

export interface NavItemProps {
	active: boolean
	children: React.ReactNode
}
