import { classNames } from '@/src/lib/util'

export const WidgetContainer = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  return (
    <div
      className={classNames(
        'aspect-square w-full select-none rounded-3xl bg-white dark:bg-neutral-900 md:aspect-[2.15] lg:aspect-[2.3]',
        'transform-gpu overflow-hidden border-[0.5px] border-none border-neutral-100 shadow-sm transition duration-500 ease-in-out hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg dark:border-neutral-900 mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg'
      )}
    >
      {children ? (
        children
      ) : (
        <p className="flex items-center justify-center w-full h-full px-6 py-4 text-base font-bold leading-loose truncate text-neutral-200 dark:text-neutral-700 sm:text-xl md:text-3xl">
          - NO DATA -
        </p>
      )}
    </div>
  )
}
