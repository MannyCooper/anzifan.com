import { getAverageColor } from 'fast-average-color-node'
import { getPlaiceholder } from 'plaiceholder'
import probe from 'probe-image-size'

export async function getImageInfo(src: string) {
  const { placeholder, width, height, type } = await calculatePlaiceholder(src)
  return { width, height, placeholder, type }
}

const calculatePlaiceholder = async (url: string) => {
  let placeholder, width, height, type
  try {
    const { base64, img } = await getPlaiceholder(url, {
      size: 16,
    })
    placeholder = base64
    width = img.width
    height = img.height
    type = img.type
  } catch (error) {
    const {
      width: probeWidth,
      height: probeHeight,
      type: probeType,
    } = await probe(url)
    placeholder = await generateColorPlaceholder(url)
    width = probeWidth
    height = probeHeight
    type = probeType
  }

  return {
    placeholder: placeholder,
    width: width,
    height: height,
    type: type,
  }
}

async function generateColorPlaceholder(src: string) {
  const color = await getAverageColor(src)
  const rgb = color.value
  const placeholder = generateBase64Image(rgb[0], rgb[1], rgb[2])

  return placeholder
}

function generateBase64Image(r: number, g: number, b: number) {
  const keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  return rgbDataURL(r, g, b)
}
