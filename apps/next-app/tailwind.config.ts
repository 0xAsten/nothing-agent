import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        flash: {
          '0%': { backgroundColor: 'transparent' },
          '25%': {
            backgroundColor: 'rgba(46, 166, 255, 0.4)', // Increased opacity from 0.1 to 0.3
            color: '#60a5fa', // Using hex for consistency
          },
          '50%': {
            // Added middle keyframe
            backgroundColor: 'rgba(46, 166, 255, 0.4)',
            color: '#60a5fa',
          },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        flash: 'flash 2s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config
