import React from 'react'

import { useIsMobile } from '../../hooks/is-mobile.hook'
import ProgressDesktop from './progress-desktop/progress-desktop.component'
import ProgressMobile from './progress-mobile/progress-mobile.component'

const Progress = () => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <ProgressMobile />
  }

  return <ProgressDesktop />
}

export default Progress
