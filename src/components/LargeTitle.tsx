import { useRouter } from 'next/router'
import { colorMap } from '../lib/colors'
import { classNames } from '../lib/util'
import { Title } from '../types/blog'

export const LargeTitle = ({
  title,
  subtitle,
  colorTitile = false,
  colorSubtitle = false,
  subComponent,
  className,
}: {
  title: Title | string
  subtitle?: Title
  colorTitile?: boolean
  colorSubtitle?: boolean
  subComponent?: React.ReactNode
  className?: string
}) => {
  const router = useRouter()

  if (typeof title === 'string') {
    title = { text: title }
  }

  return (
    <div
      className={classNames(
        'flex flex-row items-end justify-between',
        className ?? ''
      )}
    >
      <div className="flex flex-col items-start">
        {subtitle && (
          <p
            className={classNames(
              'my-1 text-[12px] font-medium uppercase',
              colorSubtitle && subtitle.color
                ? `${colorMap[subtitle.color]} opacity-50`
                : 'text-gray-600 opacity-60 dark:text-gray-400 dark:opacity-90',
              subtitle.slug ? 'cursor-pointer' : '',
              subtitle.icon ? 'flex flex-row items-center' : ''
            )}
            onClick={() => {
              if (subtitle.slug) {
                router.push(subtitle.slug)
              }
            }}
          >
            {subtitle.icon && <subtitle.icon size={16} />}
            {subtitle.text}
          </p>
        )}
        <h1
          className={classNames(
            'text-2xl font-bold md:text-3xl',
            colorTitile && title.color
              ? colorMap[title.color]
              : 'text-black dark:text-white',
            title.slug ? 'cursor-pointer' : '',
            title.icon ? 'flex flex-row items-center' : ''
          )}
        >
          {title.icon && <title.icon size={40} />}
          {title.text}
        </h1>
      </div>
      {subComponent}
    </div>
  )
}
