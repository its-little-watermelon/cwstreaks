import { useState } from 'react'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import NavbarMobile from './components/NavbarMobile'
import { useMobile } from './hooks/useMobile'
import {
	getBestStreak,
	getCurrentStreak,
	getDates,
	removeDuplicates,
} from './utils/functions'
import { isChallenge } from './utils/interfaces'

function App() {
	const [completedDates, setCompletedDates] = useState<string[]>([])
	const [allDates, setAllDates] = useState<string[]>([])
	const [user, setUser] = useState<string>('')
	const [showModal, setShowModal] = useState<boolean>(true)
	const [isFetching, setIsFetching] = useState<boolean>(true)
	const [currentStreak, setCurrentStreak] = useState<number>(0)
	const [bestStreak, setBestStreak] = useState<number>(0)

	const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

	const fetchData = async (user: string, numOfPages: number) => {
		setIsFetching(true)
		let arr: string[] = []
		for (let page = 0; page < numOfPages; page++) {
			const URL = `https://www.codewars.com/api/v1/users/${user}/code-challenges/completed?page=${page}`
			await fetch(URL).then((res) => {
				res.json().then((data: any) => {
					const dates = data.data.map((challenge: isChallenge) =>
						challenge.completedAt.slice(0, 10)
					)
					arr = [...arr, ...dates]
					if (page + 1 === numOfPages) {
						arr = removeDuplicates(arr)
						setCurrentStreak(getCurrentStreak(arr))
						setBestStreak(getBestStreak(arr))
						setCompletedDates(arr)
						setAllDates(getDates(new Date(arr[arr.length - 1]), new Date()))

						setIsFetching(false)
					}
				})
			})
		}
	}

	return (
		<>
			{showModal && (
				<Modal
					setUser={setUser}
					fetchData={fetchData}
					setShowModal={setShowModal}
				/>
			)}
			<div className='flex flex-col items-center px-10 sm:px-24 py-10 w-full min-h-screen'>
				{useMobile() ? (
					<NavbarMobile
						user={user}
						currentStreak={currentStreak}
						bestStreak={bestStreak}
						setShowModal={setShowModal}
						isFetching={isFetching}
					/>
				) : (
					<Navbar
						user={user}
						currentStreak={currentStreak}
						bestStreak={bestStreak}
						setShowModal={setShowModal}
					/>
				)}

				{user && (
					<div>
						{!isFetching ? (
							<div className='w-[74] sm:w-[94] mt-10 text-center'>
								<div className='grid gap-3 sm:gap-4 grid-cols-7 text-center mb-2'>
									{daysOfWeek.map((day) => (
										<div className='text-text' key={day}>
											{day}
										</div>
									))}
								</div>
								{allDates.length > 0 && (
									<div className='gap-3 sm:gap-4 grid grid-cols-7 scale-y-[-1]'>
										{Array.from(
											Array(new Date(allDates[0]).getDay() - 1).keys()
										).map((index) => (
											<div key={index + 'a'}></div>
										))}
										{allDates.map((date, index) => (
											<div
												key={index + 'b'}
												className={`${
													completedDates.includes(date) ? 'cellActive' : 'cell'
												}`}
											></div>
										))}
										{Array.from(
											Array(
												7 - new Date(allDates[allDates.length - 1]).getDay()
											).keys()
										).map((index) => (
											<div key={index + 'c'} className='cellEmpty'></div>
										))}
									</div>
								)}
							</div>
						) : (
							<div className='bg-primary my-24 w-5 h-5 animate-pulse rounded-full'></div>
						)}
					</div>
				)}
			</div>
		</>
	)
}

export default App
