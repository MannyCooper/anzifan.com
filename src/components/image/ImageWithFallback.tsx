import NextImage, { ImageProps } from 'next/image'
import { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { RxLinkBreak2 } from 'react-icons/rx'

const ImageWithFallback = (
  props: ImageProps & { fallbackSrc: string; isIcon?: boolean }
) => {
  const { fallbackSrc, alt, isIcon, ...rest } = props
  const src = props.src as string
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)
  const [enableFallbackIcon, setEnableFallbackIcon] = useState(false)
  const isNotionHosted = imgSrc.includes('secure.notion-static.com')

  return !error ? (
    <NextImage
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
        setError(true)
      }}
      unoptimized={props.unoptimized || isNotionHosted}
      alt={alt}
    />
  ) : enableFallbackIcon ? (
    <NextImage
      {...rest}
      src={imgSrc}
      onError={() => {
        setEnableFallbackIcon(true)
      }}
      unoptimized={props.unoptimized || isNotionHosted}
      alt={alt}
    />
  ) : isIcon && isIcon === true ? (
    <FaQuestionCircle className="w-full h-full opacity-30" />
  ) : (
    <div className="relative z-0 flex items-center justify-center w-full h-full bg-neutral-50 dark:bg-neutral-800">
      <RxLinkBreak2 className="w-1/3 h-1/3 opacity-30" />
    </div>
  )
}

export default ImageWithFallback
