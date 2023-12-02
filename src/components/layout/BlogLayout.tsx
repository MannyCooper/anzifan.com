import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { LayoutProps } from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import {
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  useState,
} from 'react'

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div className="transition duration-500 bg-background-light dark:bg-black">
      {children}
    </div>
  )
}

export function BlogLayoutPure({ children }: LayoutProps) {
  return (
    <div className="transition duration-500 bg-white dark:bg-black">
      {children}
    </div>
  )
}

export function BlogLayoutGradient({ children }: LayoutProps) {
  return (
    <div className="transition duration-500 bg-gradient-to-b from-background-light to-white dark:from-black dark:to-black">
      {children}
    </div>
  )
}

export function BlogLayoutWithColor({ children, color }: LayoutProps) {
  return (
    <div className={'bg-white transition duration-500 dark:bg-black'}>
      <div
        className={classNames(
          color === 'gray'
            ? 'bg-neutral-100 dark:bg-neutral-900'
            : colorMap[(color + '_background_secondary') as ApiColor],
          'bg-opacity-30 dark:bg-opacity-30'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function BlogLayoutWhite({ children }: LayoutProps) {
  const [toc, setToc] = useState(null)
  const tocChild = cloneElement(
    children as ReactElement<any, string | JSXElementConstructor<any>>,
    { setToc }
  )
  return (
    <>
      <div
        className={classNames(
          'min-h-screen bg-white',
          'dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black'
        )}
      >
        {/* <Navbar toc={toc} /> */}
        <main>{tocChild}</main>
        {/* <Footer /> */}
      </div>
    </>
  )
}
