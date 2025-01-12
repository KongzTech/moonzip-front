import { create } from 'zustand'

export enum SortOption {
	MCAP_HIGH = 'MC: High to Low',
	MCAP_LOW = 'MC: Low to High',
	NEWEST = 'Newest First',
	OLDEST = 'Oldest First',
	FEATURED = 'Featured',
}

export enum CoinType {
	ALL = 'All',
	AMM = 'AMM',
	POOL = 'Pool',
}

export enum DevLockDuration {
	NONE = 'No Lock',
	ONE_DAY = '1 Day',
	SEVEN_DAYS = '7 Days',
	THIRTY_DAYS = '30 Days',
}

export enum ViewMode {
	GRID = 'Grid',
	TABLE = 'Table',
}

interface FilterState {
	sortBy: SortOption
	coinType: CoinType
	devLock: DevLockDuration
	viewMode: ViewMode

	isPaused: boolean
	setSortBy: (sort: SortOption) => void
	setCoinType: (type: CoinType) => void
	setDevLock: (duration: DevLockDuration) => void
	setViewMode: (mode: ViewMode) => void

	pause: () => void
	unpause: () => void
}

export const useFilterStore = create<FilterState>(set => ({
	sortBy: SortOption.FEATURED,
	coinType: CoinType.ALL,
	devLock: DevLockDuration.NONE,
	viewMode: ViewMode.GRID,
	isLive: true,
	isPaused: false,
	setSortBy: sort => set({ sortBy: sort }),
	setCoinType: type => set({ coinType: type }),
	setDevLock: duration => set({ devLock: duration }),
	setViewMode: mode => set({ viewMode: mode }),

	pause: () => set({ isPaused: true }),
	unpause: () => set({ isPaused: false }),
}))
