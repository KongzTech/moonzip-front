export interface Trade {
	userAddress: string
	profilePicture: string
	type: 'BUY' | 'SELL'
	solAmount: number
	coinAmount: number
	timestamp: Date
	txHash: string
}

export interface SerializedTrade extends Omit<Trade, 'timestamp'> {
	timestamp: string
}
