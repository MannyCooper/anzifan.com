import { Tab } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Fragment, useEffect, useState } from 'react'

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

  const themes = ['light', 'dark', 'system']
  const themesText = ['Light', 'Dark', 'Auto']

  return (
    <Tab.Group
      defaultIndex={themes.indexOf(theme ?? 'system')}
      onChange={(index) => setTheme(themes[index])}
    >
      <Tab.List className="text-xs font-light border rounded-full whitespace-nowrap border-blue-light dark:border-blue-dark">
        {themesText.map((text) => (
          <Tab as={Fragment} key={text}>
            {({ selected }) => (
              <button
                className={`w-11 px-1 ${
                  selected
                    ? 'm-[1px] rounded-full bg-blue-light p-0.5 text-white outline-none dark:bg-blue-dark'
                    : 'text-blue-light dark:text-blue-dark'
                }`}
              >
                {text}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}

export default ThemeSwitch
