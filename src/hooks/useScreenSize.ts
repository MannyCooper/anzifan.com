import tailwindConfig from '@/tailwind.config'
import { Config } from 'tailwindcss'
import resolveConfig from 'tailwindcss/resolveConfig'
import { convertToInteger } from '../lib/util'
import { useMediaQuery } from './useMediaQuery'

export const useScreenSize = () => {
  const { theme } = resolveConfig(tailwindConfig as Config)
  const { sm, md, lg } = theme?.screens as { [key: string]: string }

  const isBreakpointSM = useMediaQuery(convertToInteger(sm))
  const isBreakpointMD = useMediaQuery(convertToInteger(md))
  const isBreakpointLG = useMediaQuery(convertToInteger(lg))

  const isMobile = !isBreakpointSM && !isBreakpointMD && !isBreakpointLG
  const isTablet = isBreakpointSM && !isBreakpointMD && !isBreakpointLG
  const isDesktop = isBreakpointSM && isBreakpointMD && !isBreakpointLG
  const isWidescreen = isBreakpointSM && isBreakpointMD && isBreakpointLG

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWidescreen,
  }
}
