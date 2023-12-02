import Tooltip from '@/src/components/utility/Tooltip'
import { useScreenSize } from '@/src/hooks/useScreenSize'
import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { BlogStats } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import { Stage } from '@pixi/react'
import { useEffect, useState } from 'react'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'
import useSWR from 'swr'
import StatsDate from './StatsDate'
import StatsGraphBar from './StatsGraphBar'
import StatsGraphDot from './StatsGraphDot'
import StatsGraphLine from './StatsGraphLine'

const LINE_WIDTH = 1.2

export const StatsGraph = ({
  timeline,
}: {
  timeline: BlogStats['timeline']
}) => {
  const { isWidescreen } = useScreenSize()

  const width = isWidescreen ? 215 : 150
  const height = isWidescreen ? 172 : 130
  const highGraphHeight = isWidescreen ? 20 : 15
  const lowGraphHeight = isWidescreen ? 10 : 8

  let uvData: number[] = Array(48).fill(0)
  let pvData: number[] = Array(48).fill(0)

  const stats = [
    { id: 'uv', label: '访客', graphHeight: highGraphHeight },
    { id: 'pv', label: '访问', graphHeight: highGraphHeight },
    { id: 'timeline', label: '文章', graphHeight: lowGraphHeight },
  ]

  const [resolution, setResolution] = useState(1)

  useEffect(() => {
    setResolution(window.devicePixelRatio * 2 || 2)
  }, [])

  const previewFetcher = () => fetch(`/api/stats`).then((res) => res.json())
  const { data, error } = useSWR('stats', previewFetcher)

  const renderStats = (
    id: string,
    label: string,
    graphHeight: number,
    dataAvailable = true
  ) => (
    <div key={id}>
      <p className="mb-1 font-semibold text-black dark:text-white md:text-xs lg:mb-1.5 lg:text-sm">
        {label}
      </p>
      <Tooltip
        content={dataAvailable ? renderContent(id, uvData, pvData) : null}
      >
        <Stage
          id={id}
          width={width}
          height={graphHeight}
          options={{
            antialias: true,
            backgroundColor: 0x000000,
            backgroundAlpha: 0,
            resolution: resolution,
          }}
        >
          <StatsGraphLine
            width={width}
            height={graphHeight}
            lineWidth={LINE_WIDTH}
          />
          {dataAvailable ? StatsGraphMap(graphHeight)[id] : null}
        </Stage>
      </Tooltip>
    </div>
  )

  const StatsGraphMap = (
    graphHeight: number
  ): { [key: string]: JSX.Element } => ({
    uv: (
      <StatsGraphBar
        width={width}
        height={graphHeight}
        data={uvData}
        isWidescreen={isWidescreen}
        margin={LINE_WIDTH}
        gradientColors={['#ff8e9f', '#ff2c55']}
      />
    ),
    pv: (
      <StatsGraphBar
        width={width}
        height={graphHeight}
        data={pvData}
        isWidescreen={isWidescreen}
        margin={LINE_WIDTH}
        gradientColors={['#7abaff', '#007AFF']}
      />
    ),
    timeline: (
      <StatsGraphDot
        width={width}
        height={graphHeight}
        timeline={timeline}
        isWidescreen={isWidescreen}
        margin={LINE_WIDTH}
      />
    ),
  })

  if (error || !data) {
    return (
      <div
        style={{ width: width, height: height }}
        className="flex flex-col justify-between"
      >
        {stats.map(({ id, label, graphHeight }) =>
          renderStats(id, label, graphHeight)
        )}
        <StatsDate isWidescreen={isWidescreen} />
      </div>
    )
  }

  pvData = data.pv
  uvData = data.uv

  return (
    <div
      style={{ width: width, height: height }}
      className="flex flex-col justify-between"
    >
      {stats.map(({ id, label, graphHeight }) =>
        renderStats(id, label, graphHeight)
      )}
      <StatsDate isWidescreen={isWidescreen} />
    </div>
  )
}

function renderContent(id: string, uvData: number[], pvData: number[]) {
  if (id !== 'uv' && id !== 'pv') return

  const renderArrowWithData = (data: number[], color: string) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <span>无数据</span>
    }

    const minValue = Math.min(...data)
    const maxValue = Math.max(...data)

    return (
      <>
        <span
          className={classNames(
            colorMap[color as ApiColor],
            'text-pink flex place-items-center gap-0.5'
          )}
        >
          <BiSolidDownArrow />
          {minValue}
        </span>
        <span
          className={classNames(
            colorMap[color as ApiColor],
            'text-pink flex place-items-center gap-0.5'
          )}
        >
          <BiSolidUpArrow />
          {maxValue}
        </span>
      </>
    )
  }

  const data = id === 'uv' ? uvData : pvData
  const color = id === 'uv' ? 'pink' : 'blue'

  return (
    <p className="flex place-items-center gap-1">
      {renderArrowWithData(data, color)}
    </p>
  )
}
