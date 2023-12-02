import { Texture } from 'pixi.js'

const hashKey = (
  width: number,
  height: number,
  colors: string[],
  opacityToggle: boolean
) => {
  return `${width}-${height}-${colors.join(',')}-${opacityToggle}`
}

const CACHED_TEXTURES = new Map<string, Texture>()

function createRoundedGradientTexture(
  width: number,
  height: number,
  colors: string[],
  opacityToggle = false,
  transition = 0
): Texture {
  const originalHeight = height
  height = height <= width ? width : height

  const key = hashKey(width, height, colors, opacityToggle)
  if (CACHED_TEXTURES.has(key)) {
    return CACHED_TEXTURES.get(key)!
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('Could not create canvas context')
    return Texture.EMPTY
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  colors.forEach((color, index) => {
    if (opacityToggle && originalHeight <= width) {
      gradient.addColorStop(index / (colors.length - 1), hexToRgba(color, 0.5))
    } else {
      gradient.addColorStop(index / (colors.length - 1), color)
    }
  })

  ctx.fillStyle = gradient

  const radius = width / 2

  drawRoundedRect(ctx, width, height, radius, transition)

  const texture = Texture.from(canvas)
  CACHED_TEXTURES.set(key, texture)
  return texture
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number,
  transition: number
) => {
  height = height * (1 - transition)
  ctx.beginPath()
  ctx.moveTo(radius, 0)
  ctx.arcTo(width, 0, width, height, radius)
  ctx.arcTo(width, height, 0, height, radius)
  ctx.arcTo(0, height, 0, 0, radius)
  ctx.arcTo(0, 0, width, 0, radius)
  ctx.closePath()
  ctx.fill()
}

export default createRoundedGradientTexture
