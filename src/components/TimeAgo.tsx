import { formatTimeAgo } from '@/utils/formatTime'
import { useEffect, useState } from 'react'

interface TimeAgoProps {
	timestamp: string
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
	const [timeString, setTimeString] = useState(() =>
		formatTimeAgo(new Date(timestamp).getTime())
	)

	useEffect(() => {
		const getUpdateInterval = () => {
			const timeDiff = Date.now() - new Date(timestamp).getTime()
			if (timeDiff < 60000) return 1000 // < 1 minute: update every second
			if (timeDiff < 3600000) return 60000 // < 1 hour: update every minute
			return 300000 // >= 1 hour: update every 5 minutes
		}

		const updateTime = () => {
			const newTimeString = formatTimeAgo(new Date(timestamp).getTime())
			if (newTimeString !== timeString) {
				setTimeString(newTimeString)
			}
		}

		const interval = setInterval(updateTime, getUpdateInterval())
		return () => clearInterval(interval)
	}, [timestamp, timeString])

	return <span>{timeString}</span>
}

export default TimeAgo
