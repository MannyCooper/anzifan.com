import React, { ReactNode, useRef } from 'react'
import { useHoverDirty } from 'react-use'

interface TooltipProps {
  children: ReactNode
  content: ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const hoverableRef = useRef<HTMLDivElement>(null)
  const isHovering = useHoverDirty(hoverableRef)

  if (!content) return <>{children}</>

  return (
    <div className="relative flex items-center">
      <div ref={hoverableRef}>{children}</div>
      <div
        className={`absolute bottom-full right-0 mb-2 rounded-full bg-white px-1 py-0 text-xs text-neutral-500 shadow transition-opacity duration-200 dark:bg-neutral-800 lg:px-2 lg:py-0.5 lg:text-sm ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {content}
      </div>
    </div>
  )
}

export default Tooltip
