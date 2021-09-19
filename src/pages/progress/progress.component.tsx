import React from 'react'

import { useIsMobile } from '../../hooks/is-mobile.hook'
// import { PROGRESS_LOG_URL } from './progress.constants'
import ProgressDesktop from './progress-desktop/progress-desktop.component'
import ProgressMobile from './progress-mobile/progress-mobile.component'

export default function Progress() {
  const isMobile = useIsMobile()
  return isMobile ? <ProgressMobile /> : <ProgressDesktop />
}
