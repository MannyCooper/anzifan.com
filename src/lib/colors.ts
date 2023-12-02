import { ApiColor } from '../types/notion'

// Notion Colors:
// Light gray - default
// Gray
// Brown
// Orange
// Yellow
// Green
// Blue
// Purple
// Pink
// Red

export const colorMap: {
  [color in ApiColor]: string
} = {
  // text
  default: 'text-neutral-900 dark:text-neutral-200',
  gray: 'text-neutral-500 dark:text-neutral-400',
  brown: 'text-brown-light dark:text-brown-dark',
  orange: 'text-orange-light dark:text-orange-dark',
  yellow: 'text-yellow-light dark:text-yellow-dark',
  green: 'text-green-light dark:text-green-dark',
  blue: 'text-blue-light dark:text-blue-dark',
  purple: 'text-purple-light dark:text-purple-dark',
  pink: 'text-pink-light dark:text-pink-dark',
  red: 'text-red-light dark:text-red-dark',
  // primary background
  default_background: 'bg-black dark:bg-white',
  gray_background: 'bg-neutral-300 dark:bg-neutral-700',
  brown_background: 'bg-brown-light dark:bg-brown-dark',
  orange_background: 'bg-orange-light dark:bg-orange-dark',
  yellow_background: 'bg-yellow-light dark:bg-yellow-dark',
  green_background: 'bg-green-light dark:bg-green-dark',
  blue_background: 'bg-blue-light dark:bg-blue-dark',
  purple_background: 'bg-purple-light dark:bg-purple-dark',
  pink_background: 'bg-pink-light dark:bg-pink-dark',
  red_background: 'bg-red-light dark:bg-red-dark',
  // border
  default_border: 'border-black dark:border-white',
  gray_border: 'border-neutral-300 dark:border-neutral-700',
  brown_border: 'border-brown-light dark:border-brown-dark',
  orange_border: 'border-orange-light dark:border-orange-dark',
  yellow_border: 'border-yellow-light dark:border-yellow-dark',
  green_border: 'border-green-light dark:border-green-dark',
  blue_border: 'border-blue-light dark:border-blue-dark',
  purple_border: 'border-purple-light dark:border-purple-dark',
  pink_border: 'border-pink-light dark:border-pink-dark',
  red_border: 'border-red-light dark:border-red-dark',
  // secondary background
  default_background_secondary: '',
  gray_background_secondary: 'bg-neutral-50 dark:bg-[#1c1c1e]',
  red_background_secondary: 'bg-red-50 dark:bg-[#3d1515]',
  orange_background_secondary: 'bg-orange-50 dark:bg-[#321209]',
  yellow_background_secondary: 'bg-yellow-50 dark:bg-[#2d1908]',
  green_background_secondary: 'bg-green-50 dark:bg-[#0a2212]',
  blue_background_secondary: 'bg-blue-50 dark:bg-[#0d1737]',
  purple_background_secondary: 'bg-indigo-50 dark:bg-[#131234]',
  pink_background_secondary: 'bg-rose-50 dark:bg-[#350b1b]',
  brown_background_secondary: 'bg-amber-50 dark:bg-[#311607]',
  // from background
  default_background_from: 'from-black dark:from-white',
  gray_background_from: 'from-neutral-300 dark:from-neutral-700',
  brown_background_from: 'from-brown-light dark:from-brown-dark',
  orange_background_from: 'from-orange-light dark:from-orange-dark',
  yellow_background_from: 'from-yellow-light dark:from-yellow-dark',
  green_background_from: 'from-green-light dark:from-green-dark',
  blue_background_from: 'from-blue-light dark:from-blue-dark',
  purple_background_from: 'from-purple-light dark:from-purple-dark',
  pink_background_from: 'from-pink-light dark:from-pink-dark',
  red_background_from: 'from-red-light dark:from-red-dark',
  // to background
  default_background_to: 'to-black dark:to-white',
  gray_background_to: 'to-neutral-300 dark:to-neutral-700',
  brown_background_to: 'to-brown-light dark:to-brown-dark',
  orange_background_to: 'to-orange-light dark:to-orange-dark',
  yellow_background_to: 'to-yellow-light dark:to-yellow-dark',
  green_background_to: 'to-green-light dark:to-green-dark',
  blue_background_to: 'to-blue-light dark:to-blue-dark',
  purple_background_to: 'to-purple-light dark:to-purple-dark',
  pink_background_to: 'to-pink-light dark:to-pink-dark',
  red_background_to: 'to-red-light dark:to-red-dark',
  // via background
  default_background_via: 'via-black dark:via-white',
  gray_background_via: 'via-neutral-300 dark:via-neutral-700',
  brown_background_via: 'via-brown-light dark:via-brown-dark',
  orange_background_via: 'via-orange-light dark:via-orange-dark',
  yellow_background_via: 'via-yellow-light dark:via-yellow-dark',
  green_background_via: 'via-green-light dark:via-green-dark',
  blue_background_via: 'via-blue-light dark:via-blue-dark',
  purple_background_via: 'via-purple-light dark:via-purple-dark',
  pink_background_via: 'via-pink-light dark:via-pink-dark',
  red_background_via: 'via-red-light dark:via-red-dark',
}
