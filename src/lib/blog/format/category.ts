import { Category, Post } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'

export const getAllCategories = (posts: Post[]): Category[] => {
  const categories: Category[] = []
  posts.forEach((post: Post) => {
    if (
      !categories.some((category: Category) => category.id === post.category.id)
    ) {
      categories.push(post.category)
    }
  })
  return categories
}

export const getCategoriesCount = (posts: Post[]): Record<string, number> => {
  const counts: Record<string, number> = {}
  posts.forEach((post: Post) => {
    if (counts[post.category.id] == null) {
      counts[post.category.id] = 0
    }
    counts[post.category.id] += 1
  })
  return counts
}

export const getCategoriesInfo = (posts: Post[]) => {
  const categories = getAllCategories(posts)
  const counts = getCategoriesCount(posts)

  categories.sort((a, b) =>
    counts[a.id] > counts[b.id] ? -1 : counts[a.id] < counts[b.id] ? 1 : 0
  )

  return categories.map((category: Category) => {
    return {
      ...category,
      count: counts[category.id],
    }
  })
}

export const initialCategory: Category = {
  id: 'all_categories',
  name: 'All Categories',
  color: 'gray' as ApiColor,
}
