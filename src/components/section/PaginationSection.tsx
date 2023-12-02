import Link from 'next/link'
import { useMemo } from 'react'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io'
import { classNames } from '../../lib/util'
import { ArchiveFilterType } from '../../types/blog'

export const PaginationSection = ({
  currentPage,
  currentQuery,
  totalPages,
  basePath,
}: {
  currentPage: number
  currentQuery?: ArchiveFilterType
  totalPages: number
  basePath: string
}) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  const searchParams = useMemo(() => {
    const searchParams = new URLSearchParams()
    if (currentQuery?.category) {
      searchParams.append('category', currentQuery.category)
    }
    if (currentQuery?.tag) {
      searchParams.append('tag', currentQuery.tag)
    }
    return searchParams.toString()
  }, [currentQuery])

  const prevPage = useMemo(() => {
    let prevPage =
      currentPage === 1 ? `/${basePath}` : `/${basePath}/${currentPage - 1}`
    if (searchParams) {
      prevPage += `?${searchParams}`
    }
    return prevPage
  }, [currentPage, basePath, searchParams])

  const nextPage = useMemo(() => {
    let nextPage = `/${basePath}/${currentPage + 1}`
    if (searchParams) {
      nextPage += `?${searchParams}`
    }
    return nextPage
  }, [currentPage, basePath, searchParams])

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => {
      let href = i === 0 ? `/${basePath}` : `/${basePath}/${i + 1}`
      if (searchParams) {
        href += '?' + searchParams
      }
      return {
        href,
        isActive: i + 1 === currentPage,
      }
    })
  }, [totalPages, basePath, searchParams, currentPage])

  return (
    <div data-aos="fade-up" className="flex items-center justify-between my-10">
      {!isFirst && (
        <Link href={prevPage}>
          <IoIosArrowDropleftCircle
            className="text-blue-light dark:text-blue-dark"
            size={40}
          />
        </Link>
      )}
      <div className="flex space-x-2 overflow-scroll">
        {pages.map(({ href, isActive }, i) => (
          <Link
            href={href}
            key={`pagination-number${i + 1}`}
            className={classNames(
              'flex aspect-square h-8 w-8 items-center justify-center rounded-full text-lg font-semibold text-white dark:text-black',
              isActive
                ? 'bg-blue-light dark:bg-blue-dark'
                : 'bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-400'
            )}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      {!isLast && (
        <Link href={nextPage}>
          <IoIosArrowDroprightCircle
            className="text-blue-light dark:text-blue-dark"
            size={40}
          />
        </Link>
      )}
    </div>
  )
}
