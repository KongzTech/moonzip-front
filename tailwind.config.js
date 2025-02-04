/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				barlow: ['Barlow', 'sans-serif'],
				'ibm-mono': ['IBM Plex Mono', 'monospace'],
				'ibm-sans': ['IBM Plex Sans', 'sans-serif'],
			},
			colors: {
				dark: {
					800: '#111111',
					750: '#141414',
					700: '#262626',
					600: '#626262',
				},
				light: {
					100: '#C9C9C9',
					0: '#FFFFFF',
				},
				purple: {
					100: '#bba1ee',
				},
				green: {
					100: '#a1eebe',
				},
				yellow: {
					100: '#eed5a1',
				},
				red: {
					100: '#EEA1B9',
				},
			},
			keyframes: {
				'pulse-subtle': {
					'0%, 100%': { borderColor: 'rgba(135, 105, 222, 0.2)' },
					'50%': { borderColor: 'rgba(135, 105, 222, 0.4)' },
				},
				'tile-1': {
					'0%': { opacity: '0.05' },
					'10%': { opacity: '0.15' },
					'20%': { opacity: '0.05' },
					'100%': { opacity: '0.05' },
				},
				'tile-2': {
					'0%': { opacity: '0.05' },
					'20%': { opacity: '0.15' },
					'30%': { opacity: '0.05' },
					'100%': { opacity: '0.05' },
				},
				'tile-3': {
					'0%': { opacity: '0.05' },
					'30%': { opacity: '0.15' },
					'40%': { opacity: '0.05' },
					'100%': { opacity: '0.05' },
				},
				'tile-4': {
					'0%': { opacity: '0.05' },
					'40%': { opacity: '0.15' },
					'50%': { opacity: '0.05' },
					'100%': { opacity: '0.05' },
				},
				'tile-5': {
					'0%': { opacity: '0.05' },
					'50%': { opacity: '0.15' },
					'60%': { opacity: '0.05' },
					'100%': { opacity: '0.05' },
				},
				'spin-slow': {
					'0%': { transform: 'scale(0.95) rotate(0deg)' },
					'50%': { transform: 'scale(1) rotate(180deg)' },
					'100%': {
						transform: 'scale(0.95) rotate(360deg)',
					},
				},
				'spin-reverse': {
					'0%': { transform: 'rotate(360deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				shine: {
					'0%': { transform: 'translateY(-100%)' },
					'20%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(100%)' },
				},
				'scale-x': {
					'0%': { transform: 'scaleX(0)' },
					'100%': { transform: 'scaleX(1)' },
				},
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				grid: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(40px)' },
				},
				blink: {
					'0%, 100%': { opacity: '0.2' },
					'50%': { opacity: '0.8' },
				},
			},
			animation: {
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'tile-1': 'tile-1 2s infinite linear',
				'tile-2': 'tile-2 2s infinite linear',
				'tile-3': 'tile-3 2s infinite linear',
				'tile-4': 'tile-4 2s infinite linear',
				'tile-5': 'tile-5 2s infinite linear',
				'spin-slow': 'spin-slow 30s linear infinite',
				'spin-reverse': 'spin-reverse 40s linear infinite',
				'fade-in': 'fadeIn 2s ease-out forwards',
				shine: 'shine 3s ease-in-out infinite',
				'scale-x': 'scale-x 0.5s ease-out forwards',
				'fade-in-down': 'fade-in-down 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.2s ease-out',
				grid: 'grid 3s linear infinite',
			},
		},
	},
	plugins: [],
}
