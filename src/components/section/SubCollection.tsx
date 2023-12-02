import { initialCategory } from '@/src/lib/blog/format/category'
import { initialTag } from '@/src/lib/blog/format/tag'
import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { Category, Post, Tag, Title } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import { BiChevronLeft } from 'react-icons/bi'
import { LargeTitle } from '../LargeTitle'
import ContainerLayout from '../post/ContainerLayout'
import PostGrid from '../PostGrid'
import { TimelineButton } from './TimelineButton'

export const SubCollection = ({
  item,
  posts,
  subTitle,
  type,
}: {
  item: Tag | Category
  posts: Post[]
  subTitle: Title
  type: 'tag' | 'category'
}) => {
  const { name, color: tagColor, count, id } = item
  const { text, slug, color } = subTitle
  const title = {
    text: `${text}: ${name} 🌟`,
    color: tagColor,
  }

  const subtitle = {
    text: type === 'tag' ? 'Return Tags' : 'Return Categories',
    slug: `/${slug}`,
    color: color,
    icon: BiChevronLeft,
  }

  const CountComponent = (
    <div className="flex items-center">
      <div
        className={classNames(
          'flex aspect-square h-8 items-center justify-center rounded-full text-lg font-bold text-white dark:text-black md:h-10',
          colorMap[(tagColor + '_background') as ApiColor]
        )}
      >
        {count}
      </div>
    </div>
  )

  let query = {}
  if (type === 'tag') {
    query = { tag: id, category: initialCategory.id }
  }
  if (type === 'category') {
    query = { category: id, tag: initialTag.id }
  }

  return (
    <ContainerLayout>
      <LargeTitle
        title={title}
        subtitle={subtitle}
        subComponent={CountComponent}
        colorTitile
      />
      <PostGrid posts={posts} narrow />
      <div className="pb-2 md:pb-8">
        <TimelineButton query={query} color={item.color} />
      </div>
    </ContainerLayout>
  )
}
