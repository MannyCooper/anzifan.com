import Link from 'next/link';
import { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronDown as MenuIcon } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp as MenuOpenIcon } from '@fortawesome/free-solid-svg-icons';

import TagsIcon from '../assets/tags.svg'
import CategoriesIcon from '../assets/categories.svg'
import FriendsIcon from '../assets/friends.svg'
import MeIcon from '../assets/me.svg'
import TocIcon from '../assets/toc.svg'
import MenuIcon from '../assets/menu.svg'
import TocFillIcon from '../assets/toc_fill.svg'

import { Colors } from '../lib/colors';
import { useRouter } from 'next/router';
import PostToc from './PostToc';

const navigations = [
  {
    name: 'Tags',
    link: '/tags',
    icon: <TagsIcon />,
    color: Colors['pink'].text.normal,
    width: 'group-hover:w-9.5',
  },
  {
    name: 'Categories',
    link: '/categories',
    icon: <CategoriesIcon />,
    color: Colors['orange'].text.normal,
    width: 'group-hover:w-21.5',
  },
  {
    name: 'Friends',
    link: '/friends',
    icon: <FriendsIcon />,
    color: Colors['blue'].text.normal,
    width: 'group-hover:w-15.5',
  },
  {
    name: 'Me',
    link: '/me',
    icon: <MeIcon />,
    color: Colors['red'].text.normal,
    width: 'group-hover:w-6.5',
  },
]

const MenuItemLink = (props: { [x: string]: any; href: any; children: any }) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

const Navbar: FC<{ toc: any }> = ({ toc }) => {
  const path = useRouter().asPath
  const isPost = path.startsWith('/post/')
  return (
    <header className="sticky top-0 z-50 font-bold bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 border-b-[0.5px] border-b-true-gray-100" dark="bg-true-gray-900/70 border-b-true-gray-800" data-aos="fade-down" id="navbar">
      <div className="flex items-center justify-between px-6 py-3 mx-auto lg:px-11 lg:w-screen-lg whitespace-nowrap">
        <div className="z-50">
        <Link href="/">异次元の机智君</Link>
        </div>
        <div className="flex items-center">
          {isPost ?
            <Menu>
              <Menu.Button className="flex items-center px-0 m-0 mr-6 z-50">
                {({ open }) => (
                  !open && <TocIcon /> || <TocFillIcon />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
              <Menu.Items className="absolute top-0 left-0 w-full h-100vh bg-true-gray-900/50 backdrop-filter backdrop-blur-sm" dark="bg-true-gray-900/70">
                <Menu.Item>
                  <div className="flex place-items-center w-full h-full">
                    <div className="mx-5 w-full sm:mx-auto md:w-150 overflow-scroll bg-white rounded-3xl scrollbar-hide" dark="bg-black">
                      <PostToc blocks={toc} />
                    </div>
                  </div>
                </Menu.Item>
              </Menu.Items>
              </Transition>
            </Menu>
            : null}
          <nav className="flex items-center justify-center hidden space-x-5 sm:flex">
            {navigations.map((n, i) => (
              <Link href={n.link} key={i}>
                <a className="flex items-center justify-center space-x-1 group" href={n.link}>
                  {n.icon}
                  <div className={`w-0 overflow-hidden ease-in-out transition-all duration-600 ${n.color} ${n.width}`}>{n.name}</div>
                </a>
              </Link>
            ))}
          </nav>
          <div className="block sm:hidden">
            <Menu as="div" className="relative text-left ">
              <Menu.Button className="flex items-center px-0 m-0 text-current bg-transparent cursor-pointer rounded-3xl focus:outline-none">
                {({ open }) => (
                  <MenuIcon className={`transition-transform duration-300 ease-in-out transform ${open ? "scale-y-flip" : ""}`} />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 w-40 p-2 mt-5 origin-top-right shadow-md bg-white/70 rounded-3xl ring-0 focus:outline-none backdrop-filter backdrop-blur-lg backdrop-saturate-200" dark="bg-true-gray-900/70">
                  {navigations.map((n, i) => (
                    <div key={i}>
                      <Menu.Item>
                        {({ active }) => (
                          <MenuItemLink className={`focus:outline-none p-2 flex items-center group ${active && 'bg-true-gray-100 rounded-3xl p-2 dark:hover:bg-dark-800'}`} href={n.link}>
                            {n.icon}
                            <span className={`pl-2 ${n.color}`}>{n.name}</span>
                          </MenuItemLink>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          {/* <Toggle /> */}
        </div>
      </div>
    </header>
  )
}

export default Navbar