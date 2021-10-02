import React from 'react'

import { useIsMobile } from '../../hooks/is-mobile.hook'
import DesktopSettings from './settings-desktop/settings-desktop.component'
import MobileSettings from './settings-mobile/settings-mobile.component'

const Settings = () => {
  const isMobile = useIsMobile()
  return isMobile ? <MobileSettings /> : <DesktopSettings />
}

export default Settings
