import { Trade } from '@/types/trade'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const generateSingleTrade = (): Trade => {
	return {
		userAddress: `User${Math.floor(Math.random() * 1000)}`,
		profilePicture:
			'https://api.dicebear.com/7.x/pixel-art/svg?seed=' + Math.random(),
		type: Math.random() > 0.5 ? 'BUY' : 'SELL',
		solAmount: +(Math.random() * 10).toFixed(2),
		coinAmount: +(Math.random() * 1000000).toFixed(0),
		timestamp: new Date(),
		txHash: `${Math.random().toString(36).substring(2, 15)}${Math.random()
			.toString(36)
			.substring(2, 15)}`,
	}
}

interface TradesState {
	trades: Trade[]
	currentPage: number
	totalPages: number
	loading: boolean
	error?: string
	minSolValue: string
}

const initialState: TradesState = {
	trades: [],
	currentPage: 1,
	totalPages: 1,
	loading: false,
	minSolValue: 'Any',
}

export const fetchTradesForPage = createAsyncThunk(
	'trades/fetchTradesForPage',
	async ({ page, minSolValue }: { page: number; minSolValue: string }) => {
		const response = await fetch(
			`/api/trades?page=${page}&minSolValue=${minSolValue}`
		)
		const data = await response.json()

		return {
			trades: data.trades.map((trade: Trade) => ({
				...trade,
				timestamp: new Date(trade.timestamp).toISOString(),
			})),
			totalPages: data.totalPages,
			page,
		}
	}
)

const tradesSlice = createSlice({
	name: 'trades',
	initialState,
	reducers: {
		setMinSolValue: (state, action: PayloadAction<string>) => {
			state.minSolValue = action.payload
		},
		addSampleData: state => {
			const newTrade = generateSingleTrade()
			// Add new trade at the beginning and keep only 10 trades
			state.trades = [newTrade, ...state.trades.slice(0, 9)]
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTradesForPage.pending, state => {
			state.loading = true
		})
		builder.addCase(
			fetchTradesForPage.fulfilled,
			(
				state,
				action: PayloadAction<{
					trades: Trade[]
					totalPages: number
					page: number
				}>
			) => {
				state.loading = false
				// Ensure we always have exactly 10 trades
				state.trades = action.payload.trades.slice(0, 10)
				state.currentPage = action.payload.page
				state.totalPages = action.payload.totalPages
			}
		)
		builder.addCase(fetchTradesForPage.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
	},
})

export const { setMinSolValue, addSampleData } = tradesSlice.actions
export default tradesSlice.reducer
