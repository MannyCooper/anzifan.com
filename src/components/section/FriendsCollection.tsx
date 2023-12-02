/* eslint-disable @next/next/no-img-element */
import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { Friend } from '@/src/types/blog'
import Link from 'next/link'
import { ReactElement } from 'react'
import useSWRImmutable from 'swr/immutable'
import OverflowMarquee from '../OverflowMarquee'

const VisitButton = ({
  link,
  disabled,
}: {
  link: string
  disabled: boolean
}) => {
  return (
    <Link
      className={classNames(
        'select-none rounded-full px-[1.125rem] py-1 text-center text-sm text-white',
        disabled
          ? `${colorMap['gray_background']} pointer-events-none`
          : colorMap['blue_background']
      )}
      href={link}
    >
      Visit
    </Link>
  )
}

const Indicator = ({
  status,
}: {
  status: 'online' | 'offline' | 'loading'
}) => {
  const statusMap = {
    online: { color: 'bg-green-500 animate-pulse', text: 'Online' },
    offline: { color: 'bg-red-500', text: 'Offline' },
    loading: { color: 'bg-orange-500 animate-pulse', text: 'Loading' },
  }
  return (
    <div className="mt-1 flex grow text-ellipsis whitespace-nowrap text-sm text-neutral-400 sm:mt-0 sm:block lg:mt-0.5">
      <span className="flex items-center justify-center gap-1">
        <div
          className={classNames(
            'h-2 w-2 rounded-full',
            statusMap[status].color
          )}
        ></div>
        {statusMap[status].text}
      </span>
    </div>
  )
}

const FriendStatus = ({ link, name }: { link: string; name: string }) => {
  const previewFetcher = (url: string) =>
    fetch(`/api/check/${encodeURIComponent(url)}`).then((res) => res.json())

  const { data, error } = useSWRImmutable(link, previewFetcher)

  const Name = () => (
    <OverflowMarquee className="grow text-ellipsis whitespace-nowrap">
      <p className="mt-2 text-lg leading-4 whitespace-nowrap sm:text-base">
        {name}
      </p>
    </OverflowMarquee>
  )

  const Wrapper = ({
    children,
    disabledButton,
  }: {
    children: ReactElement[]
    disabledButton: boolean
  }) => (
    <>
      <div className="items-start overflow-hidden grow sm:mb-4">
        <div className="flex flex-col sm:items-center">{children}</div>
      </div>
      <VisitButton link={link} disabled={disabledButton} />
    </>
  )

  if (error)
    return (
      <Wrapper disabledButton={true}>
        <Name />
        <Indicator status="offline" />
      </Wrapper>
    )
  if (!data)
    return (
      <Wrapper disabledButton={true}>
        <Name />
        <Indicator status="loading" />
      </Wrapper>
    )
  return (
    <Wrapper disabledButton={false}>
      <Name />
      <Indicator status="online" />
    </Wrapper>
  )
}

const FriendCard = ({ friend }: { friend: Friend }) => {
  const { name, avatar, link } = friend

  return (
    <div className="flex h-24 transform flex-row items-center justify-between gap-x-6 overflow-hidden rounded-3xl bg-white p-[1.375rem] shadow-lg transition duration-200 ease-in-out hover:scale-105 dark:bg-neutral-900 sm:h-[13.75rem] sm:flex-col lg:h-[14.5rem]">
      <Link
        href={link}
        className="relative overflow-hidden rounded-full aspect-square w-14 shrink-0 sm:w-20"
      >
        <img
          className="relative z-10 overflow-hidden rounded-full "
          src={avatar}
          alt={name + '_avatar'}
        />
        <div className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-600" />
      </Link>
      <FriendStatus link={link} name={name} />
    </div>
  )
}

const FriendsCollection = ({ friends }: { friends: Friend[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {friends.map((friend) => (
        <FriendCard key={friend.name} friend={friend} />
      ))}
    </div>
  )
}
export default FriendsCollection
