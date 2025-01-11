export default function CoinCardSkeleton() {
	return (
		<div className='min-w-[300px] flex-1 h-[222px] p-6 bg-dark-800 rounded-[10px] border border-dark-700 flex-col text-light-100 justify-start items-start gap-6 inline-flex overflow-hidden animate-pulse'>
			<div className='self-stretch h-32 flex-col justify-start items-start gap-5 flex'>
				<div className='self-stretch justify-start items-center gap-4 inline-flex'>
					<div className='w-16 h-16 rounded-[10px] bg-dark-700' />
					<div className='flex-1 flex-col justify-start items-start gap-1 flex'>
						<div className='self-stretch justify-start items-center gap-1 inline-flex'>
							<div className='w-24 h-4 bg-dark-700 rounded' />
							<div className='w-8 h-4 bg-dark-700 rounded ml-auto' />
						</div>
						<div className='w-32 h-6 bg-dark-700 rounded mt-1' />
					</div>
				</div>
				<div className='w-full h-10 bg-dark-700 rounded' />
			</div>
			<div className='self-stretch justify-between items-center gap-1.5 inline-flex'>
				<div className='w-24 h-4 bg-dark-700 rounded' />
				<div className='w-40 h-4 bg-dark-700 rounded' />
			</div>
		</div>
	)
}
