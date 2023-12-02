import CONFIG from '@/blog.config'
import { ArchiveFilter } from '@/src/components/ArchiveFilter'
import { Empty } from '@/src/components/Empty'
import { LargeTitle } from '@/src/components/LargeTitle'
import { BlogLayoutPure } from '@/src/components/layout/BlogLayout'
import { ContainerLayoutFull } from '@/src/components/post/ContainerLayout'
import { ArchiveCollection } from '@/src/components/section/ArchiveCollection'
import { PaginationSection } from '@/src/components/section/PaginationSection'
import { Section404 } from '@/src/components/section/Section404'
import withNavFooter from '@/src/components/withNavFooter'
import {
  getAllCategories,
  initialCategory,
} from '@/src/lib/blog/format/category'
import { formatPosts } from '@/src/lib/blog/format/post'
import { getAllTags, initialTag } from '@/src/lib/blog/format/tag'
import { withNavFooterStaticProps } from '@/src/lib/blog/withNavFooterStaticProps'
import { getPostsAndPieces } from '@/src/lib/notion/getBlogData'
import { addSubTitle, createTagCategoryMap } from '@/src/lib/util'
import {
  Category,
  NextPageWithLayout,
  Page,
  Post,
  SharedNavFooterStaticProps,
  Tag,
} from '@/src/types/blog'
import { ApiScope } from '@/src/types/notion'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const { ARCHIVE } = CONFIG.DEFAULT_SPECIAL_PAGES
const PER_COUNT = CONFIG.ARCHIVE_PER_COUNT

export const getStaticProps: GetStaticProps = withNavFooterStaticProps(
  async (
    _context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    const slug = ARCHIVE

    addSubTitle(sharedPageStaticProps.props, slug)
    const { posts, pieces } = await getPostsAndPieces(ApiScope.Archive)
    const pages = sharedPageStaticProps.props.navPages
    const page = pages.find((page) => page.slug === slug) ?? null
    const preFormattedPosts = await formatPosts([...posts, ...pieces])
    const formattedPosts = preFormattedPosts.sort(
      (a, b) =>
        Number(new Date(b.date.created)) - Number(new Date(a.date.created))
    )
    const tags = getAllTags(formattedPosts)
    const categories = getAllCategories(formattedPosts)
    const { tagCategoryMapById, categoryTagMapById } =
      createTagCategoryMap(formattedPosts)
    const contentCount = formattedPosts.length
    const pageCount = Math.ceil(contentCount / PER_COUNT)

    return {
      props: {
        ...sharedPageStaticProps.props,
        page,
        items: formattedPosts,
        tags,
        categories,
        pageCount,
        tagCategoryMapById,
        categoryTagMapById,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    }
  }
)

const Archive: NextPage<{
  page: Page
  items: Post[]
  tags: Tag[]
  categories: Category[]
  pageCount: number
  tagCategoryMapById: Record<string, string[]>
  categoryTagMapById: Record<string, string[]>
}> = ({
  page,
  items,
  tags,
  categories,
  pageCount,
  tagCategoryMapById,
  categoryTagMapById,
}) => {
  const router = useRouter()
  const [pageCountAfterFilter, setPageCountAfterFilter] = useState(pageCount)
  const [currentQuery, setCurrentQuery] = useState({})
  const [itemsAfterFilter, setItemsAfterFilter] = useState(items)

  useEffect(() => {
    if (router.query && currentQuery !== router.query) {
      setCurrentQuery(router.query)
    }
  }, [currentQuery, router.query])

  useEffect(() => {
    const tag = router.query.tag as string
    const category = router.query.category as string
    if (tag !== initialTag.id || category !== initialCategory.id) {
      const filteredItems = items.filter((item) => {
        if (
          tag &&
          tag !== initialTag.id &&
          !item.tags.map((tag) => tag.id).includes(tag)
        )
          return false
        if (
          category &&
          category !== initialCategory.id &&
          item.category.id !== category
        )
          return false
        return true
      })
      setItemsAfterFilter(filteredItems)
      setPageCountAfterFilter(
        Math.ceil(filteredItems.length / CONFIG.ARCHIVE_PER_COUNT)
      )
    }
  }, [items, router.query])

  useEffect(() => {
    if (router.query.tag === initialTag.id) {
      categories.map((category) => {
        category.disabled = false
      })
    }
    if (router.query.tag && router.query.tag !== initialTag.id) {
      categories.map((category) => {
        categoryTagMapById[category.id].includes(router.query.tag as string)
          ? (category.disabled = false)
          : (category.disabled = true)
      })
    }
  }, [categories, categoryTagMapById, router.query.tag])

  useEffect(() => {
    if (router.query.category === initialCategory.id) {
      tags.map((tag) => {
        tag.disabled = false
      })
    }
    if (router.query.category && router.query.category !== initialCategory.id) {
      tags.map((tag) => {
        tagCategoryMapById[tag.id].includes(router.query.category as string)
          ? (tag.disabled = false)
          : (tag.disabled = true)
      })
    }
  }, [router.query.category, tagCategoryMapById, tags])

  if (!page) return <Section404 />

  const { title } = page

  return (
    <>
      <ContainerLayoutFull>
        <LargeTitle title={title} />
      </ContainerLayoutFull>
      <ArchiveFilter
        items={{
          tags,
          categories,
        }}
      />
      <ContainerLayoutFull>
        {itemsAfterFilter.length > 0 ? (
          <ArchiveCollection items={itemsAfterFilter.slice(0, PER_COUNT)} />
        ) : (
          <Empty />
        )}
        {pageCountAfterFilter !== 0 && (
          <PaginationSection
            currentPage={1}
            currentQuery={currentQuery}
            totalPages={pageCountAfterFilter}
            basePath={ARCHIVE}
          />
        )}
      </ContainerLayoutFull>
    </>
  )
}

const withNavPage = withNavFooter(Archive)

;(withNavPage as NextPageWithLayout).getLayout = (page) => (
  <BlogLayoutPure>{page}</BlogLayoutPure>
)

export default withNavPage
