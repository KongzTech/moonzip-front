export function formatGraduation(graduationDate: Date | undefined): string {
	if (!graduationDate) return ''

	const timeLeft = graduationDate.getTime() - Date.now()

	if (timeLeft < 0) return 'Grad'

	return timeLeft > 60000
		? `${Math.floor(timeLeft / 60000)}m`
		: `${Math.floor(timeLeft / 1000)}s`
}
