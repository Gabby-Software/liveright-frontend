import { Form, Formik } from 'formik'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { getDuration } from '../../../pipes/duration.pipe'
import { timeWithSeconds } from '../../../pipes/time.pipe'
import { ACTION_SET_HEALTH_DATA_REQUEST } from '../../../store/action-types'
import { HealthData } from '../../progress/progress.types'
import {
  getGlucoseQuality,
  getHeartRateQuality,
  getStepsQuality,
} from './log-health-data.helpers'
import LogHealthDataDesktop from './log-health-data-desktop/log-health-data-desktop.component'
import LogHealthDataMobile from './log-health-data-mobile/log-health-data-mobile.component'

const LogHealthData = () => {
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const initialValues = useMemo<HealthData>(() => {
    return {
      id: '',
    }
  }, [])

  const handleSubmit = (values: HealthData) => {
    const { time, sleep, heart_rate, steps, blood_glucose } = values
    const payload = {
      ...values,
      time: timeWithSeconds(time),
    }

    if (heart_rate) {
      payload.heart_rate = {
        ...heart_rate,
        quality: getHeartRateQuality(heart_rate.avg_rate),
      }
    }

    if (steps) {
      payload.steps = {
        ...steps,
        quality: getStepsQuality(steps.daily_steps),
      }
    }

    if (blood_glucose) {
      payload.blood_glucose = {
        ...blood_glucose,
        quality: getGlucoseQuality(blood_glucose.glucose),
      }
    }

    if (sleep) {
      const { start_time, end_time, nap_start_time, nap_end_time, quality } =
        sleep

      payload.sleep = {
        start_time: timeWithSeconds(start_time),
        end_time: timeWithSeconds(end_time),
        sleep_duration: getDuration(start_time, end_time),
        nap_start_time: timeWithSeconds(nap_start_time),
        nap_end_time: timeWithSeconds(nap_end_time),
        nap_duration: getDuration(nap_start_time, nap_end_time),
        quality,
      }
    }

    dispatch({ type: ACTION_SET_HEALTH_DATA_REQUEST, payload })
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={Yup.object({
        date: Yup.string().required(),
        time: Yup.string().required(),
        heart_rate: Yup.object({
          avg_rate: Yup.string().number(),
        }),
        steps: Yup.object({
          daily_steps: Yup.string().number(),
        }),
        blood_glicose: Yup.object({
          glucose: Yup.string().number(),
        }),
      })}
    >
      <Form>
        {isMobile ? <LogHealthDataMobile /> : <LogHealthDataDesktop />}
      </Form>
    </Formik>
  )
}

export default LogHealthData
