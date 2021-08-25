import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { Routes } from '../../../enums/routes.enum'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { getDuration } from '../../../pipes/duration.pipe'
import { timeWithSeconds } from '../../../pipes/time.pipe'
import {
  getHealthDataAsync,
  logHealthDataAsync
} from '../../progress/progress.api'
import { HealthData } from '../../progress/progress.types'
import {
  getGlucoseQuality,
  getHeartRateQuality,
  getStepsQuality
} from './log-health-data.helpers'
import LogHealthDataDesktop from './log-health-data-desktop/log-health-data-desktop.component'
import LogHealthDataMobile from './log-health-data-mobile/log-health-data-mobile.component'

const LogHealthData = () => {
  const isMobile = useIsMobile()
  const { date } = useParams<{ date: string }>()
  const history = useHistory()
  const [initialValues, setInitialValues] = useState<HealthData>({ id: '' })

  const handleReturn = () => {
    history.push(Routes.PROGRESS)
  }

  const handleSubmit = async (values: HealthData) => {
    console.log({ values })
    const { time, sleep, heart_rate, steps, blood_glucose } = values
    const payload: HealthData = {
      date: values.date,
      time: timeWithSeconds(time)
    }

    if (heart_rate?.avg_rate) {
      payload.heart_rate = {
        ...heart_rate,
        quality: getHeartRateQuality(heart_rate.avg_rate)
      }
    }

    if (steps?.daily_steps) {
      payload.steps = {
        ...steps,
        quality: getStepsQuality(steps.daily_steps)
      }
    }

    if (blood_glucose?.glucose) {
      payload.blood_glucose = {
        ...blood_glucose,
        quality: getGlucoseQuality(blood_glucose.glucose)
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
        quality
      }
    }

    logHealthDataAsync({
      ...payload,
      edit: date === values.date,
      id: values.id
    }).then(handleReturn)
  }

  useEffect(() => {
    if (date) {
      const getHealthData = async () => {
        const { data } = await getHealthDataAsync({ date })

        if (data.length) {
          setInitialValues(data[0])
        } else {
          setInitialValues({ ...initialValues, date })
        }
      }

      getHealthData()
    }
  }, [])

  return (
    <Formik
      enableReinitialize
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={Yup.object({
        date: Yup.string().required(),
        time: Yup.string().required(),
        heart_rate: Yup.object({
          avg_rate: Yup.string().number().min(25).max(200)
        }).nullable(),
        steps: Yup.object({
          daily_steps: Yup.string().number().min(0).max(1e5)
        }).nullable(),
        blood_glucose: Yup.object({
          glucose: Yup.string().number().min(25).max(350)
        }).nullable()
      })}
    >
      <Form>
        {isMobile ? <LogHealthDataMobile /> : <LogHealthDataDesktop />}
      </Form>
    </Formik>
  )
}

export default LogHealthData
