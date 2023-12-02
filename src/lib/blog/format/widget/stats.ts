import { BlogStats, Widget } from '@/src/types/blog'

export function formatStatsWidget(
  _properties: Widget['properties'],
  blogStats: BlogStats,
  _data: any
): BlogStats {
  return {
    ...blogStats,
  }
}
