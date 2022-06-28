import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'

const plugin = require('windicss/plugin')

export default defineConfig({
  darkMode: 'class',
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
      'xs': '350px',
      'sm': '450px',
      'md': '734px',
      'lg': '1068px',
    },
    extend: {
      scale: {
        flip: '-1',
      },
      boxShadow: {
        '2xl-middle': '0 0 20px -5px rgba(24, 23, 23, 1)',
        'lg-middle' : '0 0 20px -3px rgb(0 0 0 / 0.1)'
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-12deg)' },
          '50%' : { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(12deg)' },
        },
        scrollSm: {
          "0%" : {
            transform: "translateX(0px)"
          },
          "100%" : {
            transform: "translateX(calc(-44px * 10))"
          }
        },
        scrollMd: {
          "0%" : {
            transform: "translateX(0px)"
          },
          "100%" : {
            transform: "translateX(calc(-78px * 10))"
          }
        },
        scrollLg: {
          "0%" : {
            transform: "translateX(0px)"
          },
          "100%" : {
            transform: "translateX(calc(-110px * 10))"
          }
        }
      },
      animation: {
        'wave': 'wave 1s ease-out 3',
        'scroll-sm': 'scrollSm 200s linear infinite',
        'scroll-md': 'scrollMd 200s linear infinite',
        'scroll-lg': 'scrollLg 200s linear infinite'
      },
      screens: {
        'mobile-hover': { 'raw': '(hover: hover)' },
      },
      backgroundSize: {
        'no-underline-size': '0 1px, auto',
        'underline-size': '100% 1px, auto',
      },
      backgroundImage: theme => ({
        'underline-pink': 'linear-gradient(#ff375f, #ff375f), linear-gradient(transparent, transparent)',
        'underline-blue': 'linear-gradient(rgb(59, 130, 246), rgb(59, 130, 246)), linear-gradient(transparent, transparent)',
        'underline': 'linear-gradient(CurrentColor, CurrentColor), linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))'
      }),
    },
  },
  plugins: [
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/scroll-snap'),
  ],
})