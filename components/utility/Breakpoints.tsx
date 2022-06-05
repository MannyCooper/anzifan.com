import { createMedia } from "@artsy/fresnel"

export const { MediaContextProvider, Media } = createMedia({
  // breakpoints values can be either strings or integers
  breakpoints: {
    mobile: 0,
    sm: 450,
    md: 734,
    lg: 1068,
  },
})