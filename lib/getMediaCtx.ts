import { normalizeAssetUrl } from "./normalizeAssetUrl"

export const getMediaCtx = (value: any) => {
    const src = normalizeAssetUrl(value.type === 'external' ? value.external.url : value.file.url)
    const expire = value.type === 'file' ? value.file.expiry_time : null
    const caption = value.caption ? value.caption : []
    
    return { src, caption, expire }
}
