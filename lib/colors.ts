// Light gray
// Gray
// Brown
// Orange
// Yellow
// Green
// Blue
// Purple
// Pink
// Red

export type colorsType = {
    [key: string]: {
        [text: string]: {
            normal: string, msg: string, gradient? : string
        },
    }
}

export const Colors: colorsType = {
    'red': {
        text: {
            normal: 'text-hex-ff3b30 dark:text-hex-ff453a',
            msg: 'text-red-500 dark:text-red-50',
        },
        bg: {
            normal: 'bg-red-50 dark:bg-red-900/40',
            msg: 'bg-hex-ff3b30 dark:bg-hex-ff453a',
            gradient: 'from-hex-ff3b30 to-hex-ff9500 dark:(from-hex-ff453a to-hex-ff9f0a)',
        },
    },
    'orange': {
        text: {
            normal: 'text-hex-ff9500 dark:text-hex-ff9f0a',
            msg: 'text-orange-500 dark:text-orange-50',
        },
        bg: {
            normal: 'bg-orange-50 dark:bg-orange-900/40',
            msg: 'bg-hex-ff9500 dark:bg-hex-ff9f0a',
            gradient: 'from-hex-ff9500 to-hex-ffcc00 dark:(from-hex-ff9f0a to-hex-ffd60a)',
        }
    },
    'yellow': {
        text: {
            normal: 'text-hex-ffcc00 dark:text-hex-ffd60a',
            msg: 'text-yellow-500 dark:text-yellow-50',
        },
        bg: {
            normal: 'bg-yellow-50 dark:bg-yellow-900/40',
            msg: 'bg-hex-ffcc00 dark:bg-hex-ffd60a',            gradient: 'from-hex-ffcc00 to-hex-34c759 dark:(from-hex-ffd60a to-hex-30d158)',
        },
    },
    'green': {
        text: {
            normal: 'text-hex-34c759 dark:text-hex-30d158',
            msg: 'text-green-500 dark:text-green-50',
        },
        bg: {
            normal: 'bg-green-50 dark:bg-green-900/40',
            msg: 'bg-hex-34c759 dark:bg-hex-30d158',
            gradient: 'from-hex-34c759 to-hex-007aff dark:(from-hex-30d158 to-hex-0a84ff)',
        },
    },
    'blue': {
        text: {
            normal: 'text-hex-007aff dark:text-hex-0a84ff',
            msg: 'text-blue-500 dark:text-blue-50',
        },
        bg: {
            normal: 'bg-blue-50 dark:bg-blue-900/40',
            msg: 'bg-hex-007aff dark:bg-hex-0a84ff',
            gradient: 'from-hex-007aff to-hex-34c759 dark:(from-hex-0a84ff to-hex-30d158)'
        },
    },
    'pink': {
        text: {
            normal: 'text-hex-ff2d55 dark:text-hex-ff375f',
            msg: 'text-pink-500 dark:text-rose-50',
        },
        bg: {
            normal: 'bg-rose-50 dark:bg-rose-900/40',
            msg: 'bg-hex-ff2d55 dark:bg-hex-ff375f',
            gradient: 'from-hex-ff2d55 to-hex-ff3b30 dark:(from-hex-ff375f to-hex-ff453a)',
        },
    },
    'purple': {
        text: {
            normal: 'text-hex-5856d6 dark:text-hex-5e5ce6',
            msg: 'text-purple-500 dark:text-indigo-50',
        },
        bg: {
            normal: 'bg-indigo-50 dark:bg-indigo-900/40',
            msg: 'bg-hex-5856d6 dark:bg-hex-5e5ce6',
            gradient: 'from-hex-5856d6 to-hex-007aff dark:(from-hex-5856d6 to-hex-0a84ff)',
        },
    },
    'brown': {
        text: {
            normal: 'text-hex-a2845e dark:text-hex-ac8e68',
            msg: 'text-amber-500 dark:text-amber-50',
        },
        bg: {
            normal: 'bg-amber-50 dark:bg-amber-900/40',
            msg: 'bg-hex-a2845e dark:bg-hex-ac8e68',
            gradient: 'from-hex-a2845e to-hex-ffcc00 dark:(from-hex-ac8e68 to-hex-ffd60a)',
        },
    },
    'gray': {
        text: {
            normal: 'text-true-gray-500 dark:text-true-gray-400',
            msg: 'text-true-gray-600 dark:text-true-gray-100',
        },
        bg: {
            normal: 'bg-true-gray-100 dark:bg-true-gray-900',
            msg: 'bg-true-gray-300 dark:bg-true-gray-400',
            gradient: 'bg-black dark:bg-white',
        },
    },
}