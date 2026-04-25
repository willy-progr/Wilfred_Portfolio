import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        'surface-light': 'var(--surface-light)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)',
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'on-accent': 'var(--on-accent)',
        danger: 'var(--danger)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
        body: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        'hero-name': ['"Bodoni Moda"', 'ui-serif', 'Didot', 'Georgia', 'serif'],
      },
      maxWidth: {
        'content': '1200px',
      },
      borderRadius: {
        'pill': '100px',
        'card': '16px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 48s linear infinite',
        'skill-drift': 'skill-drift 5.5s ease-in-out infinite',
        'skill-drift-slow': 'skill-drift 7.5s ease-in-out infinite reverse',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'skill-drift': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
