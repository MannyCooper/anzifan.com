import CONFIG from '@/blog.config'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { BlockRender } from '../components/blocks/BlockRender'
import { Empty } from '../components/Empty'
import { LargeTitle } from '../components/LargeTitle'
import { BlogLayoutPure } from '../components/layout/BlogLayout'
import ContainerLayout from '../components/post/ContainerLayout'
import { Section404 } from '../components/section/Section404'
import withNavFooter from '../components/withNavFooter'
import { formatBlocks } from '../lib/blog/format/block'
import { formatPages } from '../lib/blog/format/page'
import { withNavFooterStaticProps } from '../lib/blog/withNavFooterStaticProps'
import { getAllBlocks } from '../lib/notion/getBlocks'
import { getPages } from '../lib/notion/getBlogData'
import { addSubTitle } from '../lib/util'
import {
  NextPageWithLayout,
  Page,
  SharedNavFooterStaticProps,
} from '../types/blog'
import { BlockResponse } from '../types/notion'

const specialPages = Object.values(CONFIG.DEFAULT_SPECIAL_PAGES)

export const getStaticPaths = async () => {
  const pages = await getPages()
  const formattedPages = formatPages(pages)
  const paths = formattedPages
    .map((page) => ({
      params: { page: page.slug },
    }))
    .filter((page) => !specialPages.includes(page.params?.page as string))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = withNavFooterStaticProps(
  async (
    context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    const slug = context.params?.page as string
    addSubTitle(sharedPageStaticProps.props, slug)
    const page =
      sharedPageStaticProps.props.navPages.find((page) => page.slug === slug) ??
      null

    if (!page) {
      return {
        props: {
          ...sharedPageStaticProps.props,
          page: null,
          blocks: [],
        },
        revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
      }
    }

    const blocks = await getAllBlocks(page?.id ?? '')
    const formattedBlocks = await formatBlocks(blocks)

    return {
      props: {
        ...sharedPageStaticProps.props,
        page: page,
        blocks: formattedBlocks,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    }
  }
)

const Page: NextPage<{
  page: Page
  blocks: BlockResponse[]
}> = ({ page, blocks }) => {
  if (!page) return <Section404 />

  const { title } = page

  return (
    <>
      <ContainerLayout>
        <LargeTitle className="mb-4" title={title} />
        {blocks.length > 0 ? (
          <div className="px-8 py-4 break-words bg-white rounded-2xl dark:bg-neutral-900">
            <BlockRender blocks={blocks} />
          </div>
        ) : (
          <Empty />
        )}
      </ContainerLayout>
    </>
  )
}

;(Page as NextPageWithLayout).getLayout = (page) => {
  return <BlogLayoutPure>{page}</BlogLayoutPure>
}

export default withNavFooter(Page)
