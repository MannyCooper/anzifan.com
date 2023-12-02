import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { BlogStats } from '@/src/types/blog'
import React from 'react'
import PVStats from './components/stats/PVStats'
import { StatsGraph } from './components/stats/StatsGraph'
import { WidgetContainer } from './WidgetContainer'

export const StatsWidget = ({ data }: { data: BlogStats }) => {
  const postNum = data.posts
  const topicNum = data.tags
  const timeline = data.timeline

  return (
    <React.StrictMode>
      <WidgetContainer>
        <div className="items-sketch flex h-full justify-between px-3.5 py-3 md:px-4 md:py-3 lg:px-5 lg:py-4">
          <div className="flex h-full shrink-0 flex-col justify-between">
            <div className="inline w-12 origin-bottom-right animate-wave text-4xl lg:text-5xl">
              👋
            </div>
            <div className="flex flex-col gap-y-1.5 text-xl font-semibold sm:text-xl md:text-lg lg:gap-0 lg:gap-y-1.5 lg:text-2xl">
              <p
                className={classNames(
                  colorMap['orange'],
                  'line-clamp-1 leading-none'
                )}
              >
                {postNum} 篇文章
              </p>
              <p
                className={classNames(
                  colorMap['pink'],
                  'line-clamp-1 leading-none'
                )}
              >
                {topicNum} 个话题
              </p>
              <p
                className={classNames(
                  colorMap['blue'],
                  'line-clamp-1 leading-none'
                )}
              >
                <PVStats />
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <StatsGraph timeline={timeline} />
          </div>
        </div>
      </WidgetContainer>
    </React.StrictMode>
  )
}
