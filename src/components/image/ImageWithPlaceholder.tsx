import CONFIG from '@/blog.config'
import { classNames } from '@/src/lib/util'
import { useState } from 'react'
import ImageWithFallback from './ImageWithFallback'

const ImageWithPlaceholder = ({
  src,
  width,
  height,
  alt,
  blurDataURL,
  className,
  ...props
}: {
  src: string
  alt: string
  width: number
  height: number
  blurDataURL: string
  className?: string
}) => {
  const [blur, setBlur] = useState(true)

  return (
    <ImageWithFallback
      key={alt}
      priority
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={classNames(
        className ? className : '',
        'h-full w-full object-cover',
        blur ? 'blur-xl' : 'unblur'
      )}
      fallbackSrc={CONFIG.DEFAULT_POST_COVER}
      placeholder="blur"
      quality={100}
      blurDataURL={blurDataURL}
      onLoadingComplete={() => setBlur(false)}
      {...props}
    />
  )
}

export default ImageWithPlaceholder
