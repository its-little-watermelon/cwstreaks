import { useState, useEffect } from 'react'

const maxMobileWidth = 640

const getWidth = () => {
	return (
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth
	)
}

export const useMobile = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false)

	useEffect(() => {
		const resizeListener = () => {
			setIsMobile(getWidth() < maxMobileWidth)
		}

		window.addEventListener('resize', resizeListener)

		return () => {
			window.removeEventListener('resize', resizeListener)
		}
	}, [])

	return isMobile
}
