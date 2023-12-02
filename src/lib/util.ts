import { Post, Tag } from '@/src/types/blog'
import { slugify as slugifyFn } from 'transliteration'
import { Page, Title } from '../types/blog'

export function formatDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor(diff / 1000 / 60)

  if (hours > 24) {
    // yyyy 年 MM 月 DD 日
    return `${date.getFullYear()} 年 ${
      date.getMonth() + 1
    } 月 ${date.getDate()} 日`
  }

  if (hours > 0) {
    return `${hours} 小时前`
  }

  if (minutes > 0) {
    return `${minutes} 分钟前`
  }

  return '刚刚'
}

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export function convertToInteger(stringValue: string): number {
  return parseInt(stringValue.replace('px', ''))
}

export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (err) {
    return false
  }
}

export function getSubTitleInfo(
  slug: string,
  navProps: {
    navPages: Page[]
    siteSubtitle: Title | null
  }
) {
  const navItem = navProps.navPages.find((item) => item.slug === slug) ?? null
  const navSubtitle: Title | null = navItem
    ? {
        text: navItem?.nav,
        color: navItem?.color,
        slug: navItem?.slug,
      }
    : null
  return navSubtitle
}

export function addSubTitle(
  navProps: {
    navPages: Page[]
    siteSubtitle: Title | null
    enableNavSubtitle?: boolean
  },
  slug?: string,
  subTitle?: Title | null,
  onNav?: boolean
) {
  if (onNav === undefined) {
    navProps.enableNavSubtitle = true
  } else {
    navProps.enableNavSubtitle = onNav
  }

  if (subTitle) {
    navProps.siteSubtitle = subTitle
    return
  }
  if (!slug) return
  const navSubtitle = getSubTitleInfo(slug, navProps)
  navProps.siteSubtitle = navSubtitle
}

export function createTagCategoryMap(items: Post[]) {
  const tagCategoryMapById: Map<string, Set<string>> = new Map()
  const categoryTagMapById: Map<string, Set<string>> = new Map()

  items.forEach((post: Post) => {
    const category = post.category

    post.tags.forEach((tag: Tag) => {
      if (!tagCategoryMapById.has(tag.id)) {
        tagCategoryMapById.set(tag.id, new Set([category.id]))
      } else {
        const set = tagCategoryMapById.get(tag.id)
        if (set) {
          set.add(category.id)
        } else {
          tagCategoryMapById.set(tag.id, new Set([category.id]))
        }
      }

      if (!categoryTagMapById.has(category.id)) {
        categoryTagMapById.set(category.id, new Set([tag.id]))
      } else {
        const set = categoryTagMapById.get(category.id)
        if (set) {
          set.add(tag.id)
        } else {
          categoryTagMapById.set(category.id, new Set([tag.id]))
        }
      }
    })
  })
  return {
    tagCategoryMapById: Object.fromEntries(
      Array.from(tagCategoryMapById, ([k, v]) => [k, Array.from(v)])
    ),
    categoryTagMapById: Object.fromEntries(
      Array.from(categoryTagMapById, ([k, v]) => [k, Array.from(v)])
    ),
  }
}

export function getFileNameFromURL(url: string) {
  const match = url.match(/([^/]+)(?=\?)/)
  return match ? decodeURI(match[0]) : null
}

export function satisfiesRequiredAnnotation(
  annotation: any,
  requiredAnnotation: any
) {
  for (const key in requiredAnnotation) {
    if (
      !annotation.hasOwnProperty(key) ||
      annotation[key] !== requiredAnnotation[key]
    ) {
      return false
    }
  }
  return true
}

export function extractDomain(url: string): string {
  const domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im
  const domain = url.match(domainRegex)
  return domain ? domain[1] : ''
}

export function removeHTMLTags(str: string) {
  return str.replace(/<[^>]*>/g, '')
}

export function slugify(str: string) {
  return slugifyFn(str).replace(/[^A-Za-z0-9]/g, '-')
}
