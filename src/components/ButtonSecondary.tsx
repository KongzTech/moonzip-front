import { ButtonProps } from '@/types'

export default function ButtonSecondary({
	children,
	className,
	onClick,
}: ButtonProps) {
	return (
		<button onClick={onClick}>
			<div
				className='group relative bg-[#262626] rounded-[10px] flex w-full flex-col justify-start items-start
				active:scale-95 
				transition-all duration-200 ease-in-out 
				cursor-pointer
				overflow-hidden
					animate-pulse-subtle'
			>
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

				<div
					className={`self-stretch h-[38px] px-3 rounded-[7px] w-full flex  gap-1 items-center justify-center text-white text-sm font-ibm-mono uppercase font-semibold ${className}`}
				>
					{children}
				</div>
			</div>
		</button>
	)
}
