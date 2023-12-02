import { useCallback, useEffect, useState } from 'react'

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setTargetReached(true)
      } else {
        setTargetReached(false)
      }
    },
    []
  )

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`)
    media.addEventListener('change', updateTarget)

    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeEventListener('change', updateTarget)
  }, [])

  return targetReached
}
