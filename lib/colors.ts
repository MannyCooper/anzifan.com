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

type colorsType = {
    [key: string]: {
        [text: string] : {
            light: string, dark: string, msgDark?: string, msgLight?: string
        },        
    }
}

export const Colors : colorsType = {
    'red': { 
        text: {
            light: 'text-hex-ff3b30',
            dark: 'text-hex-ff453a',
            msgLight: 'text-red-500',
            msgDark: 'text-red-50',
        },
        bg: {
            light: 'bg-red-50',
            dark: 'bg-red-900',
            msgLight: 'bg-hex-ff3b30',
            msgDark: 'bg-hex-ff453a',
        },
    },
    'orange': { 
        text: {
            light: 'text-hex-ff9500',
            dark: 'text-hex-ff9f0a',
            msgLight: 'text-orange-500',
            msgDark: 'text-orange-50',
        },
        bg: {
            light: 'bg-orange-50',
            dark: 'bg-orange-900',
            msgLight: 'bg-hex-ff9500',
            msgDark: 'bg-hex-ff9f0a',
        },
    },
    'yellow': { 
        text: {
            light: 'text-hex-ffcc00',
            dark: 'text-hex-ffd60a',
            msgLight: 'text-yellow-500',
            msgDark: 'text-yellow-50',
        },
        bg: {
            light: 'bg-yellow-50',
            dark: 'bg-yellow-900',
            msgLight: 'bg-hex-ffcc00',
            msgDark: 'bg-hex-ffd60a',
        },
    },
    'green': { 
        text: {
            light: 'text-hex-34c759',
            dark: 'text-hex-30d158',
            msgLight: 'text-green-500',
            msgDark: 'text-green-50',
        },
        bg: {
            light: 'bg-green-50',
            dark: 'bg-green-900',
            msgLight: 'bg-hex-34c759',
            msgDark: 'bg-hex-30d158',
        },
    },
    'blue': { 
        text: {
            light: 'text-hex-007aff',
            dark: 'text-hex-0a84ff',
            msgLight: 'text-blue-500',
            msgDark: 'text-blue-50',
        },
        bg: {
            light: 'bg-blue-50',
            dark: 'bg-blue-900',
            msgLight: 'bg-hex-007aff',
            msgDark: 'bg-hex-0a84ff',
        },
    },
    'pink': { 
        text: {
            light: 'text-hex-ff2d55',
            dark: 'text-hex-ff375f',
            msgLight: 'text-pink-500',
            msgDark: 'text-rose-50',
        },
        bg: {
            light: 'bg-rose-50',
            dark: 'bg-rose-900',
            msgLight: 'bg-hex-ff2d55',
            msgDark: 'bg-hex-ff375f',
        },
    },
    'purple': { 
        text: {
            light: 'text-hex-5856d6',
            dark: 'text-hex-5e5ce6',
            msgLight: 'text-purple-500',
            msgDark: 'text-indigo-50',
        },
        bg: {
            light: 'bg-indigo-50',
            dark: 'bg-indigo-900',
            msgLight: 'bg-hex-5856d6',
            msgDark: 'bg-hex-5e5ce6',
        },
    },
    'brown': {
        text: {
            light: 'text-hex-a2845e',
            dark: 'text-hex-ac8e68',
            msgLight: 'text-amber-500',
            msgDark: 'text-amber-50',
        },
        bg: {
            light: 'bg-amber-50',
            dark: 'bg-amber-900',
            msgLight: 'bg-hex-a2845e',
            msgDark: 'bg-hex-ac8e68',
        },
    },
    'gray': {
        text: {
            light: 'text-true-gray-500',
            dark: 'text-true-gray-400',
            msgLight: 'text-true-gray-600',
            msgDark: 'text-true-gray-100',
        },
        bg: {
            light: 'bg-true-gray-100',
            dark: 'bg-true-gray-900',
            msgLight: 'bg-true-gray-300',
            msgDark: 'bg-true-gray-400',
        },
    },    
}