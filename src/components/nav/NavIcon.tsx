/* eslint-disable @next/next/no-img-element */
import CONFIG from '@/blog.config'
import { colorMap } from '@/src/lib/colors'
import { classNames, isValidUrl } from '@/src/lib/util'
import { ApiColor } from '@/src/types/notion'

export const NavIcon = ({
  icon,
  alt,
  color,
}: {
  icon: string
  alt: string
  color: string
}) => {
  const { ICON_PATH } = CONFIG

  const isUrl = isValidUrl(icon)

  const iconPath = isUrl ? icon : `${ICON_PATH}/${icon ?? 'default.svg'}`

  return (
    <>
      {iconPath &&
        (isUrl ? (
          <img
            src={iconPath}
            alt={alt}
            className="h-full text-white text-opacity-0 aspect-square dark:text-black dark:text-opacity-0"
          />
        ) : (
          <span
            aria-label={alt}
            className={classNames(
              colorMap[(color + '_background') as ApiColor],
              'aspect-square h-full text-transparent'
            )}
            style={{
              mask: `url(${iconPath}) no-repeat center`,
              WebkitMask: `url(${iconPath}) no-repeat center`,
            }}
          />
        ))}
    </>
  )
}
