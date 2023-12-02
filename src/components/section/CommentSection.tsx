import CONFIG from '@/blog.config'
import { Tab } from '@headlessui/react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { classNames } from '../../lib/util'

const GiscusComponent = dynamic(
  () => {
    return import('../comments/GiscusComponent')
  },
  { ssr: false }
)

const TwikooComponent = dynamic(
  () => {
    return import('../comments/TwikooComponent')
  },
  { ssr: false }
)

const CommentSection = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const comments = [
    {
      name: 'Twikoo (国内访问，无需登录)',
      component: <TwikooComponent />,
      show: !!CONFIG.COMMENT_CONFIG?.TWIKOO,
    },
    {
      name: 'Giscus',
      component: (
        <GiscusComponent theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
      ),
      show: !!CONFIG.COMMENT_CONFIG?.GISCUS,
    },
  ]

  const enabledCommentNumber = comments.filter((comment) => comment.show).length

  return (
    <div className="py-4">
      <h1 className="my-4 text-2xl font-bold text-center md:text-3xl lg:my-8">
        Comments
      </h1>
      <div className="mb-8 rounded-3xl">
        <Tab.Group>
          {enabledCommentNumber > 1 && (
            <Tab.List className="flex flex-col p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 sm:flex-row">
              {comments.map(
                (comment) =>
                  comment.show && (
                    <Tab
                      key={comment.name}
                      className={({ selected }) =>
                        classNames(
                          'xs:text-sm w-full rounded-lg py-2.5 text-xs font-medium leading-5 line-clamp-1',
                          selected
                            ? 'bg-white text-neutral-700 shadow dark:bg-neutral-900 dark:text-neutral-200'
                            : 'text-neutral-400 hover:bg-white/[0.12] hover:text-neutral-500'
                        )
                      }
                    >
                      {comment.name}
                    </Tab>
                  )
              )}
            </Tab.List>
          )}
          <Tab.Panels className="mt-2 overflow-hidden">
            {comments.map(
              (comment) =>
                comment.show && (
                  <Tab.Panel key={comment.name + '_component'} className="mt-8">
                    {comment.component}
                  </Tab.Panel>
                )
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default CommentSection
