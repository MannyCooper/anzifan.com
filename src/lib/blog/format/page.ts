import { ApiColor } from '@/src/types/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Page } from './../../../types/blog'

export const formatPages = (pages: PageObjectResponse[]): Page[] => {
  return pages.map((page) => formatPage(page))
}

export const formatPage = (page: PageObjectResponse): Page => {
  const { id, properties } = page
  const { title, status, slug, excerpt, date, cover, color_title } = properties

  const pageNav = title.type === 'title' && title.title[0]?.plain_text
  const pageStatus =
    status.type === 'status' && status.status && status.status.name
  const pageSlug = slug.type === 'rich_text' && slug.rich_text[0]?.plain_text
  const pageTitle =
    excerpt.type === 'rich_text' && excerpt.rich_text[0]?.plain_text
  const pageDate = date.type === 'date' && date.date && date.date.start
  const pageCover = cover.type === 'url' && cover.url
  const pageColor =
    color_title.type === 'multi_select' &&
    (color_title.multi_select[0]?.color as ApiColor)

  const formatedPage = {
    id,
    status: pageStatus ?? 'Hidden',
    nav: pageNav ?? 'Untitled',
    slug: pageSlug ?? 'unknown',
    title: pageTitle ?? 'Untitled❓',
    date: pageDate ?? '',
    icon: pageCover ?? '',
    color: pageColor ?? 'default',
  } as Page

  return formatedPage
}
