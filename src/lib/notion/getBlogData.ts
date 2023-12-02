import { ApiScope } from '@/src/types/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getAll } from './getDatabase'

export const getPageBySlug = async (slug: string) => {
  const pages = await getPages()
  return (
    pages.find(
      (page) =>
        page.properties['slug'].type === 'rich_text' &&
        page.properties['slug'].rich_text[0].plain_text === slug
    ) ?? (null as unknown as PageObjectResponse)
  )
}

export const getPages = async () => {
  const objects = await getAll(ApiScope.Page)
  return objects.filter(
    (object) =>
      object.properties['type'].type === 'select' &&
      object.properties['type'].select?.name === 'Page'
  )
}

export const getPosts = async (
  scope: ApiScope.Home | ApiScope.Archive | ApiScope.Draft
) => {
  const objects = await getAll(scope)
  return objects.filter(
    (object) =>
      object.properties['type'].type === 'select' &&
      object.properties['type'].select?.name === 'Post'
  )
}

export const getPostsAndPieces = async (
  scope: ApiScope.Home | ApiScope.Archive | ApiScope.Draft
) => {
  const objects = await getAll(scope)
  return {
    posts: objects.filter(
      (object) =>
        object.properties['type'].type === 'select' &&
        object.properties['type'].select?.name === 'Post'
    ),
    pieces: objects.filter(
      (object) =>
        object.properties['type'].type === 'select' &&
        object.properties['type'].select?.name === 'Piece'
    ),
  }
}

export const getWidgets = async () => {
  const objects = await getAll(ApiScope.Home)
  return objects.filter(
    (object) =>
      object.properties['type'].type === 'select' &&
      object.properties['type'].select?.name === 'Widget'
  )
}
