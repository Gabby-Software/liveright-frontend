import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { mediaQueries, screenSizes } from '../enums/screen-sizes.enum'
import { useEvent } from './event.hook'
import { useWindowSize } from './window-size.hook'
export const useIsMobile = () => {
  const { width } = useWindowSize()
  const isLandscape = useMediaQuery({ query: mediaQueries.LANDSCAPE })

  const [printMode, setPrintMode] = useState(false)
  useEvent('beforeprint', () => {
    setPrintMode(true)
  })
  useEvent('afterprint', () => setPrintMode(false))
  return !printMode && (width <= screenSizes.TABLET || isLandscape)
}
