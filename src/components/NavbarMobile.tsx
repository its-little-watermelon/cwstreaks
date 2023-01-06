const NavbarMobile: React.FC<{
	user: string
	currentStreak: number
	bestStreak: number
	setShowModal: Function
	isFetching: boolean
}> = ({ user, currentStreak, bestStreak, setShowModal, isFetching }) => {
	return (
		<div className='flex flex-col gap-6 items-center justify-between w-full'>
			<div className='flex justify-between w-full'>
				<a href='https://www.codewars.com/' target='_blank'>
					<img src='logo.svg' alt='logo' className='w-8' />
				</a>
				<div className='flex gap-4 items-center'>
					<span className='text-text cursor-default'>{user}</span>
					<button
						onClick={() => setShowModal(true)}
						className='text-primary border px-2 py-1/2 border-primary rounded-md hover:bg-primary hover:text-background'
					>
						Change
					</button>
				</div>
			</div>
			{!isFetching && (
				<div className='px-10 py-4 rounded-xl bg-dark flex gap-10'>
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
	)
}

export default NavbarMobile
