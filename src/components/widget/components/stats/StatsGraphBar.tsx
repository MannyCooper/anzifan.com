import { Container, Sprite } from '@pixi/react'
import { useMemo, useState } from 'react'
import createRoundedGradientTexture from './util'

const TEXTURE_MULTIPLIER = 5
const BAR_MARGIN = 0.5

interface StatsGraphBarProps {
  width: number
  height: number
  data: number[]
  isWidescreen: boolean
  margin: number
  gradientColors: string[]
}

import { useLayoutEffect } from 'react'

function useAnimation(data: number[], duration: number) {
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    let start: number
    function step(timestamp: number) {
      if (start === undefined) start = timestamp
      const elapsed = timestamp - start
      setProgress(Math.min(elapsed / duration, 1))
      if (elapsed < duration) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [data, duration])

  return progress
}

const StatsGraphBar = ({
  width,
  height,
  data,
  isWidescreen,
  margin,
  gradientColors,
}: StatsGraphBarProps) => {
  const progress = useAnimation(data, 300)

  width = width - margin
  const maxDataValue = Math.max(...data)
  const containerSize = width / 48

  const gradientTextures = useMemo(() => {
    return data.map((count) => {
      const barHeight = maxDataValue
        ? (count / maxDataValue) * height
        : containerSize - BAR_MARGIN * 2
      return createRoundedGradientTexture(
        (containerSize - BAR_MARGIN * 2) * TEXTURE_MULTIPLIER,
        barHeight * TEXTURE_MULTIPLIER,
        gradientColors,
        true
      )
    })
  }, [data, maxDataValue, height])

  return (
    <Container x={margin / 2} y={height}>
      {data.map((count, index) => {
        const xPos = index * containerSize

        const targetBarHeight = Math.max(
          containerSize - BAR_MARGIN * 2,
          maxDataValue
            ? (count / maxDataValue) * height
            : containerSize - BAR_MARGIN * 2
        )
        const barHeight =
          targetBarHeight * progress < containerSize - BAR_MARGIN * 2
            ? containerSize - BAR_MARGIN * 2
            : targetBarHeight * progress

        return (
          <Container
            key={index}
            x={xPos}
            width={containerSize - BAR_MARGIN * 2}
            height={barHeight}
          >
            <Sprite
              texture={gradientTextures[index]}
              x={BAR_MARGIN}
              width={containerSize - BAR_MARGIN * 2}
              height={barHeight}
              anchor={{ x: 0, y: 1 }}
            />
          </Container>
        )
      })}
    </Container>
  )
}

export default StatsGraphBar
