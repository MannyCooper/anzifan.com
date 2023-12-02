import { useEffect, useState } from 'react'
import { classNames } from '../lib/util'

const FADE_INTERVAL_MS = 1500

const languages = [
  'No More, For Now ...',
  '暂时，到此为止...',
  'Por ahora, eso es todo ...',
  'Plus maintenant, pour le moment...',
  '今はこれまで ...',
  'Пока что, этого достаточно ...',
]

const LanguageFlasher = () => {
  const [currentLang, setCurrentLang] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      setOpacity((opacity) => (opacity === 1 ? 0 : 1))
    }, FADE_INTERVAL_MS)
    return () => clearInterval(fadeTimeout)
  }, [opacity])

  useEffect(() => {
    const wordChangeTimeout = setInterval(() => {
      if (opacity === 0) {
        setCurrentLang((currentLang) =>
          currentLang === languages.length - 1 ? 0 : currentLang + 1
        )
      }
    }, FADE_INTERVAL_MS)
    return () => clearInterval(wordChangeTimeout)
  }, [currentLang, opacity])

  return (
    <h1
      className="text-lg font-medium transition duration-[1250ms] ease-in-out"
      style={{ opacity: opacity }}
    >
      {languages[currentLang]}
    </h1>
  )
}

export const Empty = ({ isWhite }: { isWhite?: boolean }) => {
  return (
    <div
      className={classNames(
        'border-1 my-8 w-full select-none rounded-2xl border  border-neutral-200 px-8 py-4 text-center text-neutral-300 dark:border-neutral-800 dark:text-neutral-600',
        isWhite
          ? 'bg-white dark:bg-background-dark'
          : 'bg-background-light/60 dark:bg-black'
      )}
    >
      <LanguageFlasher />
    </div>
  )
}
