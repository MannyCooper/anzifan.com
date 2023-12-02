import CONFIG from '@/blog.config'
import { LargeTitle } from '@/src/components/LargeTitle'
import { BlogLayoutPure } from '@/src/components/layout/BlogLayout'
import ContainerLayout from '@/src/components/post/ContainerLayout'
import { Section404 } from '@/src/components/section/Section404'
import { TagsCollection } from '@/src/components/section/TagsCollection'
import withNavFooter from '@/src/components/withNavFooter'
import { formatPosts } from '@/src/lib/blog/format/post'
import { getTagsInfo } from '@/src/lib/blog/format/tag'
import { withNavFooterStaticProps } from '@/src/lib/blog/withNavFooterStaticProps'
import { getPostsAndPieces } from '@/src/lib/notion/getBlogData'
import { addSubTitle } from '@/src/lib/util'
import {
  NextPageWithLayout,
  Page,
  SharedNavFooterStaticProps,
  Tag,
} from '@/src/types/blog'
import { ApiScope } from '@/src/types/notion'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'

const { TAG } = CONFIG.DEFAULT_SPECIAL_PAGES

export const getStaticProps: GetStaticProps = withNavFooterStaticProps(
  async (
    _context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    const slug = TAG
    addSubTitle(sharedPageStaticProps.props, slug)
    const { posts } = await getPostsAndPieces(ApiScope.Archive)
    const pages = sharedPageStaticProps.props.navPages
    const page = pages.find((page) => page.slug === slug) ?? null
    const formattedPosts = await formatPosts(posts)
    const tags = getTagsInfo(formattedPosts)

    return {
      props: {
        ...sharedPageStaticProps.props,
        page,
        tags,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    }
  }
)

const Tags: NextPage<{
  page: Page
  tags: Tag[]
}> = ({ page, tags }) => {
  if (!page) return <Section404 />

  const { title } = page
  return (
    <ContainerLayout>
      <LargeTitle title={title} />
      <TagsCollection tags={tags} />
    </ContainerLayout>
  )
}

const withNavPage = withNavFooter(Tags)

;(withNavPage as NextPageWithLayout).getLayout = (page) => (
  <BlogLayoutPure>{page}</BlogLayoutPure>
)

export default withNavPage
