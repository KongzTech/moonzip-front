import React from 'react'

interface TabProps {
	active: boolean
	children: React.ReactNode
	onClick: () => void
	className?: string
}

export default function Tab({
	active,
	children,
	onClick,
	className,
}: TabProps) {
	return (
		<div
			className={`border-b pb-[14px] gap-1 z-10 flex cursor-pointer text-sm justify-center items-center font-semibold  font-ibm-sans ${
				active
					? 'border-purple-100 text-light-0 icn-purple'
					: 'border-transparent icn-white-hover text-light-100 hover:text-light-0'
			} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
