import { getPlaiceholder } from "plaiceholder"
import { normalizeAssetUrl } from "./normalizeAssetUrl"

const REMOTE_PROTOCOLS = new Set(["http:", "https:"])
const HOTLINK_PROTECTED_HOSTS = new Set(["cdn.sspai.com", "cdnfile.sspai.com"])
const DEFAULT_PLACEHOLDER_SIZE = 10
const BUILD_USER_AGENT = "Mozilla/5.0 (compatible; anzifan-build/1.0; +https://www.anzifan.com/)"

const getRemoteRequestHeaders = (url: URL) => {
    const headers: Record<string, string> = {
        "User-Agent": BUILD_USER_AGENT,
        "Accept": "*/*",
    }

    if (HOTLINK_PROTECTED_HOSTS.has(url.hostname)) {
        headers["Referer"] = "https://www.anzifan.com/"
    }

    return headers
}

const loadImageInput = async (raw: string) => {
    const src = normalizeAssetUrl(raw)

    try {
        const url = new URL(src)
        if (REMOTE_PROTOCOLS.has(url.protocol)) {
            const response = await fetch(url.toString(), {
                headers: getRemoteRequestHeaders(url),
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch ${url.toString()} (${response.status})`)
            }

            return {
                src,
                input: Buffer.from(await response.arrayBuffer()),
            }
        }
    } catch (error) {
        if (error instanceof TypeError) {
            return { src, input: src }
        }

        throw error
    }

    return { src, input: src }
}

export const getImageBlurDataURL = async (raw: string, size = DEFAULT_PLACEHOLDER_SIZE) => {
    const { input } = await loadImageInput(raw)
    const { base64 } = await getPlaiceholder(input, { size })
    return base64
}

export const getImageMetadata = async (raw: string, size = DEFAULT_PLACEHOLDER_SIZE) => {
    const { src, input } = await loadImageInput(raw)
    const { base64, img } = await getPlaiceholder(input, { size })

    if (!img.width || !img.height) {
        throw new Error(`Missing image dimensions for ${src}`)
    }

    return {
        src,
        width: img.width,
        height: img.height,
        blur: base64,
    }
}
