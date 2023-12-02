import { Container, Graphics } from '@pixi/react'
import { useTheme } from 'next-themes'
import * as PIXI from 'pixi.js'
import { useCallback, useEffect, useState } from 'react'

const LINE_COUNT = 25
const BOLD_INTERVAL = 6

interface StatsGraphLineProps {
  width: number
  height: number
  lineWidth?: number
}

const StatsGraphLine = ({
  width,
  height,
  lineWidth = 1.2,
}: StatsGraphLineProps) => {
  const { resolvedTheme, systemTheme, theme } = useTheme()

  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    setCurrentTheme(resolvedTheme || systemTheme || theme || 'light')
  }, [resolvedTheme, systemTheme, theme])

  const drawLine = useCallback(
    (g: PIXI.Graphics, alpha: number) => {
      g.lineStyle(lineWidth, '0xbababa', alpha, 0.5, true)
      g.lineTo(0, height)
    },
    [height, lineWidth, currentTheme]
  )

  const lines = Array.from({ length: LINE_COUNT }, (_, i) => {
    const isBold = i % BOLD_INTERVAL === 0
    const adjustedWidth = width - lineWidth
    const xPos = adjustedWidth * (i / (LINE_COUNT - 1)) + lineWidth / 2
    const alpha = isBold ? 1 : 0.1

    return (
      <Container key={i} x={xPos} y={0}>
        <Graphics draw={(g) => drawLine(g, alpha)} />
      </Container>
    )
  })

  return <Container>{lines}</Container>
}

export default StatsGraphLine
