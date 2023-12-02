import CONFIG from '@/blog.config'
import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { ArchiveFilterType } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import Link from 'next/link'

const { ARCHIVE } = CONFIG.DEFAULT_SPECIAL_PAGES

export const TimelineButton = ({
  query,
  color,
}: {
  query?: ArchiveFilterType
  color?: ApiColor
}) => {
  const { tag, category } = query ?? {}
  return (
    <div className="w-full text-center">
      <Link
        href={
          query ? `/${ARCHIVE}?tag=${tag}&category=${category}` : `/${ARCHIVE}`
        }
      >
        <p
          className={classNames(
            'mt-6 inline-block rounded-full border-2 py-2 px-5 text-center transition duration-[400ms] ease-in-out lg:mt-10',
            color
              ? `${colorMap[(color + '_border') as ApiColor]} ${
                  colorMap[(color + '_background') as ApiColor]
                } ${
                  colorMap[color as ApiColor]
                } bg-opacity-0 hover:bg-opacity-100 hover:text-white
                dark:bg-opacity-0
                dark:hover:bg-opacity-100 dark:hover:text-black`
              : 'border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
          )}
        >
          {query ? '在时间线查看所有' : '查看时间线'}
        </p>
      </Link>
    </div>
  )
}
