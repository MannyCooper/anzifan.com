import CONFIG from '@/blog.config'
import { Listbox, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { IoFilterCircleOutline } from 'react-icons/io5'
import usePush from '../hooks/usePush'
import { useScreenSize } from '../hooks/useScreenSize'
import { useTextWidth } from '../hooks/useTextWidth'
import { initialCategory } from '../lib/blog/format/category'
import { initialTag } from '../lib/blog/format/tag'
import { colorMap } from '../lib/colors'
import { classNames } from '../lib/util'
import { Category, Tag } from '../types/blog'
import { ApiColor } from '../types/notion'
import { ContainerLayoutFull } from './post/ContainerLayout'

const FILTER_WIDTH = 'w-full md:w-40 md:w-48'
const { ARCHIVE } = CONFIG.DEFAULT_SPECIAL_PAGES

type FilterItemProps = {
  selected: string
  setSelected: (id: string) => void
  sticky: boolean
  setSticky: (any: boolean) => void
  list: (Tag | Category)[]
}

type ResetButtonProps = {
  selectedTag: string
  initialTag: Tag
  selectedCategory: string
  initialCategory: Category
  setSelectedTag: (id: string) => void
  setSelectedCategory: (id: string) => void
}

const ResetButton = ({
  selectedTag,
  initialTag,
  selectedCategory,
  initialCategory,
  setSelectedTag,
  setSelectedCategory,
}: ResetButtonProps) => {
  return selectedTag !== initialTag.id ||
    selectedCategory !== initialCategory.id ? (
    <button
      onClick={() => {
        setSelectedTag(initialTag.id)
        setSelectedCategory(initialCategory.id)
      }}
      className="text-sm font-medium text-blue-light dark:text-blue-dark"
    >
      Reset
    </button>
  ) : null
}

const FilterItem = ({
  selected,
  setSelected,
  sticky,
  setSticky,
  list,
}: FilterItemProps) => {
  const width = useTextWidth(list[0].name)

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={FILTER_WIDTH}>
        <Listbox.Button
          onClick={() => setSticky(!sticky)}
          className={({ open }) =>
            classNames(
              FILTER_WIDTH,
              'relative h-10 bg-white py-2 px-4 text-left font-semibold text-black outline-none transition-all dark:bg-black dark:text-white md:text-sm',
              open ? 'rounded-t-xl shadow-lg' : 'rounded-xl'
            )
          }
          style={{ minWidth: width + 50 }}
        >
          <span className="flex items-center justify-start truncate gap-x-2">
            {list.find((item) => item.id === selected)?.name}
            {selected !== list[0].id && (
              <div
                className={classNames(
                  colorMap[
                    (list.find((item) => item.id === selected)?.color +
                      '_background') as ApiColor
                  ],
                  'h-3 w-3 rounded-full '
                )}
              />
            )}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-neutral-400">
              <FaAngleDown size={16} />
            </span>
          </span>
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options
            className={classNames(
              FILTER_WIDTH,
              'absolute z-30 max-h-52 overflow-auto rounded-b-xl border-t-[1px] border-neutral-100 bg-white py-1 text-base shadow-lg outline-none dark:border-neutral-900 dark:bg-black md:text-sm'
            )}
            style={{ minWidth: width + 50 }}
          >
            {list.map((item, index) => (
              <Listbox.Option
                key={item.id}
                disabled={item.disabled}
                className={({ selected, disabled }) =>
                  classNames(
                    'text-gray-900 dark:text-gray-100',
                    'relative cursor-pointer select-none py-2 px-2',
                    selected
                      ? 'mx-2 rounded-lg bg-background-light dark:bg-background-dark'
                      : 'mx-2',
                    disabled ? 'cursor-default opacity-50' : ''
                  )
                }
                value={item.id}
              >
                {({ selected, active }) => (
                  <div className="flex items-center justify-between">
                    <span
                      className={classNames(
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                        active && !selected
                          ? 'text-blue-light'
                          : 'text-gray-900 dark:text-gray-100'
                      )}
                    >
                      {item.name}
                    </span>
                    {index === 0 && (
                      <span className="font-medium text-neutral-500">
                        {list.length - 1}
                      </span>
                    )}
                    {index !== 0 && (
                      <div
                        className={classNames(
                          colorMap[(item.color + '_background') as ApiColor],
                          'h-3 w-3 rounded-full '
                        )}
                      />
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export const ArchiveFilter = ({
  items,
}: {
  items: {
    tags: Tag[]
    categories: Category[]
  }
}) => {
  const { tags, categories } = items
  const tagsList = useMemo(() => [initialTag, ...tags], [tags])
  const categoryList = useMemo(
    () => [initialCategory, ...categories],
    [categories]
  )
  const [sticky, setSticky] = useState(false)
  const [fold, setFold] = useState(true)

  const [selectedTag, setSelectedTag] = useState(tagsList[0].id)
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0].id)

  const lockRef = useRef(true)

  const { isMobile, isTablet } = useScreenSize()

  const router = useRouter()
  const push = usePush()

  useEffect(() => {
    if (selectedTag || selectedCategory) {
      setFold(false)
    }
  }, [selectedTag, selectedCategory])

  useEffect(() => {
    if (selectedTag || selectedCategory) {
      const tag = router.query.tag as string
      const category = router.query.category as string
      if (
        (tag || category) &&
        selectedTag === initialTag.id &&
        selectedCategory === initialCategory.id &&
        lockRef.current
      ) {
        lockRef.current = true
      }
      const unLock = setInterval(() => {
        lockRef.current = false
      }, 1000)

      const newQuery: {
        tag?: string
        category?: string
      } = {}
      if (selectedTag !== initialTag.id) {
        newQuery.tag = selectedTag
      }
      if (selectedCategory !== initialCategory.id) {
        newQuery.category = selectedCategory
      }
      if (!lockRef.current) {
        push({
          pathname: `/${ARCHIVE}`,
          query: newQuery,
        })
      } else {
        setSelectedTag(tag ?? initialTag.id)
        setSelectedCategory(category ?? initialCategory.id)
      }
      return () => {
        clearInterval(unLock)
      }
    }
  }, [
    push,
    router.query.category,
    router.query.tag,
    selectedCategory,
    selectedTag,
  ])

  return (
    <div
      className={classNames(
        'relative z-20 bg-background-light bg-opacity-70 backdrop-blur-lg backdrop-saturate-200 backdrop-filter dark:bg-background-dark dark:bg-opacity-70',
        sticky ||
          selectedTag !== initialTag.id ||
          selectedCategory !== initialCategory.id
          ? 'sticky top-[2.9rem]'
          : ''
      )}
    >
      <ContainerLayoutFull>
        <div
          className={classNames(
            'flex items-center justify-between gap-4  transition-all md:gap-6',
            (isMobile || isTablet) && fold ? 'h-8' : 'h-24 md:h-16'
          )}
        >
          <div
            className={classNames(
              'flex w-full flex-col justify-between md:w-auto md:flex-row md:items-center md:gap-6',
              (isMobile || isTablet) && fold ? '' : 'gap-4'
            )}
          >
            <div
              className="flex justify-between cursor-pointer md:cursor-default"
              onClick={() => {
                if (isMobile || isTablet) {
                  setFold(!fold)
                }
              }}
            >
              <div className="flex flex-row items-center text-lg font-medium gap-x-2 text-neutral-500">
                {(isMobile || isTablet) && <IoFilterCircleOutline size={20} />}
                <h3 className="select-none ">Filter</h3>
              </div>
              {(isMobile || isTablet) && (
                <ResetButton
                  selectedTag={selectedTag}
                  initialTag={initialTag}
                  selectedCategory={selectedCategory}
                  initialCategory={initialCategory}
                  setSelectedTag={setSelectedTag}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
            </div>
            <div
              className={classNames(
                'flex flex-row justify-between gap-4 transition-all duration-300 ease-in-out md:justify-start md:gap-6',
                (isMobile || isTablet) && fold
                  ? 'h-0 overflow-hidden'
                  : 'h-12 items-center'
              )}
            >
              <FilterItem
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                sticky={sticky}
                setSticky={setSticky}
                list={categoryList}
              />
              <FilterItem
                selected={selectedTag}
                setSelected={setSelectedTag}
                sticky={sticky}
                setSticky={setSticky}
                list={tagsList}
              />
            </div>
            {!isMobile && !isTablet && (
              <ResetButton
                selectedTag={selectedTag}
                initialTag={initialTag}
                selectedCategory={selectedCategory}
                initialCategory={initialCategory}
                setSelectedTag={setSelectedTag}
                setSelectedCategory={setSelectedCategory}
              />
            )}
          </div>
        </div>
      </ContainerLayoutFull>
    </div>
  )
}
