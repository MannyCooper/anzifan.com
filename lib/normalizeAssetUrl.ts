const HOST_REMAPS: Record<string, string> = {
  "cdn.sspai.com": "cdnfile.sspai.com",
}

export const normalizeAssetUrl = (raw?: string | null) => {
  if (!raw) return raw || ""

  try {
    const url = new URL(raw)
    const mappedHost = HOST_REMAPS[url.hostname]
    if (mappedHost) {
      url.hostname = mappedHost
      url.protocol = "https:"
    }
    return url.toString()
  } catch {
    return raw
  }
}
