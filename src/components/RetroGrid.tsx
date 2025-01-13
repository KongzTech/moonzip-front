export function RetroGrid({
	className,
	angle = 55,
	height = '240px',
	width = '100%',
}: {
	className?: string
	angle?: number
	height?: string | number
	width?: string | number
}) {
	return (
		<div
			className={`pointer-events-none -z-10 absolute overflow-hidden top-0 left-0 opacity-100 [perspective:600px] ${className}`}
			style={
				{
					'--grid-angle': `${angle}deg`,
					height,
					width,
				} as React.CSSProperties
			}
		>
			{/* Grid */}
			<div className='absolute -top-[280px] inset-0 [transform:rotateX(var(--grid-angle))] will-change-transform'>
				<div
					className='
            absolute
            animate-grid
            [background-size:40px_40px]
            [height:130%]
            [width:150%]
            [-left:50%]
            [-top:85%]
            [transform:translate3d(0,0,0)]
            will-change-transform
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_0)]
            dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_0)]
          '
				/>
			</div>

			{/* Fade overlay - thinned top gradient */}
			<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-color)_98%)] dark:[--bg-color:#111111] [--bg-color:#ffffff]'>
				<div className='absolute inset-0 bg-gradient-to-t from-light-100 from-5% via-light-100/30 via-30% to-light-100/90 to-100% dark:from-[#111111] dark:via-[#111111]/30 dark:to-[#111111]/90' />
			</div>
		</div>
	)
}
