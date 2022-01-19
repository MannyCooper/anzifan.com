import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css,js,ts}'],
    exclude: ['node_modules', '.git', '.next','.*'],
  },
  attributify: true,
  theme: {
    screens: {
      'md': '734px',
      'lg': '1068px',
    },
    extend: {
      screens: {
        'mobile-hover': {'raw': '(hover: hover)'},
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