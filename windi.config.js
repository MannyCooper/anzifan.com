import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css,js,ts}'],
    exclude: ['node_modules', '.git', '.next', '.*'],
  },
  attributify: true,
  theme: {
    fontFamily: {
      sans: ['Overpass', ...defaultTheme.fontFamily.sans],
      serif: ['"Old Standard TT"', ...defaultTheme.fontFamily.serif],
      mono: ['"Overpass Mono"', ...defaultTheme.fontFamily.mono],
    },
    screens: {
      'sm': '450px',
      'md': '734px',
      'lg': '1068px',
    },
    extend: {
      screens: {
        'mobile-hover': { 'raw': '(hover: hover)' },
      },
      backgroundSize: {
        'no-underline-size': '0 1px, auto',
        'underline-size': '100% 1px, auto',
      },
      backgroundImage: theme => ({
        'underline': 'linear-gradient(#ff375f, #ff375f), linear-gradient(transparent, transparent)'
      }),
    },
  },
  plugins: [
    require('windicss/plugin/line-clamp'),
  ],
})