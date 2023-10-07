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
        primary: "#105D71",
        "secondary": "#A5F1F1",
        "tertiary": "#A5EFFA",
        "oceanic": "#EAEFF3"
      }
    },
  },
  plugins: [],
}
export default config
