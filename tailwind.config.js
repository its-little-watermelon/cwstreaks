/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#303133',
				primary: '#B1361E',
				secondary: '#454545',
				text: '#9B9B9C',
				dark: '#292929',
				modalBackground: '#00000080',
			},
		},
	},
	plugins: [],
}
