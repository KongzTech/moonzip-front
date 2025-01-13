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
	explicitlyPaused: boolean
	setSortBy: (sort: SortOption) => void
	setCoinType: (type: CoinType) => void
	setDevLock: (duration: DevLockDuration) => void
	setViewMode: (mode: ViewMode) => void
	filtersShown: boolean
	showFilters: () => void
	hideFilters: () => void
	pause: () => void
	unpause: () => void
	explicitlyPause: () => void
	explicitlyUnpause: () => void
}

export const useFilterStore = create<FilterState>(set => ({
	sortBy: SortOption.FEATURED,
	coinType: CoinType.ALL,
	devLock: DevLockDuration.NONE,
	viewMode: ViewMode.GRID,
	isLive: true,
	filtersShown: true,
	isPaused: false,
	explicitlyPaused: false,
	setSortBy: sort => set({ sortBy: sort }),
	setCoinType: type => set({ coinType: type }),
	setDevLock: duration => set({ devLock: duration }),
	setViewMode: mode => set({ viewMode: mode }),

	pause: () => set({ isPaused: true }),
	unpause: () => set({ isPaused: false }),
	explicitlyPause: () => set({ isPaused: true, explicitlyPaused: true }),
	explicitlyUnpause: () => set({ isPaused: false, explicitlyPaused: false }),
	showFilters: () => set({ filtersShown: true }),
	hideFilters: () => set({ filtersShown: false }),
}))
