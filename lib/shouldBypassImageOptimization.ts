const BYPASS_IMAGE_OPTIMIZATION_HOSTS = new Set([
    "cdn.sspai.com",
    "cdnfile.sspai.com",
])

export const shouldBypassImageOptimization = (raw?: string | null) => {
    if (!raw) return false

    try {
        const url = new URL(raw)
        return BYPASS_IMAGE_OPTIMIZATION_HOSTS.has(url.hostname)
    } catch {
        return false
    }
}
