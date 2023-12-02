import { getAllCategories } from '@/src/lib/blog/format/category'
import { formatPosts } from '@/src/lib/blog/format/post'
import { BlogStats, FixedLengthArray } from '@/src/types/blog'
import { ApiScope } from '@/src/types/notion'
import { getPostsAndPieces } from '../notion/getBlogData'
import { getAllTags } from './format/tag'

export default async function getBlogStats(): Promise<BlogStats> {
  const { posts, pieces } = await getPostsAndPieces(ApiScope.Archive)

  const postsNumber = posts.length
  const piecesNumber = pieces.length

  const formattedPosts = await formatPosts(posts)
  const tagsNumber = getAllTags(formattedPosts).length
  const categoriesNumber = getAllCategories(formattedPosts).length

  const timeline: FixedLengthArray<24, number> = Array(24).fill(
    0
  ) as FixedLengthArray<24, number>

  const now = new Date()

  for (const post of formattedPosts) {
    const postDate = new Date(post.date.created)
    const periodsAgo = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24) / (365 / 24)
    )
    if (periodsAgo < 24) {
      timeline[23 - periodsAgo]++
    }
  }

  return {
    posts: postsNumber,
    pieces: piecesNumber,
    tags: tagsNumber,
    categories: categoriesNumber,
    timeline,
  }
}
