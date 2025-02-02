import AmmIcon from '@/assets/icons/AmmIcon'
import BadgeIcon from '@/assets/icons/BadgeIcon'
import CloseIcon from '@/assets/icons/CloseIcon'
import CoinsIcon from '@/assets/icons/CoinsIcon'
import LockIcon from '@/assets/icons/LockIcon'
import MzipIcon from '@/assets/icons/MzipIcon'
import PoolIcon from '@/assets/icons/PoolIcon'
import PumpIcon from '@/assets/icons/PumpIcon'
import TelegramIcon from '@/assets/icons/Telegram'
import TimerIcon from '@/assets/icons/TimerIcon'
import TwitterIcon from '@/assets/icons/TwitterIcon'
import WebsiteIcon from '@/assets/icons/WebsiteIcon'
import Button from '@/components/Button'
import ButtonSecondary from '@/components/ButtonSecondary'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import LockPeriodSelector from '@/components/LockPeriodSelector'
import RadioCard from '@/components/RadioCard'
import ToggleCard from '@/components/ToggleCard'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const CreateCoin = () => {
	const [image, setImage] = useState<File | null>(null)

	// Initialize form data from localStorage
	const [formData, setFormData] = useState(() => {
		const savedData = localStorage.getItem('createCoinForm')
		return savedData
			? JSON.parse(savedData)
			: {
					name: '',
					ticker: '',
					description: '',
					website: '',
					telegram: '',
					twitter: '',
					launchPeriod: '30 Min',
					launchType: 'pool',
					devBuyAmount: '0.78',
					lockPeriod: '1',
					isLockEnabled: false,
					isDevBuyEnabled: false,
					graduateTo: 'moon',
			  }
	})

	// Save to localStorage whenever form data changes
	useEffect(() => {
		localStorage.setItem('createCoinForm', JSON.stringify(formData))
	}, [formData])

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles[0]) {
			setImage(acceptedFiles[0])
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
		},
		maxFiles: 1,
	})

	const updateParams = (updates: Partial<typeof formData>) => {
		setFormData((prevData: typeof formData) => ({
			...prevData,
			...updates,
		}))
	}

	return (
		<div className='mx-auto mt-8 px-4 lg:px-8 w-full max-w-[1440px]'>
			<div className=' flex flex-col md:flex-row gap-8 font-ibm-mono font-semibold text-sm'>
				{/* Left Column */}
				<div className='flex flex-col gap-6 w-full md:max-w-[340px]'>
					<h1 className='text-2xl font-bold mb-2 text-light-0 font-barlow'>
						NEW COIN
					</h1>

					{/* Graduate To Section */}
					<div>
						<h2 className='text-sm text-light-100 uppercase mb-2'>
							Graduate to
						</h2>
						<div className='flex gap-3 icn-white'>
							<RadioCard
								selected={formData.graduateTo === 'moon'}
								onClick={() => updateParams({ graduateTo: 'moon' })}
							>
								<MzipIcon className='' />
								<div className='text-light-0 font-bold font-barlow text-base flex-1'>
									Moon.zip
								</div>
							</RadioCard>

							<RadioCard
								selected={formData.graduateTo === 'pump'}
								onClick={() => updateParams({ graduateTo: 'pump' })}
							>
								<PumpIcon className='' />
								<div className='text-light-0 font-bold font-barlow text-base flex-1'>
									Pump.fun
								</div>
							</RadioCard>
						</div>
					</div>

					{/* Launch Period */}
					<div className='flex w-full gap-1 border-b border-dark-700 pb-4 items-center'>
						<h2 className='text-sm text-light-100 uppercase flex-1'>
							Launch Period
						</h2>
						<TimerIcon />
						<Dropdown
							type='launchPeriod'
							align='right'
							value={formData.launchPeriod}
							onChange={value => updateParams({ launchPeriod: value })}
						></Dropdown>
					</div>

					{/* Launch Strategy */}
					<div className=' flex flex-col gap-3'>
						<h2 className='text-sm text-light-100 uppercase'>
							Launch Strategy
						</h2>
						<div className='bg-dark-700 rounded-[10px] flex flex-col'>
							<RadioCard
								selected={formData.launchType === 'pool'}
								onClick={() => updateParams({ launchType: 'pool' })}
							>
								<div className='flex w-full items-center icn-blue flex-1 gap-1'>
									<PoolIcon className='text-light-100' />
									<div className='text-light-0 font-bold font-barlow text-base flex-1'>
										Pool
									</div>
								</div>
								<div className='text-light-100 font-ibm-sans font-medium text-sm'>
									Everyone has an equal price on graduation. The best way to
									fight bots and snipers.
								</div>
							</RadioCard>
							<div className='flex gap-1 px-5 py-3 items-center icn-purple'>
								<p className='font-ibm-sans flex-1 font-medium text-light-100 text-sm'>
									Rating buff
								</p>
								<p className=' text-purple-100 text-sm'>+2.5</p>
								<BadgeIcon />
							</div>
						</div>

						<RadioCard
							selected={formData.launchType === 'amm'}
							onClick={() => updateParams({ launchType: 'amm' })}
						>
							<div className='flex w-full items-center icn-yellow flex-1 gap-1'>
								<AmmIcon className='text-light-100' />
								<div className='text-light-0 font-bold font-barlow text-base flex-1'>
									AMM
								</div>
							</div>
							<div className='text-light-100 font-ibm-sans font-medium text-sm'>
								Default curve behavior. Early buys get a competitive advantage
								over the later ones
							</div>
						</RadioCard>
					</div>

					{/* Dev Buy Section */}
					<div className='flex flex-col gap-3'>
						<h2 className='text-sm text-light-100 uppercase'>Dev Buy</h2>
						<ToggleCard
							selected={formData.isDevBuyEnabled}
							onClick={() =>
								updateParams({ isDevBuyEnabled: !formData.isDevBuyEnabled })
							}
						>
							<div className='flex w-full items-center icn-red flex-1 gap-1'>
								<CoinsIcon />
								<div className='text-light-0 font-bold font-barlow text-base flex-1'>
									Dev Buy
								</div>
							</div>
							<div className='text-light-100 font-ibm-sans font-medium text-sm '>
								Be the first to buy your new shiny token. Transparency is the
								key.
							</div>
							{formData.isDevBuyEnabled && (
								<>
									<label className='text-light-100 mt-1 font-ibm-mono uppercase font-semibold text-sm'>
										Dev buy amount
									</label>
									<div className='relative w-full'>
										<Input
											type='number'
											min='0'
											max='2'
											step='0.01'
											value={formData.devBuyAmount}
											onChange={e =>
												updateParams({
													devBuyAmount: Math.min(
														Number(e.target.value),
														2
													).toString(),
												})
											}
										/>
										<div className='absolute right-3 top-1/2 -translate-y-1/2 text-light-100 text-base opacity-30'>
											SOL
										</div>
									</div>

									<div className='relative w-full'>
										<input
											type='range'
											min='0'
											max='2'
											step='0.01'
											value={formData.devBuyAmount}
											onChange={e =>
												updateParams({ devBuyAmount: e.target.value })
											}
											className='w-full pointer-events-none appearance-none bg-dark-700 h-1 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none'
											style={{
												background: `linear-gradient(to right, #BBA1EE 0%, #BBA1EE ${
													(Number(formData.devBuyAmount) / 2) * 100
												}%, #262626 ${
													(Number(formData.devBuyAmount) / 2) * 100
												}%, #262626 100%)`,
											}}
										/>
										<div className='absolute inset-0' />
									</div>
									<div className='flex self-stretch justify-between text-light-100 font-ibm-sans font-semibold text-sm'>
										<span>Max dev buy</span>
										<span> 0.5% / 2%</span>
									</div>
								</>
							)}
						</ToggleCard>
						<div className='bg-dark-700 rounded-[10px] flex flex-col'>
							<ToggleCard
								selected={formData.isLockEnabled}
								onClick={() =>
									updateParams({ isLockEnabled: !formData.isLockEnabled })
								}
							>
								<div className='flex w-full items-center icn-green flex-1 gap-1'>
									<LockIcon />
									<div className='text-light-0 font-bold font-barlow text-base flex-1'>
										Coins Lock
									</div>
								</div>
								<div className='text-light-100 font-ibm-sans font-medium text-sm '>
									We highly suggest to lock the dev coins. This ensures a stable
									and healthy coin growth.
								</div>
								{formData.isLockEnabled && (
									<LockPeriodSelector
										value={formData.lockPeriod}
										onChange={period => updateParams({ lockPeriod: period })}
									/>
								)}
							</ToggleCard>
							<div className='flex gap-1 px-5 py-3 items-center icn-purple'>
								<p className='font-ibm-sans flex-1 font-medium text-light-100 text-sm'>
									Rating buff
								</p>
								<p className=' text-purple-100 text-sm'>+1.5-4.0</p>
								<BadgeIcon />
							</div>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div
					className='space-y-6 py-8 lg:mt-[92px] border-dark-800 border lg:border-dark-700 rounded-xl flex-1 
        flex flex-col justify-start items-center'
				>
					<div className='w-full flex flex-col gap-5 lg:max-w-[340px]'>
						<h2 className='font-bold font-barlow text-xl text-light-0'>
							Coin Details
						</h2>

						{/* Image Upload */}
						<div className=''>
							<div
								{...getRootProps({
									onClick: e => e.stopPropagation(),
								})}
								className={`relative h-[120px] rounded-xl p-5 flex flex-col items-center justify-center text-center ${
									image
										? 'bg-dark-700'
										: `border-2 border-dashed border-dark-700 ${
												isDragActive
													? 'border-light-0 bg-dark-800'
													: 'hover:border-light-600'
										  }`
								}`}
							>
								<input {...getInputProps()} />
								{image ? (
									<div className='flex items-center gap-4 relative w-full'>
										<button
											onClick={e => {
												e.stopPropagation()
												setImage(null)
											}}
											className='absolute right-0 top-0 flex items-center gap-1 text-light-100'
										>
											<CloseIcon />
										</button>
										<img
											src={URL.createObjectURL(image)}
											alt='Preview'
											className='w-16 h-16 object-cover rounded-lg'
										/>
										<div className='text-light-0 text-start flex uppercase flex-col gap-2'>
											<p className='text-sm text-light-100'>Selected:</p>
											{image.name.length > 20
												? `${image.name.slice(0, 16)}...${image.name.slice(
														image.name.lastIndexOf('.')
												  )}`
												: image.name}
										</div>
									</div>
								) : (
									<>
										<div className='text-light-100 mb-4'>
											{isDragActive
												? 'Drop the files here ...'
												: 'Drag and drop an image or video'}
										</div>
										{!isDragActive && (
											<ButtonSecondary
												onClick={() => {
													const input = document.createElement('input')
													input.type = 'file'
													input.accept = 'image/*'
													input.onchange = e => {
														const file = (e.target as HTMLInputElement)
															.files?.[0]
														if (file) setImage(file)
													}
													input.click()
												}}
											>
												Upload File
											</ButtonSecondary>
										)}
									</>
								)}
							</div>
						</div>

						{/* Form Fields */}
						<div className='space-y-4'>
							<div>
								<label className='block text-sm text-light-100 uppercase mb-2'>
									Coin Name
								</label>
								<Input
									type='text'
									value={formData.name}
									onChange={e => updateParams({ name: e.target.value })}
									placeholder='Coin Name...'
								/>
							</div>

							<div>
								<label className='block text-sm text-light-100  !uppercase mb-2'>
									Ticker
								</label>
								<Input
									type='text'
									value={formData.ticker}
									onChange={e => updateParams({ ticker: e.target.value })}
									placeholder='Ticker...'
									prefix='$'
								/>
							</div>

							<div>
								<label className='block text-sm text-light-100 uppercase mb-2'>
									Description
								</label>
								<Input
									multiline
									value={formData.description}
									onChange={e => updateParams({ description: e.target.value })}
									placeholder='Description...'
									rows={4}
								/>
							</div>

							{/* Input Fields First */}
							{formData.website && (
								<div>
									<label className='block text-sm text-light-100 uppercase mb-2'>
										Website
									</label>
									<Input
										type='text'
										value={formData.website}
										onChange={e => updateParams({ website: e.target.value })}
										placeholder='https://...'
									/>
								</div>
							)}
							{formData.telegram && (
								<div>
									<label className='block text-sm text-light-100 uppercase mb-2'>
										Telegram
									</label>
									<Input
										type='text'
										value={formData.telegram}
										onChange={e => updateParams({ telegram: e.target.value })}
										placeholder='https://t.me/...'
									/>
								</div>
							)}
							{formData.twitter && (
								<div>
									<label className='block text-sm text-light-100 uppercase mb-2'>
										Twitter
									</label>
									<Input
										type='text'
										value={formData.twitter}
										onChange={e => updateParams({ twitter: e.target.value })}
										placeholder='https://twitter.com/...'
									/>
								</div>
							)}

							{/* Add Buttons Below */}
							<div className='flex flex-wrap gap-2'>
								{!formData.website && (
									<ButtonSecondary
										onClick={() => updateParams({ website: ' ' })}
									>
										<WebsiteIcon />
										ADD WEBSITE
									</ButtonSecondary>
								)}
								{!formData.telegram && (
									<ButtonSecondary
										onClick={() => updateParams({ telegram: ' ' })}
									>
										<TelegramIcon />
										ADD TELEGRAM
									</ButtonSecondary>
								)}
								{!formData.twitter && (
									<ButtonSecondary
										onClick={() => updateParams({ twitter: ' ' })}
									>
										<TwitterIcon />
										ADD TWITTER
									</ButtonSecondary>
								)}
							</div>

							<Button className='w-full'>CREATE COIN</Button>

							{/* Moon Score */}
							<div className='p-4 bg-dark-800 rounded-xl border border-dark-700'>
								<div className='flex justify-between items-center mb-2'>
									<span className='text-light-100'>Coin's moon score</span>
									<span className='text-purple-500'>10.0</span>
								</div>
								<div className='text-light-100 text-sm'>
									We value transparency. Coins with a high moon score get better
									exposure on moon.zip
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateCoin
