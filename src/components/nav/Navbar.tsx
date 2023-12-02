import { useScreenSize } from '@/src/hooks/useScreenSize'
import { colorMap } from '@/src/lib/colors'
import { ApiColor } from '@/src/types/notion'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { classNames } from '../../lib/util'
import { Page, Title } from '../../types/blog'
import { NavIcon } from './NavIcon'
import { NavItem } from './NavItem'
import { NavMenuIcon } from './NavMenuIcon'

const Navbar = ({
  items,
  title,
  subtitle,
}: {
  items: Page[]
  title: Title
  subtitle?: Title
}) => {
  const { isMobile, isTablet } = useScreenSize()
  const [isFolded, setIsFolded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const router = useRouter()
  const isHome = router.pathname === '/'

  if (!isHome && isMobile) {
    const HomeItem = {
      id: 'home',
      slug: '',
      nav: 'Home',
      icon: '/home.svg',
      color: 'gray',
    } as Page
    items = [HomeItem, ...items]
  }

  const handleMenuClick = () => {
    if (!isAnimating) {
      setIsFolded(!isFolded)
    }
  }

  const handleMouseEnter = () => {
    setIsAnimating(true)
    setIsFolded(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  useEffect(() => {
    if (!(isMobile || isTablet)) {
      setIsFolded(false)
    }
  }, [isMobile, isTablet])

  useEffect(() => {
    const handleScroll = () => {
      if (isFolded) {
        setIsFolded(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFolded])

  return (
    <header
      data-aos="fade-down"
      id="navbar"
      className={classNames('top-0 z-40 select-none', 'sticky')}
    >
      <div className="h-12 backdrop-blur-lg backdrop-saturate-200 backdrop-filter"></div>
      <div
        className={classNames(
          'absolute top-0 left-0 z-50 w-full',
          isFolded && (isMobile || isTablet) ? 'h-screen' : 'h-auto'
        )}
      >
        <div
          className={classNames(
            isFolded && (isMobile || isTablet)
              ? 'max-h-screen'
              : 'max-h-12 bg-opacity-70 backdrop-blur-lg backdrop-saturate-200 backdrop-filter dark:bg-opacity-70',
            'font-bold',
            'bg-white dark:bg-black',
            'transition-all duration-500 ease-in-out'
          )}
          onMouseLeave={() => setIsFolded(false)}
        >
          <div
            className={classNames(
              'mx-auto flex items-start justify-between whitespace-nowrap px-6 md:h-full lg:w-screen-lg lg:px-11'
            )}
          >
            <div className="z-50 flex flex-row items-center py-3 space-x-1 text-center">
              <Link
                href="/"
                className={classNames(
                  title.color === 'default'
                    ? 'text-black dark:text-white'
                    : colorMap[title.color as ApiColor]
                )}
              >
                {title.text}
              </Link>
              {subtitle && (
                <Link href={`/${subtitle.slug}`}>
                  <span className="text-neutral-300">｜</span>
                  <span
                    className={classNames(
                      'tracking-wider',
                      colorMap[subtitle.color as ApiColor]
                    )}
                  >
                    {subtitle.text}
                  </span>
                </Link>
              )}
            </div>
            <div className="z-50 flex items-center justify-end h-full">
              <button
                onMouseEnter={handleMouseEnter}
                onClick={handleMenuClick}
                className={classNames(
                  isMobile || isTablet ? 'block' : 'hidden',
                  'h-12 py-3 text-black dark:text-white'
                )}
              >
                <NavMenuIcon isFolded={isFolded} />
              </button>
              <nav
                className={classNames(
                  'h-12 items-center justify-end space-x-4 py-2',
                  isMobile || isTablet ? 'hidden' : 'flex'
                )}
              >
                {items.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </nav>
            </div>
          </div>
          <div
            className={classNames(
              'grid grid-cols-2 gap-2 overflow-scroll transition-all duration-[400ms] ease-in-out sm:grid-cols-4 sm:gap-4',
              isFolded && (isMobile || isTablet)
                ? 'max-h-screen overflow-scroll p-4 pb-6 opacity-100 sm:pb-8'
                : 'max-h-0 opacity-0'
            )}
          >
            {items.map((item) => (
              <Link
                href={`/${item.slug}`}
                key={item.id}
                className="flex h-10 shrink-0 flex-row items-center justify-between overflow-hidden rounded-2xl bg-white bg-opacity-80 py-1 pl-2 pr-4 shadow-[0px_0px_14px_-5px_rgb(186_186_186/70%)] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-100 dark:bg-neutral-900 dark:bg-opacity-80 dark:shadow-neutral-700 dark:hover:bg-opacity-100 sm:h-24 sm:flex-col sm:py-4 sm:px-6"
              >
                <div className="flex items-center justify-center w-10 h-full">
                  <NavIcon icon={item.icon} alt={item.nav} color={item.color} />
                </div>
                <p
                  className={classNames(
                    colorMap[item.color as ApiColor],
                    'whitespace-nowrap'
                  )}
                >
                  {item.nav}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <Transition
          show={isFolded && (isMobile || isTablet)}
          as={'div'}
          unmount={false}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={classNames(
            'h-screen w-full bg-neutral-200 bg-opacity-20 backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out dark:bg-neutral-900 dark:bg-opacity-20 '
          )}
          onClick={() => setIsFolded(false)}
        />
      </div>
    </header>
  )
}

export default Navbar
