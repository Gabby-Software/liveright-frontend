import React, { FC, useMemo } from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import LogMeasurements from '../../pages/log-measurements/log-measurements.component'
import QuickAccessHome from '../../pages/quick-access-home/quick-access-home.component'
import QuickAccessLogExercise from '../../pages/quick-access-log-exercise/quick-access-log-exercise.component'
import QuickAccessLogHealth from '../../pages/quick-access-log-health/quick-access-log-health.component'
import QuickAccessLogHealthGlucose from '../../pages/quick-access-log-health/quick-access-log-health-glucose/quick-access-log-health-glucose.component'
import QuickAccessLogHealthHeartRate from '../../pages/quick-access-log-health/quick-access-log-health-heart-rate/quick-access-log-health-heart-rate.component'
import QuickAccessLogHealthSleep from '../../pages/quick-access-log-health/quick-access-log-health-sleep/quick-access-log-health-sleep.component'
import QuickAccessLogHealthSteps from '../../pages/quick-access-log-health/quick-access-log-health-steps/quick-access-log-health-steps.component'
import QuickAccessLogMeal from '../../pages/quick-access-log-meal/quick-access-log-meal.component'
import QuickAccessAddExercise from '../../pages/quick-access-add-exercise/quick-access-add-exercise.component'
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
      case quickAccessRoutes.LOG_HEALTH_DATA_SLEEP:
        return QuickAccessLogHealthSleep
      case quickAccessRoutes.LOG_HEALTH_DATA_STEPS:
        return QuickAccessLogHealthSteps
      case quickAccessRoutes.LOG_HEALTH_DATA_HEART_RATE:
        return QuickAccessLogHealthHeartRate
      case quickAccessRoutes.LOG_HEALTH_DATA_GLUCOSE:
        return QuickAccessLogHealthGlucose
      case quickAccessRoutes.LOG_MEASUREMENT:
        return LogMeasurements
      case quickAccessRoutes.LOG_EXERCISE:
        return QuickAccessLogExercise
      case quickAccessRoutes.LOG_MEAL:
        return QuickAccessLogMeal
      case quickAccessRoutes.ADD_EXERCISE:
        return QuickAccessAddExercise
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
