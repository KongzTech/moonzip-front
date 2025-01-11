import { Coin } from '@/types/coin'
import { formatNumber } from '@/utils/formatNumber'

interface SearchItemProps {
	coin: Coin
	onClick: () => void
	isSelected: boolean
}

export default function SearchItem({
	coin,
	onClick,
	isSelected,
}: SearchItemProps) {
	return (
		<div
			className={`px-4 py-3 hover:bg-dark-700 rounded-lg mx-1 cursor-pointer transition-colors justify-between group flex items-center gap-3 flex-1
				${isSelected ? 'bg-dark-700' : ''}`}
			onClick={onClick}
		>
			{coin.image && (
				<img
					src={coin.image}
					alt={coin.name}
					className='w-6 h-6 rounded-full'
				/>
			)}
			<div className='flex gap-1 flex-1 min-w-0'>
				<div
					className={`text-light-100 text-sm font-ibm-mono leading-snug ${
						isSelected ? 'opacity-100' : 'opacity-60'
					} font-semibold transition-opacity`}
					font-semibold
					whitespace-nowrap
				>
					${coin.ticker}
				</div>
				<div
					className={`text-light-100 text-sm font-ibm-mono leading-snug ${
						isSelected ? 'opacity-100' : 'opacity-60'
					} font-semibold transition-opacity`}
					font-semibold
					whitespace-nowrap
				>
					•
				</div>
				<div className='text-light-100 flex-1 text-sm font-ibm-mono leading-snug uppercase font-semibold truncate'>
					{coin.name}
				</div>
			</div>
			<div
				className={`text-light-100 font-ibm-mono text-sm group-hover:opacity-100 ${
					isSelected ? 'opacity-100' : 'opacity-60'
				} font-semibold transition-opacity`}
			>
				${formatNumber(coin.mcap ?? 0)}
			</div>
		</div>
	)
}
