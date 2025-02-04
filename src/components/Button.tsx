import { ButtonProps } from '@/types/button'

export default function Button({
	children,
	className,
	onClick,
	disabled,
}: ButtonProps) {
	return (
		<button
			className={`max-w-full ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			<div
				className={`group max-w-full relative p-0.5 bg-gradient-to-b from-[#2B1853] to-[#391E73] rounded-[10px] shadow-[inset_0px_-3px_10.899999618530273px_0px_rgba(72,38,145,0.67)] border border-[#8769de] border-opacity-30 flex-col justify-start items-start gap-2.5 flex 
				${
					disabled
						? 'opacity-50 cursor-not-allowed'
						: 'active:scale-95 cursor-pointer animate-pulse-subtle'
				} 
				transition-all duration-200 ease-in-out overflow-hidden`}
			>
				{/* Only show hover effects if not disabled */}
				{!disabled && (
					<div className='absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300'>
						<div className='absolute inset-0 grid grid-cols-6 grid-rows-2 '>
							<div className='bg-white/60 rounded-[1px] animate-tile-1' />
							<div className='bg-white/60 rounded-[1px] animate-tile-2' />
							<div className='bg-white/60 rounded-[1px] animate-tile-3' />
							<div className='bg-white/60 rounded-[1px] animate-tile-4' />
							<div className='bg-white/60 rounded-[1px] animate-tile-5' />
							<div className='bg-white/60 rounded-[1px] animate-tile-1' />
							<div className='bg-white/60 rounded-[1px] animate-tile-2' />
							<div className='bg-white/60 rounded-[1px] animate-tile-3' />
							<div className='bg-white/60 rounded-[1px] animate-tile-1' />
							<div className='bg-white/60 rounded-[1px] animate-tile-2' />
							<div className='bg-white/60 rounded-[1px] animate-tile-4' />
							<div className='bg-white/60 rounded-[1px] animate-tile-5' />
						</div>
					</div>
				)}
				<div className='bg-gradient-to-b from-[#8769de]/30 to-[#8769de]/0 rounded-[8px] p-[1px] w-full'>
					<div
						className={`h-[30px] rounded-[7px] bg-gradient-to-b from-[#2B1853] to-[#3c2078] icn-white w-full text-sm gap-1 text-light-0 flex items-center justify-center font-ibm-mono uppercase font-semibold`}
					>
						{children}
					</div>
				</div>
			</div>
		</button>
	)
}
