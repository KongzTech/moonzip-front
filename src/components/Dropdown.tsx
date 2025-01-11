import ChevronDownIcon from '@/assets/icons/ChevronDownIcon'
import {
	CoinType,
	DevLockDuration,
	SortOption,
	ViewMode,
	useFilterStore,
} from '@/store/filterStore'
import { ReactNode, useEffect, useRef, useState } from 'react'

type DropdownType = 'sort' | 'coinType' | 'devLock' | 'viewMode'

interface DropdownProps {
	type: DropdownType
	className?: string
	align?: 'left' | 'right'
	children?: ReactNode
}

export default function Dropdown({
	type,
	className = '',
	align = 'left',
	children,
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const {
		sortBy,
		coinType,
		devLock,
		viewMode,
		setSortBy,
		setCoinType,
		setDevLock,
		setViewMode,
	} = useFilterStore()

	const getOptions = (): string[] => {
		switch (type) {
			case 'sort':
				return Object.values(SortOption)
			case 'coinType':
				return Object.values(CoinType)
			case 'devLock':
				return Object.values(DevLockDuration)
			case 'viewMode':
				return Object.values(ViewMode)
			default:
				return []
		}
	}

	const getCurrentValue = () => {
		switch (type) {
			case 'sort':
				return sortBy
			case 'coinType':
				return coinType
			case 'devLock':
				return devLock
			case 'viewMode':
				return viewMode
			default:
				return ''
		}
	}

	const handleSelect = (option: string) => {
		switch (type) {
			case 'sort':
				setSortBy(option as SortOption)
				break
			case 'coinType':
				setCoinType(option as CoinType)
				break
			case 'devLock':
				setDevLock(option as DevLockDuration)
				break
			case 'viewMode':
				setViewMode(option as ViewMode)
				break
		}
		setIsOpen(false)
		setSelectedIndex(null)
	}

	const options = getOptions()

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isOpen && options.length > 0) {
				if (e.key === 'ArrowDown') {
					e.preventDefault()
					setSelectedIndex(prev =>
						prev === null ? 0 : (prev + 1) % options.length
					)
				}
				if (e.key === 'ArrowUp') {
					e.preventDefault()
					setSelectedIndex(prev => {
						if (prev === null) return options.length - 1
						return prev - 1 < 0 ? options.length - 1 : prev - 1
					})
				}
				if (e.key === 'Enter' && selectedIndex !== null) {
					e.preventDefault()
					handleSelect(options[selectedIndex])
				}
				if (e.key === 'Escape') {
					setIsOpen(false)
					setSelectedIndex(null)
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, options.length, selectedIndex])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				setSelectedIndex(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='text-light-0 hover:text-light-100 text-sm font-ibm-sans font-semibold flex items-center gap-1'
			>
				{children}
				{getCurrentValue()}
				<ChevronDownIcon
					className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{isOpen && (
				<div
					className={`absolute z-50 pt-2 ${
						align === 'right' ? 'right-0' : 'left-0'
					}`}
				>
					<div className='bg-dark-750 rounded-xl border border-neutral-800 shadow-lg overflow-y-auto animate-fade-in-down min-w-full whitespace-nowrap'>
						<div className='py-1'>
							{options.map((option, index) => (
								<div
									key={option}
									className={`px-4 py-3 hover:bg-dark-700 rounded-lg mx-1 cursor-pointer transition-colors
                    ${index === selectedIndex ? 'bg-dark-700' : ''}`}
									onClick={() => handleSelect(option)}
								>
									<div
										className={`text-light-100 text-sm font-ibm-mono leading-snug ${
											index === selectedIndex ? 'opacity-100' : 'opacity-60'
										} transition-opacity`}
									>
										{option}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
