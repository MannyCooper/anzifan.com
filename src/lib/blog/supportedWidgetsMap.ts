import { BlogStats, Widget } from '@/src/types/blog'
import { formatProfileWidget } from './format/widget/profile'
import { formatStatsWidget } from './format/widget/stats'

export const supportedWidgetsMap: {
  [key: string]: {
    formatFn: (
      properties: Widget['properties'],
      blogStats: BlogStats,
      data?: any
    ) => any
    database: string[]
  }
} = {
  profile: {
    formatFn: formatProfileWidget,
    database: ['SocialLinks'],
  },
  stats: {
    formatFn: formatStatsWidget,
    database: [],
  },
}
