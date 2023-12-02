/* eslint-disable @next/next/no-img-element */
import CONFIG from '@/blog.config'
import { colorMap } from '@/src/lib/colors'
import { classNames, formatDate } from '@/src/lib/util'
import { Post, Tag } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import Link from 'next/link'
import { ReactNode } from 'react'
import {
  FaCreativeCommons,
  FaCreativeCommonsBy,
  FaCreativeCommonsNc,
  FaHashtag,
} from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
import { MdEditCalendar, MdSatellite } from 'react-icons/md'
import { RiMedal2Fill } from 'react-icons/ri'
import { SiSpringCreators } from 'react-icons/si'
import OverflowMarquee from '../OverflowMarquee'

const { ABOUT, TAG } = CONFIG.DEFAULT_SPECIAL_PAGES

const PostFooter = ({ post }: { post: Post }) => {
  const isOriginalCover = post.options.originalCover
  const notRepost = !post.options.repost
  const coverLink = post.cover.light.src

  return (
    <>
      <div className="flex flex-col items-start justify-between w-full gap-3 pt-2">
        <div className="flex justify-between w-full py-2 sm:py-3">
          <TagCollection tags={post.tags} />
        </div>
        <div className="flex justify-between w-full gap-x-2">
          <OverflowMarquee className="rounded-3xl">
            <div className="flex items-center gap-2 rounded-3xl">
              {notRepost && <NotRepostDeclaration />}
              {isOriginalCover ? (
                <OriginalCoverDeclaration />
              ) : (
                <CoverSourceDeclaration url={coverLink} />
              )}
              <CCDisclaimer />
            </div>
          </OverflowMarquee>
          <UpdatedTime date={post.date} />
        </div>
      </div>
    </>
  )
}

const UpdatedTime = ({ date }: { date: Post['date'] }) => {
  const icon = [MdEditCalendar]
  const text = formatDate(date.updated)
  const textColor = 'text-blue-600 dark:text-blue-400'
  const bgColor = 'bg-blue-50 dark:bg-blue-900/50'
  const href = ''

  return (
    <Badge
      icons={icon}
      text={text}
      textColor={textColor}
      bgColor={bgColor}
      href={href}
    />
  )
}

const TagCollection = ({ tags }: { tags: Tag[] }) => {
  return (
    <OverflowMarquee className="flex justify-start text-xs rounded-3xl sm:text-sm">
      <div className="inline-flex gap-2">
        {tags.map((tag: Tag) => (
          <Link
            key={tag.id}
            href={`/${TAG}/${tag.id}`}
            className={classNames(
              colorMap[(tag.color + '_background') as ApiColor],
              colorMap[tag.color as ApiColor],
              'flex select-none items-center gap-x-0.5 whitespace-nowrap rounded-full py-1 px-2 sm:gap-x-1',
              'bg-opacity-10 transition-colors duration-300 ease-in-out hover:bg-opacity-100 hover:text-white dark:bg-opacity-30 dark:hover:bg-opacity-100 dark:hover:text-black'
            )}
          >
            <FaHashtag />
            <span className="shrink">{tag.name}</span>
          </Link>
        ))}
      </div>
    </OverflowMarquee>
  )
}

const CCDisclaimer = () => {
  const icons = [FaCreativeCommons, FaCreativeCommonsNc, FaCreativeCommonsBy]
  const text = '知识共享'
  const textColor = 'text-fuchsia-600 dark:text-fuchsia-400'
  const bgColor = 'bg-fuchsia-50 dark:bg-fuchsia-900/50'
  const href = 'https://creativecommons.org/licenses/by-nc-sa/4.0/'

  return (
    <Badge
      icons={icons}
      text={text}
      textColor={textColor}
      bgColor={bgColor}
      href={href}
    />
  )
}

const CoverSourceDeclaration = ({ url }: { url: string }) => {
  const icons = [MdSatellite]
  const text = '封面来源'
  const textColor = 'text-purple-600 dark:text-purple-400'
  const bgColor = 'bg-purple-50 dark:bg-purple-900/50'
  const hostname = `https://${new URL(url).hostname
    .split('.')
    .slice(-2)
    .join('.')}`

  return (
    <Badge
      icons={icons}
      text={text}
      textColor={textColor}
      bgColor={bgColor}
      href={hostname}
    />
  )
}

const OriginalCoverDeclaration = () => {
  const icon = (
    <SiSpringCreators key={'icon'} className="scale-x-[-1] transform" />
  )
  const icons = [icon]
  const text = '原创封面'
  const textColor = 'text-purple-600 dark:text-purple-400'
  const bgColor = 'bg-purple-50 dark:bg-purple-900/50'
  const href = `#cover`

  return (
    <Badge
      icons={icons}
      text={text}
      textColor={textColor}
      bgColor={bgColor}
      href={href}
    />
  )
}

const NotRepostDeclaration = () => {
  const icons = [RiMedal2Fill]
  const text = '本站首发'
  const textColor = 'text-purple-600 dark:text-purple-400'
  const bgColor = 'bg-purple-50 dark:bg-purple-900/50'
  const href = `/${ABOUT}`

  return (
    <Badge
      icons={icons}
      text={text}
      textColor={textColor}
      bgColor={bgColor}
      href={href}
    />
  )
}

const Badge = ({
  icons,
  text,
  textColor,
  bgColor,
  href,
  willHideText = false,
}: {
  icons: IconType[] | ReactNode[]
  text: string
  textColor: string
  bgColor: string
  href?: string
  willHideText?: boolean
}) => {
  return href ? (
    <Link
      href={href}
      className={classNames(
        'flex select-none items-center justify-center gap-x-1 whitespace-nowrap rounded-3xl px-2 py-1 text-xs sm:gap-x-2 sm:text-sm',
        bgColor,
        textColor
      )}
    >
      <div className="flex gap-x-1">
        {icons.map((Icon) =>
          typeof Icon === 'function' ? <Icon key={Icon.toString()} /> : Icon
        )}
      </div>
      <p className={willHideText ? 'hidden sm:block' : ''}>{text}</p>
    </Link>
  ) : (
    <div
      className={classNames(
        'flex select-none items-center justify-center gap-x-1 whitespace-nowrap rounded-3xl px-2 py-1 text-xs sm:gap-x-2 sm:text-sm',
        bgColor,
        textColor
      )}
    >
      <div className="flex gap-x-1">
        {icons.map((Icon) =>
          typeof Icon === 'function' ? <Icon key={Icon.toString()} /> : Icon
        )}
      </div>
      <p className={willHideText ? 'hidden sm:block' : ''}>{text}</p>
    </div>
  )
}

export default PostFooter
