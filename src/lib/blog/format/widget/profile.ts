import { SocialLink } from '../childrenDatabase/socialLinksDatabase'
import { BlogStats, Widget } from './../../../../types/blog'

export type ProfileWidgetType = {
  name: string
  description: string
  logo: {
    src: string
    info: {
      placeholder: string
      width: number
      height: number
    }
  }
  links: SocialLink[]
}

export function formatProfileWidget(
  properties: Widget['properties'],
  _blogStats: BlogStats,
  data: {
    SocialLinks: SocialLink[]
  }
): ProfileWidgetType {
  const { title, excerpt, cover } = properties
  const name = title
  const description = excerpt
  const links = data.SocialLinks
  const logo = cover.light

  return {
    name,
    description,
    logo,
    links,
  }
}
