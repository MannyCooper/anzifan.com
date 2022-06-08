import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const themes = ["light", "dark", "system"]
    const themesText = ["Light", "Dark", "Auto"]

    return (
        <Tab.Group defaultIndex={themes.indexOf(theme||"system")} onChange={index => setTheme(themes[index])}>
            <Tab.List className="text-xs font-light rounded-full border-blue-500 border-1">
                {themesText.map(text => 
                    <Tab as={Fragment} key={text}>
                        {({ selected }) => (
                        <button className={`w-11 bg-transparent px-1 ${selected ? 'bg-blue-500 text-white rounded-full p-0.5 m-[1px]' : 'text-blue-500'}`}>
                            {text}
                        </button>
                        )}
                    </Tab>
                )}
            </Tab.List>
        </Tab.Group>
    )
}

export default ThemeSwitch