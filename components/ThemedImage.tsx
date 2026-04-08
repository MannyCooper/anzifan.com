import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { shouldBypassImageOptimization } from '../lib/shouldBypassImageOptimization'

function ThemedImage(params: any) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const shouldBypassLightOptimization = shouldBypassImageOptimization(params.post.cover.light)

    if (!mounted) {
        return <Image src={params.post.cover.light} quality={params.quality || 100} layout="fill" objectFit="cover" sizes="100%" alt={params.post.title}
        // onLoadingComplete={handleLoad}
        placeholder="blur"
        blurDataURL={params.post.cover.blurLight}
        unoptimized={shouldBypassLightOptimization}
        className={params.className} />
    }

    const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    let src
    let blurSrc
    let unoptimized = false
    switch (resolvedTheme) {
        case 'light':
            src = params.post.cover.light
            blurSrc = params.post.cover.blurLight
            unoptimized = shouldBypassImageOptimization(src)
            break
        case 'dark':
            src = params.post.cover.dark
            blurSrc = params.post.cover.blurDark
            unoptimized = shouldBypassImageOptimization(src)
            break
        default:
            src = emptyImage
            blurSrc = emptyImage
            unoptimized = false
            break
    }

    return <Image priority={true} src={src} quality={params.quality || 100} layout="fill" objectFit="cover" alt={params.post.title}
        // onLoadingComplete={handleLoad}
        placeholder="blur"
        blurDataURL={blurSrc}
        unoptimized={unoptimized}
        className={params.className} />
}

export default ThemedImage
