import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "bouncey": {
          "0%": { transform: "translateY(-4%)" , animationTimingFunction: 'ease-in-out'},
          "50%": { transform: "translateY(0%)" , animationTimingFunction: 'ease-in-out'},
          "100%": { transform: "translateY(-4%)" , animationTimingFunction: 'ease-in-out'},
        },
      },
      animation: {
        "bounce-up-down": "bouncey 3s infinite"
      },
    },
  },
  plugins: [],
}
export default config
