export function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(2) + 'M'
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K'
	}
	return num.toString()
}

export const formatNumberExact = (num: number | string, decimalPlaces = 4): string => {
	return Number(num).toFixed(decimalPlaces);
};