import React, { FC, useMemo } from 'react'

import { CrossIcon, DeleteOutlinedIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import LogMeasurements from '../../pages/log-measurements/log-measurements.component'
import QuickAccessAddExercise from '../../pages/quick-access-add-exercise/quick-access-add-exercise.component'
import QuickAccessHome from '../../pages/quick-access-home/quick-access-home.component'
import QuickAccessLogExercise from '../../pages/quick-access-log-exercise/quick-access-log-exercise.component'
import QuickAccessLogHealth from '../../pages/quick-access-log-health/quick-access-log-health.component'
import QuickAccessLogHealthGlucose from '../../pages/quick-access-log-health/quick-access-log-health-glucose/quick-access-log-health-glucose.component'
import QuickAccessLogHealthHeartRate from '../../pages/quick-access-log-health/quick-access-log-health-heart-rate/quick-access-log-health-heart-rate.component'
import QuickAccessLogHealthSleep from '../../pages/quick-access-log-health/quick-access-log-health-sleep/quick-access-log-health-sleep.component'
import QuickAccessLogHealthSteps from '../../pages/quick-access-log-health/quick-access-log-health-steps/quick-access-log-health-steps.component'
import QuickAccessLogMeal from '../../pages/quick-access-log-meal/quick-access-log-meal.component'
import QuickAccessLoggingCardio from '../../pages/quick-access-logging-cardio/quick-access-logging-cardio.component'
import QuickAccessWorkoutOverviewAddExercise from '../../pages/quick-access-workout-overview/add-exercise/add-exercise.component'
import QuickAccessWorkoutOverview from '../../pages/quick-access-workout-overview/quick-access-workout-overview.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles, { Times } from './quick-access-popup.styles'

interface Props {
  fullscreen?: boolean
}

const QuickAccessPopup: FC<Props> = ({ fullscreen }) => {
  const { open, setOpen, route } = useQuickAccess()
  const isMobile = useIsMobile()

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
      case quickAccessRoutes.WORKOUT_OVERVIEW:
        return QuickAccessWorkoutOverview
      case quickAccessRoutes.WORKOUT_OVERVIEW_ADD_EXERCISE:
        return QuickAccessWorkoutOverviewAddExercise
      case quickAccessRoutes.WORKOUT_LOGGING_CARDIO:
        return QuickAccessLoggingCardio
      default:
        return React.Fragment
    }
  }, [route])

  return (
    <Styles
      open={open}
      fullscreen={fullscreen}
      backgroundColor={
        route === quickAccessRoutes.WORKOUT_LOGGING_CARDIO &&
        getColorCarry('neutral_100')
      }
    >
      <Times
        color={
          (route === quickAccessRoutes.WORKOUT_OVERVIEW ||
            route === quickAccessRoutes.WORKOUT_LOGGING_CARDIO) &&
          getColorCarry('neutral_50')
        }
        onClick={() => setOpen(false)}
      >
        {route === quickAccessRoutes.WORKOUT_OVERVIEW && isMobile ? (
          <DeleteOutlinedIcon />
        ) : (
          <CrossIcon />
        )}
      </Times>

      <Content />
    </Styles>
  )
}

export default QuickAccessPopup
