import { Trade } from '@/types/trade'

export const sampleTrades: Trade[] = [
	{
		userAddress: 'HJDFss',
		profilePicture: '/avatar1.png',
		type: 'BUY',
		solAmount: 0.12,
		coinAmount: 2.12,
		timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
		txHash: '0x1234567890abcdef',
	},
	{
		userAddress: '8FfAya',
		profilePicture: '/avatar2.png',
		type: 'SELL',
		solAmount: 82.83,
		coinAmount: 2.12,
		timestamp: new Date(Date.now() - 1 * 60 * 1000),
		txHash: '0x2234567890abcdef',
	},
	{
		userAddress: 'GZ7cxi',
		profilePicture: '/avatar3.png',
		type: 'BUY',
		solAmount: 0.12,
		coinAmount: 20000.12,
		timestamp: new Date(Date.now() - 1 * 60 * 1000),
		txHash: '0x3234567890abcdef',
	},
]
