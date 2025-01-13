export function RetroGrid({
	className,
	angle = 55,
	height = '320px',
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
			<div className='absolute -top-[200px] inset-0 [transform:rotateX(var(--grid-angle))]'>
				<div
					className='
            absolute
            animate-grid
            [background-size:40px_40px]
            [height:130%]
            [width:150%]
            [-left:50%]
            [-top:90%]
            [transform:perspective(1000px)]
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_0)]
            dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_0)]
          '
				/>
			</div>

			{/* Fade overlay - added stronger fade at top */}
			<div className='absolute inset-0 bg-gradient-to-t from-light-100 via-light-100/60 to-light-100/90 dark:from-[#111111] dark:via-[#111111]/60 dark:to-[#111111]/90' />
		</div>
	)
}
