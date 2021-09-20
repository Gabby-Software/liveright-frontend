import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import Button from '../../../components/buttons/button/button.component'
import { Routes } from '../../../enums/routes.enum'
import useHealth from '../../../hooks/api/progress/useHealth'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { getDuration } from '../../../pipes/duration.pipe'
import { timeWithSeconds } from '../../../pipes/time.pipe'
import { getRoute } from '../../../utils/routes'
import { logHealthDataAsync } from '../../progress/progress.api'
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
  const params = useParams<any>()
  const history = useHistory()
  const [initialValues, setInitialValues] = useState<HealthData>({
    id: '',
    date: '',
    time: ''
  })

  const handleReturn = () => {
    history.push(getRoute(Routes.PROGRESS_HEALTH_DATA, { id: params.id }))
  }

  const handleSubmit = async (values: HealthData) => {
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
        sleep_duration: getDuration(start_time, end_time) + ':00',
        nap_start_time: timeWithSeconds(nap_start_time),
        nap_end_time: timeWithSeconds(nap_end_time),
        nap_duration: getDuration(nap_start_time, nap_end_time) + ':00',
        quality
      }
    }

    logHealthDataAsync({
      ...payload,
      edit: payload.date === values.date,
      id: values.id,
      account_id: Number(params.id)
    }).then(handleReturn)
  }

  const { health } = useHealth({
    skip: !params.date,
    per_page: 1,
    filter: {
      account_id: params.id,
      date: params.date
    }
  })

  useEffect(() => {
    if (health[0] && health[0].id) {
      setInitialValues(health[0])
    } else {
      setInitialValues((values) => ({ ...values, date: params.date }))
    }
  }, [health[0]?.id])

  const content = (
    <Formik
      enableReinitialize
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={Yup.object({
        date: Yup.string().required(),
        time: Yup.string().required(),
        heart_rate: Yup.object({
          avg_rate: Yup.number().min(40).max(200)
        }).nullable(),
        steps: Yup.object({
          daily_steps: Yup.number().min(0).max(1e5)
        }).nullable(),
        blood_glucose: Yup.object({
          glucose: Yup.number().min(25).max(350)
        }).nullable(),
        sleep: Yup.object({
          start_time: Yup.string(),
          // .when('end_time', {
          //   is: (field: string) => !!field,
          //   then: Yup.string().required()
          // }),
          end_time: Yup.string().when('start_time', {
            is: (field: string) => !!field,
            then: Yup.string().required()
          }),
          nap_start_time: Yup.string(),
          // .when('nap_end_time', {
          //   is: (field: string) => !!field,
          //   then: Yup.string().required()
          // }),
          nap_end_time: Yup.string().when('nap_start_time', {
            is: (field: string) => !!field,
            then: Yup.string().required()
          })
        }).nullable()
      }).test((values) => {
        return !(
          values.heart_rate?.avg_rate ||
          values.blood_glucose?.glucose ||
          values.steps?.daily_steps ||
          (values.sleep?.start_time && values.sleep?.end_time) ||
          (values.sleep?.nap_start_time && values.sleep?.nap_end_time)
        )
      })}
    >
      <Form>
        {isMobile ? <LogHealthDataMobile /> : <LogHealthDataDesktop />}
      </Form>
    </Formik>
  )

  return isMobile ? (
    <MobilePage
      title="Log Health Data"
      headerSpacing={20}
      headerTopComponent={
        <HeaderLink
          to={getRoute(Routes.PROGRESS_HEALTH_DATA, { id: params.id })}
        >
          Return to Health Data
        </HeaderLink>
      }
      actionComponent={<Button>Save Logs</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}

export default LogHealthData
