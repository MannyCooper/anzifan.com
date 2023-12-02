import { classNames } from '@/src/lib/util'
import Link from 'next/link'
import { PartialPost } from '../../types/blog'
import { PostImage } from '../card/CardInfo'

const Navigation = ({
  post,
  navigation,
}: {
  post: PartialPost
  navigation: 'next' | 'previous'
}) => {
  const { slug, title, cover } = post
  const { href, label } =
    navigation === 'next'
      ? {
          href: `/post/${slug}`,
          label: 'Next',
        }
      : {
          href: `/post/${slug}`,
          label: 'Prev',
        }
  return (
    <Link
      href={href}
      className={classNames(
        'group relative flex h-28 w-full flex-col justify-end bg-neutral-50 px-4 py-3 dark:bg-neutral-900 sm:h-32',
        navigation === 'next' ? 'items-end' : 'items-start'
      )}
    >
      <p className="z-20 text-xl font-bold text-white sm:text-2xl">{label}</p>
      <p
        className={classNames(
          'z-20 overflow-hidden text-lg text-white sm:text-xl',
          'max-h-[28px] transition-all duration-500 ease-in-out line-clamp-2 group-hover:max-h-full',
          navigation === 'next' ? 'text-right' : 'text-left'
        )}
      >
        {title}
      </p>
      <div className="absolute bottom-0 left-0 z-10 w-full h-3/5 bg-gradient-to-t from-neutral-900/20" />
      <div
        className={`absolute left-0 top-0 h-full w-full rotate-0 transform overflow-hidden filter transition duration-500 ease-in-out group-hover:brightness-90`}
      >
        <PostImage
          cover={cover}
          alt={title}
          className="z-0 overflow-hidden transition-all duration-500 ease-in-out opacity-100 transform-gpu group-hover:rotate-0 group-hover:scale-105 group-hover:opacity-90 group-hover:active:scale-105 mobile-hover:group-hover:scale-105"
        />
      </div>
    </Link>
  )
}

const PostNavigation = ({
  navigation,
}: {
  navigation: {
    nextPost: PartialPost
    previousPost: PartialPost
  }
}) => {
  const { nextPost, previousPost } = navigation

  return (
    <div className="flex flex-col justify-between w-full my-4 overflow-hidden transform border rounded-3xl border-neutral-100 hover:rotate-0 dark:border-neutral-800 sm:flex-row">
      {nextPost && <Navigation post={nextPost} navigation={'previous'} />}
      {previousPost && <Navigation post={previousPost} navigation={'next'} />}
    </div>
  )
}

export default PostNavigation
