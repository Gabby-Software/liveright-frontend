import React from 'react'
import { useHistory } from 'react-router-dom'

import { useIsMobile } from '../../hooks/is-mobile.hook'
import { PROGRESS_LOG_URL } from './progress.constants'
import { ProgressSectionsType } from './progress.types'
import ProgressDesktop from './progress-desktop/progress-desktop.component'
import ProgressMobile from './progress-mobile/progress-mobile.component'

const Progress = () => {
  const isMobile = useIsMobile()
  const history = useHistory()

  const handleLogClick = (value: ProgressSectionsType) => {
    history.push(PROGRESS_LOG_URL[value])
  }

  if (isMobile) {
    return <ProgressMobile onLogClick={handleLogClick} />
  }

  return <ProgressDesktop onLogClick={handleLogClick} />
}

export default Progress
