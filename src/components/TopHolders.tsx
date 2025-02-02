import { Holder } from '@/types/holder'
import { AnimatePresence, motion } from 'framer-motion'

interface TopHoldersProps {
	holders: Holder[]
}

const TopHolders = ({ holders }: TopHoldersProps) => {
	return (
		<div className='flex flex-col rounded-[10px] overflow-hidden border border-dark-700 bg-dark-700'>
			<table className='w-full border-collapse bg-dark-700'>
				<tbody className='flex flex-col gap-[1px]'>
					<AnimatePresence>
						{holders.map((holder, index) => (
							<motion.tr
								key={index}
								initial={{ backgroundColor: 'rgb(147, 51, 234)', opacity: 0.7 }}
								animate={{ backgroundColor: 'rgb(17, 17, 17)', opacity: 1 }}
								whileHover={{
									backgroundColor: 'rgb(26, 26, 26)',
									opacity: 0.8,
								}}
								transition={{ duration: 0.3 }}
								className='bg-dark-800 text-sm font-ibm-sans font-medium text-light-100 flex w-full'
							>
								<td className='px-4 py-3 w-[200px]'>
									<div className='flex items-center gap-2'>
										{!holder.isDev && (
											<span className='text-light-300'>#{index + 1}</span>
										)}
										<span className='text-light-100'>{holder.address}</span>
										{holder.isDev && (
											<span className='bg-purple-100 text-dark-800 text-xs px-2 py-0.5 rounded font-semibold'>
												DEV
											</span>
										)}
									</div>
								</td>
								<td className='px-4 py-3 flex-1 text-right'>
									<span className='text-green-100'>
										{holder.percentage.toFixed(2)}%
									</span>
								</td>
							</motion.tr>
						))}
					</AnimatePresence>
				</tbody>
			</table>
		</div>
	)
}

export default TopHolders
