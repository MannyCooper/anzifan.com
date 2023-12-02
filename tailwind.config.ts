import type { Config } from 'tailwindcss'

const Colors = {
  red: {
    light: '#ff3b30',
    dark: '#ff453a',
  },
  orange: {
    light: '#ff9500',
    dark: '#ff9f0a',
  },
  yellow: {
    light: '#ffcc00',
    dark: '#ffd60a',
  },
  green: {
    light: '#34c759',
    dark: '#30d158',
  },
  blue: {
    light: '#007aff',
    dark: '#0a84ff',
  },
  purple: {
    light: '#5856d6',
    dark: '#5e5ce6',
  },
  pink: {
    light: '#ff2d55',
    dark: '#ff375f',
  },
  brown: {
    light: '#a2845e',
    dark: '#ac8e68',
  },
  background: {
    light: '#fafafa',
    dark: '#161617',
  },
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/lib/colors.ts',
  ],
  theme: {
    fontFamily: {
      sans: ['Overpass', ...defaultTheme.fontFamily.sans],
      serif: ['"Old Standard TT"', ...defaultTheme.fontFamily.serif],
      mono: ['"Overpass Mono"', ...defaultTheme.fontFamily.mono],
    },
    screens: {
      // 'xs': '350px',
      sm: '450px',
      md: '734px',
      lg: '1068px',
    },
    extend: {
      boxShadow: {
        card: '0 6px 28px -4px #cacaca',
      },
      screens: {
        'mobile-hover': { raw: '(hover: hover)' },
      },
      width: {
        'screen-sm': '450px',
        'screen-md': '734px',
        'screen-lg': '1068px',
      },
      backgroundSize: {
        'no-underline-size': '0 1.5px, auto',
        'underline-size': '100% 1.5px, auto',
      },
      colors: {
        red: {
          light: Colors.red.light,
          dark: Colors.red.dark,
        },
        orange: {
          light: Colors.orange.light,
          dark: Colors.orange.dark,
        },
        yellow: {
          light: Colors.yellow.light,
          dark: Colors.yellow.dark,
        },
        green: {
          light: Colors.green.light,
          dark: Colors.green.dark,
        },
        blue: {
          light: Colors.blue.light,
          dark: Colors.blue.dark,
        },
        purple: {
          light: Colors.purple.light,
          dark: Colors.purple.dark,
        },
        pink: {
          light: Colors.pink.light,
          dark: Colors.pink.dark,
        },
        brown: {
          light: Colors.brown.light,
          dark: Colors.brown.dark,
        },
        background: {
          light: Colors.background.light,
          dark: Colors.background.dark,
        },
      },
      animation: {
        wave: 'wave 1s ease-out 3',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-12deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(12deg)' },
        },
      },
    },
  },
} satisfies Config
