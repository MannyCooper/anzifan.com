import CONFIG from '@/blog.config'
import { BlockRender } from '@/src/components/blocks/BlockRender'
import { DraftDialog } from '@/src/components/DraftDialog'
import { BlogLayoutPure } from '@/src/components/layout/BlogLayout'
import ContentLayout from '@/src/components/layout/ContentLayout'
import PostFooter from '@/src/components/post/PostFooter'
import PostHeader from '@/src/components/post/PostHeader'
import PostMessage from '@/src/components/post/PostMessage'
import { Section404 } from '@/src/components/section/Section404'
import withNavFooter from '@/src/components/withNavFooter'
import { formatBlocks } from '@/src/lib/blog/format/block'
import { formatPosts } from '@/src/lib/blog/format/post'
import { withNavFooterStaticProps } from '@/src/lib/blog/withNavFooterStaticProps'
import { getAllBlocks } from '@/src/lib/notion/getBlocks'
import { getPosts } from '@/src/lib/notion/getBlogData'
import { addSubTitle } from '@/src/lib/util'
import {
  NextPageWithLayout,
  Post,
  SharedNavFooterStaticProps,
} from '@/src/types/blog'
import { ApiScope, BlockResponse } from '@/src/types/notion'
import { GetStaticPropsContext, NextPage } from 'next'

export const getStaticPaths = async () => {
  const posts = await getPosts(ApiScope.Draft)
  const formattedPosts = await formatPosts(posts)
  const paths = formattedPosts.map((post) => ({
    params: {
      post: post.slug,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = withNavFooterStaticProps(
  async (
    context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    const posts = await getPosts(ApiScope.Draft)
    const formattedPosts = await formatPosts(posts)
    const post = formattedPosts.find(
      (post) => post.slug === context.params?.post
    )

    let blocks: BlockResponse[] = []
    if (post) {
      blocks = await getAllBlocks(post.id)
      addSubTitle(sharedPageStaticProps.props, '', {
        text: 'Draft',
        color: 'gray',
        slug: post.slug,
      })
    }
    const formattedBlocks = await formatBlocks(blocks)

    return {
      props: {
        ...sharedPageStaticProps.props,
        post: post || null,
        blocks: formattedBlocks,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    }
  }
)

const PostPage: NextPage<{
  post: Post
  blocks: BlockResponse[]
}> = ({ post, blocks }) => {
  if (!post) {
    return <Section404 />
  }

  const enableDraftDialog = CONFIG.ENABLE_DRAFT_DIALOG

  return (
    <>
      <PostHeader post={post} blocks={blocks} />
      <ContentLayout>
        <PostMessage post={post} />
        <BlockRender blocks={blocks} />
        <PostFooter post={post} />
        {enableDraftDialog && <DraftDialog />}
      </ContentLayout>
    </>
  )
}

const withNavPage = withNavFooter(PostPage)

;(withNavPage as NextPageWithLayout).getLayout = (page) => (
  <BlogLayoutPure showBeian>{page}</BlogLayoutPure>
)

export default withNavPage
