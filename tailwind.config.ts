import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#DAD7CD',
          light: '#E8E6DD',
          dark: '#C5C2B8',
        },
        sage: {
          DEFAULT: '#A3B18A',
          light: '#B8C5A3',
          dark: '#8E9D77',
        },
        forest: {
          DEFAULT: '#588157',
          light: '#6D9A6B',
          dark: '#476847',
        },
        pine: {
          DEFAULT: '#344E41',
          light: '#476357',
          dark: '#243B2F',
        },
        moss: {
          DEFAULT: '#3A5A40',
          light: '#4D6F52',
          dark: '#2A4530',
        },
      },
    },
  },
  plugins: [],
}

export default config
