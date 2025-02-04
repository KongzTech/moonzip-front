const TradesSkeleton = () => {
	return (
		<div className='animate-pulse flex flex-col rounded-[10px] overflow-hidden border border-dark-700 bg-dark-700'>
			<table className='w-full border-collapse bg-dark-700'>
				<tbody className='flex flex-col gap-[1px]'>
					{[...Array(10)].map((_, index) => (
						<tr
							key={index}
							className='bg-dark-800 text-sm font-ibm-sans font-medium text-light-100 flex w-full'
						>
							<td className='px-4 py-3 w-[120px]'>
								<div className='flex flex-col md:flex-row md:items-center md:gap-2'>
									<div className='flex items-center gap-2'>
										<div className='w-6 h-6 bg-dark-600 rounded-full' />
										<div className='h-4 bg-dark-600 rounded w-16' />
									</div>
									<div className='md:hidden h-4 bg-dark-600 rounded w-20 mt-1' />
								</div>
							</td>
							<td className='px-4 hidden md:flex items-center py-3 w-[80px]'>
								<div className='h-4 bg-dark-600 rounded w-12' />
							</td>
							<td className='px-4 py-3 flex flex-1 md:flex-none flex-col md:flex-row md:w-[120px]'>
								<div className='flex flex-1 justify-between items-center'>
									<div className='h-4 bg-dark-600 rounded w-24' />
									<div className='h-4 w-4 bg-dark-600 rounded md:hidden' />
								</div>
								<div className='block md:hidden h-4 bg-dark-600 rounded w-32 mt-1' />
							</td>
							<td className='px-4 hidden md:flex items-center md:flex-1 py-3'>
								<div className='h-4 bg-dark-600 rounded w-32' />
							</td>
							<td className='pr-4 md:px-4 py-3 hidden md:flex items-center'>
								<div className='flex items-center gap-2'>
									<div className='h-4 bg-dark-600 rounded w-24' />
									<div className='h-4 w-4 bg-dark-600 rounded' />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TradesSkeleton
