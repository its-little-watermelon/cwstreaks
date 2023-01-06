import { useState } from 'react'

const Modal: React.FC<{
	setUser: Function
	fetchData: Function
	setShowModal: Function
}> = ({ setUser, fetchData, setShowModal }) => {
	const [newUser, setNewUser] = useState<string>('')
	const [fetching, setFetching] = useState<boolean>(false)
	const [invalid, setInvalid] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setFetching(true)

		const URL = `https://www.codewars.com/api/v1/users/${newUser}`

		fetch(URL).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					setUser(newUser)
					fetchData(
						newUser,
						Math.ceil(data.codeChallenges.totalCompleted / 200)
					)
					setShowModal(false)
				})
			} else {
				setNewUser('')
				setFetching(false)
				setInvalid(true)
			}
		})
	}

	return (
		<div
			onClick={() => setShowModal(false)}
			className='bg-modalBackground w-screen h-screen z-10 fixed flex items-center justify-center'
		>
			<form
				onSubmit={handleSubmit}
				onClick={(e) => e.stopPropagation()}
				className='bg-background text-center flex flex-col items-center gap-6 py-6 px-12 rounded-lg'
			>
				<p className='text-white'>Enter a username</p>
				<input
					autoFocus
					type='text'
					value={newUser}
					onChange={(e) => setNewUser(e.target.value)}
					className='w-56 rounded-md px-2 outline-none'
				/>
				<button
					disabled={fetching || newUser === ''}
					className='bg-primary text-white px-4 py-1 rounded-md disabled:opacity-60'
				>
					Submit
				</button>
				{invalid && <p className='text-primary'>Invalid username</p>}
			</form>
		</div>
	)
}

export default Modal
