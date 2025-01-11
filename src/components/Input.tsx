import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className = '', placeholder, ...props }, ref) => {
		return (
			<input
				{...props}
				ref={ref}
				className={`px-3 h-[38px] bg-dark-700 focus:bg-dark-800 rounded-[10px] text-light-0 
					text-base font-medium font-ibm-mono leading-snug border border-transparent
					focus:border-purple-100 hover:border-dark-600/30 transition-opacity placeholder:text-light-100 placeholder:opacity-30 ${className}`}
				placeholder={placeholder}
			/>
		)
	}
)

// Add display name
Input.displayName = 'Input'

// Export the component
export default Input
