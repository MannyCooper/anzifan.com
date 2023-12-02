import { Text } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useMemo } from 'react'

interface StatsTextProps {
  text: string
  isWidescreen: boolean
}

const StatsText = ({ text, isWidescreen }: StatsTextProps) => {
  const fontSize = isWidescreen ? 14 : 12

  const textStyle = useMemo(() => {
    return new PIXI.TextStyle({
      fontSize,
      fontWeight: '500',
    })
  }, [fontSize])

  return <Text text={text} x={0} y={0} style={textStyle} />
}

export default StatsText
