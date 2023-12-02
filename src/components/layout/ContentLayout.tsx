import { LayoutProps } from '@/src/types/blog'
import { MathJaxContext } from 'better-react-mathjax'

export default function ContentLayout({ children }: LayoutProps) {
  return (
    <MathJaxContext>
      <article className="w-full px-6 mx-auto my-6 overflow-hidden break-words md:w-screen-md md:px-10 lg:w-screen-lg lg:px-44">
        {children}
      </article>
    </MathJaxContext>
  )
}

export function CoverLayout({ children }: LayoutProps) {
  return (
    <>
      <div className="mx-auto mt-12 mb-6 md:w-screen-md md:px-1 lg:w-screen-lg lg:px-[3.75rem]">
        <div className="relative z-0 h-[56.25vw] overflow-hidden md:h-[25rem] md:rounded-2xl lg:h-[35rem]">
          {children}
        </div>
      </div>
    </>
  )
}
