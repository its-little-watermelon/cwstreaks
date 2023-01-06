/**
 * This function accepts two dates and returns an array of dates (in string format) between these two dates (included)
 *
 * @param {Date} start The starting date (the 'oldest' date)
 * @param {Date} end The ending date (the 'newest' date)
 * @returns {string[]} An array of dates (in string format) in ascending order
 */
export const getDates = (start: Date, end: Date): string[] => {
	let arr = []
	for (
		let date = start;
		date.valueOf() <= end.valueOf();
		date.setDate(date.getDate() + 1)
	) {
		arr.push(new Date(date).toISOString().slice(0, 10))
	}
	return arr
}

/**
 * This function accepts an array of sorted dates (in string format), where some dates may repeat and returns an array without these duplicates
 *
 * @param {string[]} arr An array of sorted dates (in string format)
 * @returns {string[]} An array of sorted unique dates (in string format)
 */
export const removeDuplicates = (arr: string[]): string[] => {
	let uniqueArr = []
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== arr[i + 1] || i === arr.length - 1) {
			uniqueArr.push(arr[i])
		}
	}
	return uniqueArr
}

/**
 * This function accepts an array of dates and returns the number of consecutive dates in the array from today
 *
 * @param {string[]} arr An array of sorted unique dates (in string format) in descending order
 * @returns {number} The number of consecutive dates from today
 */
export const getCurrentStreak = (arr: string[]) => {
	if (arr.length === 0) return 0
	let date = new Date()
	let i = 0
	let streak = 0
	while (date.toISOString().slice(0, 10) === arr[i]) {
		i += 1
		date.setDate(date.getDate() - 1)
		streak += 1
	}

	return streak
}

/**
 * This function accepts two dates and returns the difference in days between them
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number} The difference in days between date1 and date2
 */
export const diffDays = (date1: Date, date2: Date) => {
	const diff = Math.abs(date1.getTime() - date2.getTime())
	return diff / (1000 * 3600 * 24)
}

/**
 * This function accepts an array of dates and returns the highest number of consecutive dates in the array
 *
 * @param {string[]} arr An array of sorted unique dates (in string format) in descending order
 * @returns {number} The highest number of consecutive dates in the array
 */
export const getBestStreak = (arr: string[]) => {
	if (arr.length === 0) return 0
	let bestStreak = 1
	let currentStreak = 0
	for (let i = 0; i < arr.length - 1; i++) {
		if (diffDays(new Date(arr[i]), new Date(arr[i + 1])) === 1) {
			currentStreak += 1
			if (currentStreak > bestStreak) {
				bestStreak = currentStreak
			}
		} else {
			currentStreak = 1
		}
	}
	return bestStreak
}
