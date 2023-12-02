import CONFIG from '@/blog.config'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { BlockRender } from '../components/blocks/BlockRender'
import { LargeTitle } from '../components/LargeTitle'
import ContainerLayout from '../components/post/ContainerLayout'
import { WidgetCollection } from '../components/section/WidgetCollection'
import withNavFooter from '../components/withNavFooter'
import { formatBlocks } from '../lib/blog/format/block'
import { formatWidgets, preFormatWidgets } from '../lib/blog/format/widget'
import getBlogStats from '../lib/blog/getBlogStats'
import { withNavFooterStaticProps } from '../lib/blog/withNavFooterStaticProps'
import { getAllBlocks } from '../lib/notion/getBlocks'
import { getWidgets } from '../lib/notion/getBlogData'
import { addSubTitle } from '../lib/util'
import { SharedNavFooterStaticProps } from '../types/blog'
import { BlockResponse } from '../types/notion'

const { ABOUT } = CONFIG.DEFAULT_SPECIAL_PAGES

const About: NextPage<{
  blocks: BlockResponse[]
  title: string
  widgets: {
    [key: string]: any
  }
}> = ({ blocks, title, widgets }) => {
  return (
    <>
      <ContainerLayout>
        <LargeTitle className="mb-4" title={title} />
        <div className="break-words rounded-2xl bg-white px-8 py-4 dark:bg-neutral-900">
          <BlockRender blocks={blocks} />
        </div>
        <div className="mt-4">
          <WidgetCollection widgets={widgets} />
        </div>
      </ContainerLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = withNavFooterStaticProps(
  async (
    _context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    addSubTitle(sharedPageStaticProps.props, ABOUT)
    const page =
      sharedPageStaticProps.props.navPages.find(
        (page) => page.slug === ABOUT
      ) ?? null
    const blocks = await getAllBlocks(page?.id ?? '')
    const formattedBlocks = await formatBlocks(blocks)

    const blogStats = await getBlogStats()
    const widgets = await getWidgets()
    const preFormattedWidgets = await preFormatWidgets(widgets)
    const formattedWidgets = await formatWidgets(preFormattedWidgets, blogStats)

    return {
      props: {
        ...sharedPageStaticProps.props,
        blocks: formattedBlocks,
        title: page?.title,
        widgets: formattedWidgets,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    }
  }
)

const withNavPage = withNavFooter(About)

export default withNavPage
