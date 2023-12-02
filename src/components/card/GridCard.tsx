import { classNames } from '@/src/lib/util'
import { Post } from '@/src/types/blog'
import Link from 'next/link'
import { PostCategory, PostImage, PostTime } from './CardInfo'

type GridCardProps = {
  post: Post
  size: 'small' | 'medium' | 'large'
}

const SIZE = {
  large: {
    card: classNames(
      'w-full h-[29.25rem]',
      'md:flex-row md:h-[16.25rem]',
      'lg:h-[22.5rem]'
    ),
    image: classNames('h-3/4', 'md:h-full md:w-[28.75rem]', 'lg:w-[40rem]'),
    title: classNames(
      'line-clamp-2 text-2xl',
      'md:text-xl md:leading-tight md:line-clamp-3',
      'lg:text-3xl'
    ),
  },
  medium: {
    card: 'h-[26.75rem]',
    image: 'h-3/5',
    title: 'text-2xl leading-tight line-clamp-2',
  },
  small: {
    card: 'h-[22.5rem] md:h-[21.25rem]',
    image: 'h-3/5 md:h-[5/9]',
    title: 'line-clamp-2 text-xl leading-tight md:text-lg md:leading-tight',
  },
}

const GridCard = ({ post, size }: GridCardProps) => {
  const { title, slug, cover, date, category } = post

  return (
    <Link
      href={{
        pathname: '/post/[slug]',
        query: {
          slug: slug,
        },
      }}
    >
      <div
        className={classNames(
          'group relative flex transform-gpu cursor-pointer select-none flex-col overflow-hidden rounded-3xl bg-white shadow-card shadow-neutral-200 transition duration-500 ease-in-out hover:rotate-0 hover:active:scale-95 mobile-hover:hover:scale-95',
          'md:shadow-none md:hover:shadow-card',
          'dark:bg-neutral-900 dark:shadow-none dark:hover:shadow-none',
          SIZE[size].card
        )}
      >
        <header
          className={classNames(
            'relative transition duration-500 ease-in-out md:filter md:group-hover:brightness-90',
            SIZE[size].image
          )}
        >
          <PostImage
            cover={cover}
            alt={title}
            className={
              'opacity-100 transition-all duration-500 ease-in-out md:group-hover:scale-105 md:group-hover:opacity-90'
            }
          />
        </header>
        <div className="z-10 flex flex-col justify-between flex-1 p-6 transition duration-500 ease-in-out bg-white dark:bg-neutral-900">
          <article className="flex flex-col items-start justify-between">
            <PostCategory category={category} />
            <h2
              className={`${SIZE[size].title} font-bold text-black transition duration-500 ease-in-out dark:text-white`}
            >
              {title}
            </h2>
          </article>
          <PostTime date={date.created} />
        </div>
      </div>
    </Link>
  )
}

export default GridCard
