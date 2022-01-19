import probe from 'probe-image-size'

const probeImageSize = async (url: string) => {
    const size = await probe(url)
    return { width: size.width, height: size.height }
}

export default probeImageSize