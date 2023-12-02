import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { Category } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import Link from 'next/link'

const CategoryCard = ({
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
    <Link
      className="transition duration-200 ease-in-out transform select-none hover:scale-95"
      href={`/category/${id}`}
      key={id}
    >
      <div
        data-aos="zoom-in"
        className={classNames(
          `aspect-square ${
            colorMap[(color + '_background') as ApiColor]
          } relative z-0 overflow-hidden rounded-xl p-3 font-semibold text-white md:p-4`,
          'before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-full before:rounded-xl before:bg-gradient-to-l  before:to-transparent before:text-transparent before:opacity-50 before:content-[""]',
          'before:from-white dark:before:from-black',
          color === 'default' ? 'dark:before:bg-gray-400' : ''
        )}
      >
        <div className="flex flex-row items-center justify-between text-normal md:text-lg lg:text-xl">
          <p className="z-20">{name}</p>
          <p
            className={`z-20 bg-white ${colorMap[color]} rounded-full px-2 text-center`}
          >
            {count}
          </p>
        </div>
        <p
          className={classNames(
            `absolute left-0 bottom-0 z-0 w-full whitespace-nowrap px-3 py-2 text-8xl font-semibold brightness-95 filter md:px-4 md:py-3 md:text-8xl`,
            color === 'gray'
              ? `${colorMap[color]} opacity-10`
              : colorMap[color],
            color === 'default'
              ? `${colorMap[color]} dark:opacity-30`
              : colorMap[color]
          )}
        >
          {name}
        </p>
      </div>
    </Link>
  )
}

export const CategoriesCollection = ({
  categories,
}: {
  categories: Category[]
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 pb-4 my-8 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:pb-8">
      {categories.map((cate: Category) =>
        CategoryCard({
          id: cate.id,
          name: cate.name,
          color: cate.color,
          count: cate.count ?? 0,
        })
      )}
    </div>
  )
}
