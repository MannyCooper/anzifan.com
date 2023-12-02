import { classNames } from '@/src/lib/util'
import { LayoutProps } from '@/src/types/blog'

export default function ContainerLayout({ children }: LayoutProps) {
  return (
    <div
      className={classNames(
        'px-4 py-8 transition-all duration-300 ',
        'sm:mx-auto sm:w-[23rem] sm:max-w-none sm:px-0',
        'md:w-screen-md md:px-5',
        'lg:w-screen-lg lg:px-11'
      )}
    >
      {children}
    </div>
  )
}

export function ContainerLayoutFull({ children }: LayoutProps) {
  return (
    <div className="my-6 sm:min-w-[23rem] sm:max-w-none sm:px-0 md:w-screen-md md:px-5 lg:w-screen-lg lg:px-11">
      <div className="mx-6 md:mx-0">{children}</div>
    </div>
  )
}
