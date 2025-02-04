import { useEffect, useState } from 'react'

interface CircleTimerProps {
	duration: number
	size?: number
	strokeWidth?: number
	onComplete: () => void
	onClick: () => void
}

const CircleTimer = ({
	duration,
	size = 16,
	strokeWidth = 2,
	onComplete,
	onClick,
}: CircleTimerProps) => {
	const [progress, setProgress] = useState(0)
	const [key, setKey] = useState(0)

	useEffect(() => {
		const startTime = Date.now()
		const timer = setInterval(() => {
			const elapsedTime = Date.now() - startTime
			const newProgress = (elapsedTime / (duration * 1000)) * 100

			if (newProgress >= 100) {
				setProgress(0)
				setKey(prev => prev + 1)
				onComplete()
			} else {
				setProgress(newProgress)
			}
		}, 50)

		return () => clearInterval(timer)
	}, [duration, onComplete, key])

	const radius = (size - strokeWidth) / 2
	const circumference = radius * 2 * Math.PI
	const strokeDashoffset = (progress / 100) * circumference

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setProgress(0)
		setKey(prev => prev + 1)
		onClick()
	}

	return (
		<div
			className='cursor-pointer hover:opacity-80 transition-opacity'
			onClick={handleClick}
		>
			<svg width={size} height={size} className='transform -rotate-90'>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill='none'
					stroke='#262626'
					strokeWidth={strokeWidth}
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill='none'
					stroke='#C9C9C9'
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='round'
				/>
			</svg>
		</div>
	)
}

export default CircleTimer
