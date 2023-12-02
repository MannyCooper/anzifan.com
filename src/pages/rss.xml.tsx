import { getPosts } from '@/src/lib/notion/getBlogData'
import { Feed } from 'feed'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { formatPosts } from '../lib/blog/format/post'
import { ApiScope } from '../types/notion'
import { Post } from '../types/blog'

const feed = new Feed({
  title: '可可托海没有海的RSS',
  description: '李大毛没有猫的个人网站',
  id: 'https://darmau.design/',
  link: 'https://darmau.design/',
  language: 'zh-CN',
  image: '/img/default-cover.jpg',
  favicon: '/img/logo.svg',
  feedLinks: {
    RSS2: 'https://darmau.design/rss.xml',
  },
  copyright: `©${new Date().getFullYear()} 李大毛`,
  author: {
    name: '李大毛',
    email: 'contact@darmau.design',
    link: 'https://darmau.design/',
  },
})

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  const { res } = context
  feed.items = []

  const posts = await getPosts(ApiScope.Archive)
  const formattedPosts = await formatPosts(posts)

  

  formattedPosts.forEach((post: Post) => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: `https://anzifan.com/${post.slug}`,
      description: post.excerpt,
      content: post.,
      author: [
        {
          name: '李大毛',
          email: 'contact@darmau.design',
          link: 'https://darmau.design/',
        },
      ],
      contributor: [
        {
          name: '李大毛',
          email: 'contact@darmau.design',
          link: 'https://darmau.design/',
        },
      ],
      date: new Date(article.attributes.publishDate),
      image: article.attributes.cover.data.attributes.url,
    })
  })

  const cacheMaxAgeUntilStaleSeconds = 5
  const cacheMaxAgeStaleDataReturnSeconds = 30
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
  )

  res.setHeader('Content-Type', 'text/xml')
  res.write(feed.rss2())
  res.end()

  return { props: {} }
}

export default function RSS() {}
