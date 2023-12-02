import { colorMap } from '@/src/lib/colors'
import { classNames, formatDate } from '@/src/lib/util'
import { Category } from '@/src/types/blog'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ImageWithPlaceholder from '../image/ImageWithPlaceholder'

export const PostImage = ({
  cover,
  alt,
  className,
}: {
  cover: {
    light: {
      src: string
      info: {
        placeholder: string
        width: number
        height: number
      }
    }
    dark: {
      src: string
      info: {
        placeholder: string
        width: number
        height: number
      }
    }
  }
  alt: string
  className: string
}) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <ImageWithPlaceholder
        src={cover.light.src}
        width={cover.light.info.width}
        height={cover.light.info.height}
        alt={alt}
        className={classNames(
          className,
          resolvedTheme === 'dark' ? 'hidden' : 'block'
        )}
        blurDataURL={cover.light.info.placeholder}
      />
      <ImageWithPlaceholder
        src={cover.dark.src}
        width={cover.dark.info.width}
        height={cover.dark.info.height}
        alt={alt}
        className={classNames(
          className,
          resolvedTheme === 'dark' ? 'block' : 'hidden'
        )}
        blurDataURL={cover.dark.info.placeholder}
      />
    </>
  )
}

export const PostCategory = ({ category }: { category: Category }) => {
  const router = useRouter()

  const handleCategoryClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push({
      pathname: '/category/[slug]',
      query: {
        slug: category.id,
      },
    })
  }

  return (
    <p
      className={classNames(
        'leading-2 mb-2 text-xs font-bold line-clamp-1',
        colorMap[category.color]
      )}
      onClick={handleCategoryClick}
    >
      {category.name}
    </p>
  )
}

export const PostTime = ({ date }: { date: string }) => {
  return (
    <time
      className="block mt-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400"
      dateTime={date}
    >
      {formatDate(date)}
    </time>
  )
}
