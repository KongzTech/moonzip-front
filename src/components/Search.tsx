import ArchiveIcon from '@/assets/icons/ArchiveIcon'
import { sampleCoins } from '@/data/sampleCoins'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useRef, useState } from 'react'
import Input from './Input'
import SearchItem from './SearchItem'
export default function Search() {
	const [isOpen, setIsOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const debouncedSetSearch = useCallback(
		debounce((value: string) => {
			setDebouncedSearch(value)
		}, 300),
		[]
	)

	const filteredCoins = debouncedSearch
		? sampleCoins
				.filter(
					coin =>
						coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
						coin.ticker.toLowerCase().includes(debouncedSearch.toLowerCase())
				)
				.slice(0, 5)
		: sampleCoins.slice(0, 5)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault()
				setIsOpen(true)
				setSelectedIndex(null)
				setTimeout(() => {
					inputRef.current?.focus()
					inputRef.current?.select()
				}, 0)
			}
			if (e.key === 'Escape') {
				setIsOpen(false)
				setSearch('')
				setSelectedIndex(null)
				inputRef.current?.blur()
			}
			if (isOpen && filteredCoins.length > 0) {
				if (e.key === 'ArrowDown') {
					e.preventDefault()
					setSelectedIndex(prev =>
						prev === null ? 0 : (prev + 1) % filteredCoins.length
					)
				}
				if (e.key === 'ArrowUp') {
					e.preventDefault()
					setSelectedIndex(prev => {
						if (prev === null) return filteredCoins.length - 1
						return prev - 1 < 0 ? filteredCoins.length - 1 : prev - 1
					})
				}
				// Select with enter
				if (e.key === 'Enter' && selectedIndex !== null) {
					e.preventDefault()
					handleCoinSelect()
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, filteredCoins.length, selectedIndex])

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

	const handleCoinSelect = () => {
		if (selectedIndex !== null && filteredCoins[selectedIndex]) {
			console.log('Selected:', filteredCoins[selectedIndex])
			setIsOpen(false)
			setSearch('')
			setSelectedIndex(null)
		}
	}
	const isMobile: boolean = window.innerWidth < 768

	return (
		<div className='md:relative flex-1 md:max-w-[400px]' ref={dropdownRef}>
			<div className=''>
				<Input
					ref={inputRef}
					value={search}
					onChange={e => {
						setSearch(e.target.value)
						debouncedSetSearch(e.target.value)
						setIsOpen(true)
						setSelectedIndex(null)
					}}
					onFocus={() => setIsOpen(true)}
					placeholder={isMobile ? 'Search...' : 'Search for coins'}
					className='w-full'
				/>
				{!isOpen && (
					<div className='absolute right-3 top-1/2 -translate-y-1/2 text-light-100 text-base md:block hidden opacity-30'>
						⌘K
					</div>
				)}
			</div>

			{isOpen && (
				<div className='absolute z-50 bg-dark-800 w-full pt-[10px] px-2 md:pt-2 md:px-0 left-0'>
					<div className='bg-dark-750 rounded-xl border border-neutral-800 shadow-lg max-h-[400px] overflow-y-auto animate-fade-in-down'>
						{filteredCoins.length > 0 ? (
							<div className='py-1'>
								<div className='flex px-4 pt-3 pb-2 justify-between items-center'>
									<div className='text-light-100  uppercase text-sm font-ibm-mono leading-snug opacity-60 font-semibold'>
										Coin name
									</div>
									<div className='text-light-100 uppercase text-sm font-ibm-mono leading-snug opacity-60 font-semibold'>
										MCAP
									</div>
								</div>
								{filteredCoins.map((coin, index) => (
									<SearchItem
										key={coin.ticker}
										coin={coin}
										onClick={handleCoinSelect}
										isSelected={index === selectedIndex}
									/>
								))}
							</div>
						) : (
							<div className='px-4 py-3 text-light-100 opacity-60 font-ibm-mono text-sm flex items-center justify-center flex-col my-3 uppercase font-semibold gap-2'>
								<ArchiveIcon className='' />
								No coins found
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
