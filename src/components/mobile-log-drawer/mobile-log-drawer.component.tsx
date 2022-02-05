import React from 'react'

import BottomDrawer from '../bottom-drawer/bottom-drawer.component'
import QuickAccessPopup from '../quick-access/components/quick-access-popup/quick-access-popup.component'
import { useQuickAccess } from '../quick-access/quick-access.context'
import { quickAccessRoutes } from '../quick-access/quick-access.routes'

type MobileLogDrawerPropsType = {
  isOpen: boolean
  onClose: () => void
}
const MobileLogDrawer = ({ isOpen, onClose }: MobileLogDrawerPropsType) => {
  const { route } = useQuickAccess()

  switch (route) {
    case quickAccessRoutes.WORKOUT_OVERVIEW:
    case quickAccessRoutes.WORKOUT_LOGGING_CARDIO:
    case quickAccessRoutes.WORKOUT_LOGGING_STRENGTH:
    case quickAccessRoutes.WORKOUT_LOG_SUPERSET:
    case quickAccessRoutes.WORKOUT_LOGGING_SUPERSET:
    case quickAccessRoutes.MEAL_OVERVIEW:
      return <QuickAccessPopup fullscreen />
    default:
      return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} isLogDrawer>
          <QuickAccessPopup />
        </BottomDrawer>
      )
  }
}

export default MobileLogDrawer
