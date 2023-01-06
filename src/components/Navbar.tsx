import { useState } from 'react'

const Navbar: React.FC<{
	user: string
	currentStreak: number
	bestStreak: number
	setShowModal: Function
}> = ({ user, currentStreak, bestStreak, setShowModal }) => {
	const [showStreak, setShowStreak] = useState<boolean>(false)

	return (
		<div className='flex items-center justify-between w-full'>
			<a href='https://www.codewars.com/' target='_blank'>
				<img src='logo.svg' alt='logo' className='w-11' />
			</a>
			<div className='flex relative gap-4 items-center'>
				<span
					onMouseEnter={() => setShowStreak(true)}
					onMouseLeave={() => setShowStreak(false)}
					className='text-text cursor-default'
				>
					{user}
				</span>
				<button
					onClick={() => setShowModal(true)}
					className='text-primary border px-2 py-1/2 border-primary rounded-md hover:bg-primary hover:text-background'
				>
					Change
				</button>
				{showStreak && (
					<div className='absolute z-20 right-0 -bottom-28 px-10 py-4 rounded-xl bg-dark flex gap-10'>
						<div className='flex flex-col items-center'>
							<span className='text-text text-sm opacity-80'>current</span>
							<span className='text-3xl text-primary'>{currentStreak}</span>
						</div>
						<div className='flex flex-col items-center'>
							<span className='text-text text-sm opacity-80'>best</span>
							<span className='text-3xl text-primary'>{bestStreak}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
