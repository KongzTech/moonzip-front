export default function HighlightSkeleton() {
	return (
		<div className='w-full flex flex-col items-center justify-center animate-pulse'>
			<div className='mt-[22px] lg:mt-8 w-full justify-between font-ibm-mono text-sm font-semibold items-start inline-flex'>
				<div className='text-purple-100 hidden lg:block w-48 h-[18px] bg-dark-700 rounded' />
				<div className='justify-start items-center gap-4 w-full lg:w-auto lg:gap-6 flex'>
					<div className='w-32 h-[18px] bg-dark-700 rounded' />
					<div className='w-24 h-[18px] bg-dark-700 rounded' />
					<div className='w-24 h-[18px] bg-dark-700 rounded ml-auto lg:ml-0' />
				</div>
			</div>
			<div className='px-0 lg:px-4 relative w-full mt-8 lg:mt-5 justify-start items-center lg:items-start gap-7 flex flex-col lg:flex-row'>
				<div className='justify-start items-center gap-2.5 flex'>
					<div className='w-[80px] h-[80px] lg:w-[104px] lg:h-[104px] rounded-[10px] bg-dark-700' />
				</div>

				<div className='self-stretch mt-2.5 lg:mt-0 flex-col lg:flex-row flex-1 lg:items-center items-center gap-4 flex'>
					<div className='grow shrink basis-0 flex-col justify-start items-center lg:items-start gap-2 inline-flex'>
						<div className='lg:hidden w-48 h-[18px] bg-dark-700 rounded' />
						<div className='w-64 h-[34px] bg-dark-700 rounded' />
						<div className='max-w-[320px] w-full h-[40px] bg-dark-700 rounded mt-1' />
					</div>
					<div className='lg:self-stretch justify-start mt-1 lg:mt-0 items-start lg:items-end gap-3 flex flex-row-reverse lg:flex-row'>
						<div className='justify-start absolute top-0 right-0 lg:relative items-center flex gap-0'>
							{[1, 2, 3].map(i => (
								<div
									key={i}
									className='w-[34px] h-[34px] rounded-[10px] bg-dark-700'
								/>
							))}
						</div>
						<div className='h-[42px] w-[120px] lg:h-[34px] lg:w-[90px] rounded-[10px] bg-dark-700' />
					</div>
				</div>
			</div>
		</div>
	)
}
