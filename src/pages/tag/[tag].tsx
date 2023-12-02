import CONFIG from '@/blog.config'
import BlogLayout, {
  BlogLayoutWithColor,
} from '@/src/components/layout/BlogLayout'
import { Section404 } from '@/src/components/section/Section404'
import { SubCollection } from '@/src/components/section/SubCollection'
import withNavFooter from '@/src/components/withNavFooter'
import { formatPosts } from '@/src/lib/blog/format/post'
import { getAllTags } from '@/src/lib/blog/format/tag'
import { withNavFooterStaticProps } from '@/src/lib/blog/withNavFooterStaticProps'
import { addSubTitle, getSubTitleInfo } from '@/src/lib/util'
import {
  NextPageWithLayout,
  Post,
  SharedNavFooterStaticProps,
  Tag,
  Title,
} from '@/src/types/blog'
import { ApiScope } from '@/src/types/notion'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { getPosts } from '../../lib/notion/getBlogData'

const { TAG } = CONFIG.DEFAULT_SPECIAL_PAGES

export const getStaticPaths = async () => {
  const posts = await getPosts(ApiScope.Archive)
  const formattedPosts = await formatPosts(posts)
  const tags = getAllTags(formattedPosts)
  const paths = tags.map((tag) => ({
    params: { tag: tag.id },
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = withNavFooterStaticProps(
  async (
    context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    const slug = TAG
    const subTitle = getSubTitleInfo(slug, sharedPageStaticProps.props)
    addSubTitle(sharedPageStaticProps.props, '', subTitle)
    const posts = await getPosts(ApiScope.Archive)
    const formattedPosts = await formatPosts(posts)
    const tagId = context.params?.tag as string
    const postsByTag = formattedPosts.filter((post) =>
      post.tags.map((t) => t.id).includes(tagId)
    )
    const tag = postsByTag[0].tags.find((t) => t.id === tagId)

    return {
      props: {
        ...sharedPageStaticProps.props,
        posts: postsByTag,
        tag,
        subTitle,
      },
      revalidate: 60,
    }
  }
)

const TagPage: NextPage<{ tag: Tag; posts: Post[]; subTitle: Title }> = ({
  tag,
  posts,
  subTitle,
}) => {
  if (!tag) return <Section404 />

  tag.count = posts.length

  return (
    <SubCollection item={tag} posts={posts} subTitle={subTitle} type={'tag'} />
  )
}

const withNavPage = withNavFooter(TagPage, true)

;(withNavPage as NextPageWithLayout).getLayout = (page) => {
  if (!page.props.tag) return <BlogLayout>{page}</BlogLayout>
  const color = page.props.tag.color
  return color !== 'gray' && color !== 'default' ? (
    <BlogLayoutWithColor color={color}>{page}</BlogLayoutWithColor>
  ) : (
    <BlogLayout>{page}</BlogLayout>
  )
}

export default withNavPage
