export default function HighlightSkeleton() {
	return (
		<div className='w-full flex flex-col items-center justify-center animate-pulse'>
			<div className='mt-8 w-full justify-between font-ibm-mono text-sm font-semibold items-start inline-flex'>
				<div className='hidden lg:block w-40 h-4 bg-dark-700 rounded' />
				<div className='justify-start items-center gap-4 w-full lg:w-auto lg:gap-6 flex'>
					<div className='w-28 h-4 bg-dark-700 rounded' />
					<div className='w-24 h-4 bg-dark-700 rounded' />
					<div className='w-24 h-4 bg-dark-700 rounded ml-auto lg:ml-0' />
				</div>
			</div>
			<div className='px-0 lg:px-4 relative w-full mt-8 lg:mt-5 justify-start items-start gap-7 flex flex-col lg:flex-row'>
				<div className='justify-start items-center gap-2.5 flex'>
					<div className='w-[80px] h-[80px] lg:w-[104px] lg:h-[104px] rounded-[10px] bg-dark-700' />
				</div>
				<div className='absolute lg:top-20 lg:left-12 max-w-fit right-0'>
					<div className='h-8 w-20 rounded-[31px] bg-dark-700' />
				</div>
				<div className='self-stretch flex-col lg:flex-row flex-1 justify-start lg:items-center items-start gap-5 flex'>
					<div className='grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex'>
						<div className='lg:hidden w-40 h-4 bg-dark-700 rounded' />
						<div className='w-48 h-8 bg-dark-700 rounded' />
						<div className='lg:w-[296px] w-full h-12 bg-dark-700 rounded' />
					</div>
					<div className='self-stretch justify-start mt-1 lg:mt-0 items-end gap-3 flex'>
						<div className='justify-start items-center flex order-2 lg:order-1 gap-2'>
							{[1, 2, 3].map(i => (
								<div
									key={i}
									className='w-[34px] h-[34px] rounded-[10px] bg-dark-700'
								/>
							))}
						</div>
						<div className='w-24 h-[34px] rounded-[10px] bg-dark-700 order-1 lg:order-2' />
					</div>
				</div>
			</div>
		</div>
	)
}
