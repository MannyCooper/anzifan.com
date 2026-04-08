import probe from 'probe-image-size'
import { normalizeAssetUrl } from './normalizeAssetUrl'

const probeImageSize = async (url: string) => {
    const size = await probe(normalizeAssetUrl(url))
    return { width: size.width, height: size.height }
}

export default probeImageSize
