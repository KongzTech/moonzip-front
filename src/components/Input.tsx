import React, { forwardRef } from 'react'

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
	className?: string
	prefix?: React.ReactNode
	multiline?: boolean
	rows?: number
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
	(
		{
			className = '',
			placeholder,
			prefix,
			multiline,
			rows = 3,
			type,
			...props
		},
		ref
	) => {
		const baseClassName = `px-3 w-full bg-dark-700 focus:bg-dark-800 rounded-[10px] 
        text-light-0 
          text-base font-medium font-ibm-mono leading-snug border 
          border-transparent
          focus:border-purple-100 focus:hover:border-purple-100 md:hover:border-dark-600/30 
          transition-opacity placeholder:text-light-100 placeholder:opacity-30
          [&::-webkit-inner-spin-button]:appearance-none
          [&::-webkit-outer-spin-button]:appearance-none
          [-moz-appearance:textfield]
          ${className}`

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (type === 'number') {
				// Allow: backspace, delete, tab, escape, enter, decimal point, minus sign at start
				const allowedKeys = [
					'Backspace',
					'Delete',
					'Tab',
					'Escape',
					'Enter',
					'.',
					'-',
					'ArrowLeft',
					'ArrowRight',
					'ArrowUp',
					'ArrowDown',
				]

				// Allow minus sign only at the start of input
				if (e.key === '-' && e.currentTarget.selectionStart !== 0) {
					e.preventDefault()
					return
				}

				// Allow decimal point only once
				if (e.key === '.' && e.currentTarget.value.includes('.')) {
					e.preventDefault()
					return
				}

				// Prevent if not a number and not in allowedKeys
				if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
					e.preventDefault()
				}
			}
		}

		if (multiline) {
			return (
				<textarea
					{...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
					ref={ref as React.RefObject<HTMLTextAreaElement>}
					rows={rows}
					className={`${baseClassName} p-3 ${className}`}
					placeholder={placeholder}
				/>
			)
		}

		return (
			<div className='relative w-full'>
				{prefix && (
					<span className='absolute left-3 top-3 text-light-100'>{prefix}</span>
				)}
				<input
					{...props}
					type={type}
					ref={ref as React.RefObject<HTMLInputElement>}
					className={`${baseClassName}  h-[38px] ${
						prefix ? 'pl-8' : ''
					} ${className}`}
					placeholder={placeholder}
					onKeyDown={handleKeyDown}
					onPaste={e => {
						if (type === 'number') {
							const pastedData = e.clipboardData.getData('text')
							if (!/^-?\d*\.?\d*$/.test(pastedData)) {
								e.preventDefault()
							}
						}
					}}
				/>
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
