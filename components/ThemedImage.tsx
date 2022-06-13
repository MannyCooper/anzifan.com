import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemedImage(params: any) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Image src={params.post.cover.light} quality={params.quality || 100} layout="fill" objectFit="cover" sizes="100%" alt={params.post.title}
        // onLoadingComplete={handleLoad}
        placeholder="blur"
        blurDataURL={params.post.cover.blurLight}
        className={params.className} />
    }

    const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    let src
    let blurSrc
    switch (resolvedTheme) {
        case 'light':
            src = params.post.cover.light
            blurSrc = params.post.cover.blurLight
            break
        case 'dark':
            src = params.post.cover.dark
            blurSrc = params.post.cover.blurDark
            break
        default:
            src = emptyImage
            blurSrc = emptyImage
            break
    }

    return <Image priority={true} src={src} quality={params.quality || 100} layout="fill" objectFit="cover" alt={params.post.title}
        // onLoadingComplete={handleLoad}
        placeholder="blur"
        blurDataURL={blurSrc}
        className={params.className} />
}

export default ThemedImage