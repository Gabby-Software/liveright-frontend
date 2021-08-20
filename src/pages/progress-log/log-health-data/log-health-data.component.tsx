import { Form, Formik } from 'formik'
import React, { useMemo } from 'react'
import * as Yup from 'yup'

import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { HealthData } from '../../progress/progress.types'
import LogHealthDataDesktop from './log-health-data-desktop/log-health-data-desktop.component'
import LogHealthDataMobile from './log-health-data-mobile/log-health-data-mobile.component'

const LogHealthData = () => {
  const isMobile = useIsMobile()
  const initialValues = useMemo<HealthData>(() => {
    return {
      id: ''
    }
  }, [])

  return (
    <Formik
      onSubmit={() => {}}
      initialValues={initialValues}
      validationSchema={Yup.object({
        date: Yup.string().required(),
        time: Yup.string().required(),
        heart_rate: Yup.object({
          avg_rate: Yup.string().number()
        }),
        steps: Yup.object({
          daily_steps: Yup.string().number()
        }),
        blood_glicose: Yup.object({
          glucose: Yup.string().number()
        })
      })}
    >
      <Form>
        {isMobile ? <LogHealthDataMobile /> : <LogHealthDataDesktop />}
      </Form>
    </Formik>
  )
}

export default LogHealthData
