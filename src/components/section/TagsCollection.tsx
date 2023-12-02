import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { Tag } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import Link from 'next/link'

const TagCard = ({
  id,
  name,
  color,
  count,
}: {
  id: string
  name: string
  color: ApiColor
  count: number
}) => {
  return (
    <Link href="/tag/[name]" as={`/tag/${id}`} key={id} data-aos="fade-up">
      <div
        className={classNames(
          colorMap[(color + '_background') as ApiColor],
          'flex transform items-center justify-between rounded-full bg-gradient-to-bl from-white/30 py-3  px-5 font-semibold text-white transition duration-200 ease-in-out hover:scale-95',
          'dark:bg-gradient-to-tr dark:from-black/30'
        )}
      >
        <p className="line-clamp-1"># {name}</p>
        <p
          className={`bg-white ${colorMap[color]} rounded-full px-1.5 text-center text-sm`}
        >
          {count}
        </p>
      </div>
    </Link>
  )
}

export const TagsCollection = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="grid grid-cols-2 gap-3 pb-4 my-8 md:grid-cols-3 lg:grid-cols-4 lg:pb-8">
      {tags.map((tag: Tag) =>
        TagCard({
          id: tag.id,
          name: tag.name,
          color: tag.color,
          count: tag.count || 0,
        })
      )}
    </div>
  )
}
