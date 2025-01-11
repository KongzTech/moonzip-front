import LayoutCardsIcon from '@/assets/icons/LayoutCardsIcon'
import LayoutTableIcon from '@/assets/icons/LayoutTableIcon'
import { ViewMode, useFilterStore } from '@/store/filterStore'
import Tab from './Tab'

export default function LayoutTab() {
	const { viewMode, setViewMode } = useFilterStore()

	return (
		<div className='flex items-center gap-3'>
			<Tab
				active={viewMode === ViewMode.GRID}
				className='border-none'
				onClick={() => setViewMode(ViewMode.GRID)}
			>
				<LayoutCardsIcon />
			</Tab>
			<Tab
				active={viewMode === ViewMode.TABLE}
				className='border-none'
				onClick={() => setViewMode(ViewMode.TABLE)}
			>
				<LayoutTableIcon />
			</Tab>
		</div>
	)
}
