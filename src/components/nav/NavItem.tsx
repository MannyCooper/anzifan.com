import { useTextWidth } from '@/src/hooks/useTextWidth'
import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { Page } from '@/src/types/blog'
import Link from 'next/link'
import { useState } from 'react'
import { NavIcon } from './NavIcon'

export const NavItem = ({ item }: { item: Page }) => {
  const { nav: text, slug, icon, color } = item
  const [isHovering, setIsHovering] = useState(false)

  const textWidth = useTextWidth(text) + 2

  return (
    <Link
      className="flex items-center justify-center h-full space-x-1"
      href={`/${slug}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <NavIcon icon={icon} alt={text} color={color} />
      <div
        className={classNames(
          'overflow-hidden  transition-all duration-500 ease-in-out',
          colorMap[color]
        )}
        style={{
          width: isHovering ? textWidth : 0,
        }}
      >
        {text}
      </div>
    </Link>
  )
}
