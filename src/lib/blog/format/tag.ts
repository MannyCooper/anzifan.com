import { Post, Tag } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'

export const getAllTags = (posts: Post[]): Tag[] => {
  const tags: Tag[] = []
  posts.forEach((post: Post) => {
    post.tags.forEach((tag: Tag) => {
      if (!tags.some((t: Tag) => t.id === tag.id)) {
        tags.push(tag)
      }
    })
  })
  return tags
}

export const getTagsCount = (posts: Post[]): Record<string, number> => {
  const counts: Record<string, number> = {}
  posts.forEach((post: Post) => {
    post.tags.forEach((tag: Tag) => {
      if (counts[tag.id] == null) {
        counts[tag.id] = 0
      }
      counts[tag.id] += 1
    })
  })
  return counts
}

export const getTagsInfo = (posts: Post[]) => {
  const tags = getAllTags(posts)
  const counts = getTagsCount(posts)

  tags.sort((a, b) =>
    counts[a.id] > counts[b.id] ? -1 : counts[a.id] < counts[b.id] ? 1 : 0
  )

  return tags.map((tag: Tag) => {
    return {
      ...tag,
      count: counts[tag.id],
    }
  })
}

export const initialTag: Tag = {
  id: 'all_tags',
  name: 'All Tags',
  color: 'gray' as ApiColor,
}
