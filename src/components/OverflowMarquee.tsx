import { useEffect, useRef, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { classNames } from '../lib/util'

const OverflowMarquee = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [play, setPlay] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const container = marqueeRef.current
    if (!container) return
    setWidth(container.scrollWidth)
    const handleScroll = () => {
      if (container.offsetWidth === container.scrollWidth) {
        setPlay(false)
        if (width !== container.scrollWidth) {
          setWidth(container.scrollWidth)
        }
        return
      }
      if (container.offsetWidth < container.scrollWidth) {
        setPlay(true)
      }
    }
    const intervalId = setInterval(() => {
      if (container.offsetWidth !== 0) {
        handleScroll()
      }
    }, 50)

    return () => {
      clearInterval(intervalId)
    }
  }, [children, play, width])

  return (
    <div
      className={classNames(
        'inline-flex rotate-0 flex-col overflow-hidden',
        className ?? ''
      )}
    >
      {play ? (
        <Marquee
          pauseOnHover
          gradient={false}
          className={classNames('flex items-center', '[&>*]:pr-2')}
          style={{
            width: width,
          }}
          onCycleComplete={() => {
            setPlay(false)
          }}
        >
          {children}
        </Marquee>
      ) : (
        <div className={classNames('flex items-center')} ref={marqueeRef}>
          {children}
        </div>
      )}
    </div>
  )
}

export default OverflowMarquee
