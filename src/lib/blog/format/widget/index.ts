import { getAllBlocks } from '@/src/lib/notion/getBlocks'
import { BlogStats, Widget } from '@/src/types/blog'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { supportedWidgetsMap } from '../../supportedWidgetsMap'
import { formatBlocks } from '../block'
import { getFormattedChildrenDatabase } from '../childrenDatabase'
import { formatPosts } from '../post'

export async function preFormatWidgets(
  widgets: PageObjectResponse[]
): Promise<Widget[]> {
  const formattedPosts = await formatPosts(widgets)
  return formattedPosts.map((post) => {
    return {
      id: post.slug,
      databaseId: post.id,
      properties: {
        title: post.title,
        slug: post.slug,
        cover: post.cover,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
        tags: post.tags,
        options: post.options,
      },
    }
  })
}

export async function formatWidgets(
  preFormattedWidgets: Widget[],
  blogStats: BlogStats
) {
  const formattedWidgets = {}
  for (const widget of preFormattedWidgets) {
    const formattedWidget = await formatWidget(widget, blogStats)
    Object.assign(formattedWidgets, { [widget.id]: formattedWidget })
  }
  return formattedWidgets
}

async function formatWidget(widget: Widget, blogStats: BlogStats) {
  let formatFn, database
  try {
    formatFn = supportedWidgetsMap[widget.id].formatFn
    database = supportedWidgetsMap[widget.id].database
  } catch (e) {
    console.error(`Widget ${widget.id} not supported`)
    return null
  }
  if (database.length === 0) {
    return formatFn(widget.properties, blogStats)
  }
  const blocks = await getAllBlocks(widget.databaseId)
  const formattedBlocks = await formatBlocks(blocks)
  const data: { [id: string]: any } = {}

  for (const db of database) {
    const formattedDatabase = await getFormattedChildrenDatabase(
      formattedBlocks,
      db
    )
    const formattedData = formattedDatabase.reduce(
      (accumulator, { type, data }) => ({
        ...accumulator,
        [type]: data,
      }),
      {}
    )
    Object.assign(data, formattedData)
  }

  const formattedWidget = formatFn(widget.properties, blogStats, data)
  return formattedWidget
}
