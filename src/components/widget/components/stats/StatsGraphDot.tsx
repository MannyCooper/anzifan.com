import { BlogStats } from '@/src/types/blog'
import { Container, Sprite } from '@pixi/react'
import { useCallback, useMemo } from 'react'
import createRoundedGradientTexture from './util'

const DOT_MARGIN = 0.5
const TEXTURE_SIZE = 20
const LIGHT_COLOR = ['#ffc68f80', '#ff9e2f80']
const DARK_COLOR = ['#ffc68f', '#ff9e2f']
const COLOR_THRESHOLD = 3

const StatsGraphDot = ({
  width,
  height,
  timeline,
  isWidescreen,
  margin,
}: StatsGraphDotProps) => {
  const isOnlyValue = useMemo(
    () =>
      timeline.every(
        (value) => value === 0 || (value > 0 && value <= COLOR_THRESHOLD)
      ),
    [timeline]
  )

  const getGradientColor = useCallback(
    (count: number): string[] => {
      return isOnlyValue || count > COLOR_THRESHOLD ? DARK_COLOR : LIGHT_COLOR
    },
    [isOnlyValue]
  )

  const gradientTexture = (count: number) =>
    createRoundedGradientTexture(
      TEXTURE_SIZE,
      TEXTURE_SIZE,
      getGradientColor(count)
    )

  width = width - margin

  const containerSize = width / 24

  return (
    <Container x={margin / 2} y={margin / 2}>
      {timeline.map((count, index) => {
        if (count === 0) return null

        const xPos = index * containerSize
        return (
          <Container
            key={index}
            x={xPos + DOT_MARGIN}
            y={DOT_MARGIN}
            width={containerSize - DOT_MARGIN * 2}
            height={containerSize - DOT_MARGIN * 2}
          >
            <Sprite
              texture={gradientTexture(count)}
              anchor={0}
              width={containerSize - DOT_MARGIN * 2}
              height={containerSize - DOT_MARGIN * 2}
            />
          </Container>
        )
      })}
    </Container>
  )
}

export default StatsGraphDot

interface StatsGraphDotProps {
  width: number
  height: number
  timeline: BlogStats['timeline']
  isWidescreen: boolean
  margin: number
}
