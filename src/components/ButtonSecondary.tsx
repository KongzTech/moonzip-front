import { ButtonProps } from '@/types'

export default function ButtonSecondary({
	children,
	className,
	onClick,
}: ButtonProps) {
	return (
		<button
			className={`max-w-full rounded-[10px] bg-[#262626] ${className}`}
			onClick={onClick}
		>
			<div className='group max-w-full self-stretch relative rounded-[10px] bg-dark-700 p-0 flex-col justify-start items-start gap-2.5 flex active:scale-95 transition-all duration-200 ease-in-out cursor-pointer overflow-hidden animate-pulse-subtle'>
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
					className={` rounded-[10px]  icn-white w-full text-sm gap-1 text-light-0 flex items-center justify-center font-ibm-mono uppercase font-semibold`}
				>
					{children}
				</div>
			</div>
		</button>
	)
}
