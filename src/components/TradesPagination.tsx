import ChevronEndLeftIcon from '@/assets/icons/ChevronEndLeftIcon'
import ChevronEndRightIcon from '@/assets/icons/ChevronEndRightIcon'
import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon'

interface TradesPaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const TradesPagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: TradesPaginationProps) => {
	return (
		<div className='flex font-ibm-mono font-semibold items-center justify-center space-x-2 mt-4'>
			<button
				className='px-2 py-1 bg-dark-700 uppercase text-light-100 rounded-[10px] disabled:opacity-50'
				disabled={currentPage === 1}
				onClick={() => onPageChange(1)}
			>
				<ChevronEndLeftIcon />
			</button>
			<button
				className='px-2 py-1 bg-dark-700 uppercase text-light-100 rounded-[10px] disabled:opacity-50'
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				<ChevronLeftIcon />
			</button>
			<span className='text-light-100 px-3'>
				{currentPage} / {totalPages}
			</span>
			<button
				className='px-2 py-1 bg-dark-700 uppercase text-light-100 rounded-[10px] disabled:opacity-50'
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				<ChevronRightIcon />
			</button>
			<button
				className='px-2 py-1 bg-dark-700 uppercase text-light-100 rounded-[10px] disabled:opacity-50'
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(totalPages)}
			>
				<ChevronEndRightIcon />
			</button>
		</div>
	)
}

export default TradesPagination
