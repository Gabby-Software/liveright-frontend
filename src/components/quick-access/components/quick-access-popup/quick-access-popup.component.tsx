import React, { FC, useMemo } from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import QuickAccessHome from '../../pages/quick-access-home/quick-access-home.component'
import QuickAccessLogHealth from '../../pages/quick-access-log-health/quick-access-log-health.component'
import QuickAccessLogHealthGlucose from '../../pages/quick-access-log-health/quick-access-log-health-glucose/quick-access-log-health-glucose.component'
import QuickAccessLogHealthHeartRate from '../../pages/quick-access-log-health/quick-access-log-health-heart-rate/quick-access-log-health-heart-rate.component'
import QuickAccessLogHealthSleep from '../../pages/quick-access-log-health/quick-access-log-health-sleep/quick-access-log-health-sleep.component'
import QuickAccessLogHealthSteps from '../../pages/quick-access-log-health/quick-access-log-health-steps/quick-access-log-health-steps.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles, { Times } from './quick-access-popup.styles'

const QuickAccessPopup: FC = () => {
  const { open, setOpen, route, client } = useQuickAccess()
  const { type } = useAuth()
  const Content = useMemo(() => {
    switch (route) {
      case quickAccessRoutes.ADD:
      case quickAccessRoutes.LOG:
        return QuickAccessHome
      case quickAccessRoutes.LOG_HEALTH_DATA:
        return QuickAccessLogHealth
      case quickAccessRoutes.LOG_HEALTH_DATA_SLEEP:
        return QuickAccessLogHealthSleep
      case quickAccessRoutes.LOG_HEALTH_DATA_STEPS:
        return QuickAccessLogHealthSteps
      case quickAccessRoutes.LOG_HEALTH_DATA_HEART_RATE:
        return QuickAccessLogHealthHeartRate
      case quickAccessRoutes.LOG_HEALTH_DATA_GLUCOSE:
        return QuickAccessLogHealthGlucose
      default:
        return React.Fragment
    }
  }, [route])
  return (
    <Styles open={open}>
      <Times onClick={() => setOpen(false)}>
        <CrossIcon />
      </Times>
      {type === userTypes.TRAINER && !client ? (
        <QuickAccessHome />
      ) : (
        <Content />
      )}
    </Styles>
  )
}

export default QuickAccessPopup
