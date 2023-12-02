import CONFIG from '@/blog.config'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { BlockRender } from '../components/blocks/BlockRender'
import { LargeTitle } from '../components/LargeTitle'
import { BlogLayoutGradient } from '../components/layout/BlogLayout'
import ContainerLayout from '../components/post/ContainerLayout'
import CommentSection from '../components/section/CommentSection'
import FriendsCollection from '../components/section/FriendsCollection'
import withNavFooter from '../components/withNavFooter'
import { formatBlocks } from '../lib/blog/format/block'
import { getFormattedChildrenDatabase } from '../lib/blog/format/childrenDatabase'
import { withNavFooterStaticProps } from '../lib/blog/withNavFooterStaticProps'
import { getAllBlocks } from '../lib/notion/getBlocks'
import { addSubTitle } from '../lib/util'
import {
  Friend,
  NextPageWithLayout,
  SharedNavFooterStaticProps,
} from '../types/blog'
import { BlockResponse } from '../types/notion'

const { FREINDS } = CONFIG.DEFAULT_SPECIAL_PAGES

const Freinds: NextPage<{
  blocks: BlockResponse[]
  friendsDatabase: {
    type: 'Friends'
    data: Friend[]
  }
  title: string
}> = ({ blocks, friendsDatabase, title }) => {
  return (
    <>
      <ContainerLayout>
        <LargeTitle className="mb-4" title={title} />
        <div className="break-words">
          <BlockRender blocks={blocks} />
        </div>
        <FriendsCollection friends={friendsDatabase.data} />
        <p className="mt-12 -mb-4 text-center text-neutral-400">
          👇扣1立即交友(不是)👇
        </p>
        <CommentSection />
      </ContainerLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = withNavFooterStaticProps(
  async (
    _context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    addSubTitle(sharedPageStaticProps.props, FREINDS)
    const page =
      sharedPageStaticProps.props.navPages.find(
        (page) => page.slug === FREINDS
      ) ?? null
    const blocks = await getAllBlocks(page?.id ?? '')
    const formattedBlocks = await formatBlocks(blocks)
    const formattedChildDatabase = await getFormattedChildrenDatabase(
      formattedBlocks
    )
    const friendsDatabase =
      formattedChildDatabase.find((database) => database.type === 'Friends') ??
      null

    return {
      props: {
        ...sharedPageStaticProps.props,
        title: page?.title,
        blocks: formattedBlocks,
        friendsDatabase: friendsDatabase,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    }
  }
)

const withNavPage = withNavFooter(Freinds)

;(withNavPage as NextPageWithLayout).getLayout = (page) => {
  return <BlogLayoutGradient>{page}</BlogLayoutGradient>
}

export default withNavPage
