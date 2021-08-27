import React, { FC, useMemo } from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import QuickAccessHome from '../../pages/quick-access-home/quick-access-home.component'
import QuickAccessLogHealth from '../../pages/quick-access-log-health/quick-access-log-health.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles, { Times } from './quick-access-popup.styles'

const QuickAccessPopup: FC = () => {
  const { open, setOpen, route } = useQuickAccess()
  const Content = useMemo(() => {
    switch (route) {
      case quickAccessRoutes.ADD:
      case quickAccessRoutes.LOG:
        return QuickAccessHome
      case quickAccessRoutes.LOG_HEALTH_DATA:
        return QuickAccessLogHealth
      default:
        return React.Fragment
    }
  }, [route])
  return (
    <Styles open={open}>
      <Times onClick={() => setOpen(false)}>
        <CrossIcon />
      </Times>
      <Content />
    </Styles>
  )
}

export default QuickAccessPopup
