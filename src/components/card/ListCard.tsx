import { classNames } from '@/src/lib/util'
import { Post } from '@/src/types/blog'
import Link from 'next/link'
import { PostCategory, PostImage, PostTime } from './CardInfo'

export const ListCardPlain = ({ post }: { post: Post }) => {
  const { title, slug, cover, date, category } = post

  return (
    <Link
      className="flex flex-row items-center w-full select-none group"
      href="/post/[slug]"
      as={`/post/${slug}`}
    >
      <div className="h-[6.5rem] w-[6.5rem] shrink-0 overflow-hidden rounded-2xl md:h-[8.25rem] md:w-[8.25rem]">
        <div
          className={`relative h-full w-full rotate-0 transform overflow-hidden rounded-2xl filter transition duration-500 ease-in-out group-hover:brightness-90`}
        >
          <PostImage
            cover={cover}
            alt={title}
            className="overflow-hidden transition-all duration-500 ease-in-out opacity-100 transform-gpu rounded-2xl group-hover:rotate-0 group-hover:opacity-90 group-hover:active:scale-105 mobile-hover:group-hover:scale-105"
          />
        </div>
      </div>
      <div className="flex-grow flex-shrink-0 pl-4 basis-0 md:pl-6">
        <PostCategory category={category} />
        <p className="font-semibold leading-5 text-black line-clamp-3 dark:text-white">
          {title}
        </p>
        <PostTime date={date.created} />
      </div>
    </Link>
  )
}

export const ListCardWide = ({ post }: { post: Post }) => {
  const { title, slug, cover, date, category } = post

  return (
    <li
      data-aos="fade-up"
      className={classNames(
        'group mb-8 w-full',
        "list-none before:mb-8 before:block before:h-[1px] before:flex-shrink-0 before:flex-grow-0 before:select-none before:bg-neutral-200 before:text-transparent before:content-[''] dark:before:bg-neutral-700"
      )}
    >
      <Link
        className="flex flex-row items-center"
        href="/post/[slug]"
        as={`/post/${slug}`}
      >
        <div className="aspect-square h-[6.5rem] shrink-0 overflow-hidden rounded-2xl md:aspect-video md:h-[9.25rem] lg:h-[10.375rem]">
          <div
            className={`relative h-full w-full rotate-0 transform overflow-hidden rounded-2xl filter transition duration-500 ease-in-out group-hover:brightness-90`}
          >
            <PostImage
              cover={cover}
              alt={title}
              className="overflow-hidden transition-all duration-500 ease-in-out border opacity-100 transform-gpu rounded-2xl border-neutral-100 group-hover:rotate-0 group-hover:opacity-90 group-hover:active:scale-105 dark:border-neutral-900 mobile-hover:group-hover:scale-105"
            />
          </div>
        </div>
        <div className="flex-grow flex-shrink-0 pl-4 basis-0 md:pl-8">
          <PostCategory category={category} />
          <p className="mt-1 text-lg font-semibold leading-5 line-clamp-3 md:mt-2 md:text-xl lg:text-2xl">
            {title}
          </p>
          <PostTime date={date.created} />
        </div>
      </Link>
    </li>
  )
}
