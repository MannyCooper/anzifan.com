import { useEffect, useState } from 'react'

export const useTextWidth = (text: string) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const measureTextWidth = () => {
      const span = document.createElement('span')
      span.style.visibility = 'hidden'
      span.style.whiteSpace = 'nowrap'

      document.body.appendChild(span)

      span.innerText = text

      const width = span.getBoundingClientRect().width

      document.body.removeChild(span)

      return width
    }

    setWidth(measureTextWidth())
  }, [text])

  return width
}
