import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { FC } from 'react'
import * as Yup from 'yup'

import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { HealthData } from '../../../../../pages/progress/progress.types'
import {
  getGlucoseQuality,
  getStepsQuality
} from '../../../../../pages/progress-log/log-health-data/log-health-data.helpers'
import { serverError } from '../../../../../pipes/server-error.pipe'
import { toast } from '../../../../toast/toast.component'
import QuickAccessBack from '../../../components/quick-access-back/quick-access-back.component'
import { QuickAccessButton } from '../../../components/quick-access-button.styles'
import QuickAccessLogRow from '../../../components/quick-access-log-row/quick-access-log-row.component'
import QuickAccessTitle from '../../../components/quick-access-title/quick-access-title.component'
import { useQuickAccess } from '../../../quick-access.context'
import { quickAccessRoutes } from '../../../quick-access.routes'
import { QuickAccessLogDataType } from '../../../types/quick-access-log-data.type'
import Styles from './quick-access-log-health-glucose.styles'

type Props = {}
const QuickAccessLogHealthGlucose: FC<Props> = ({}) => {
  const { t } = useTranslation()
  const { setOpen, logHealthData, todayHealthData } = useQuickAccess()
  const onSubmit = (
    values: QuickAccessLogDataType,
    helper: FormikHelpers<QuickAccessLogDataType>
  ) => {
    console.log('submitting', values)
    const payload: Partial<HealthData> = {
      blood_glucose: {
        glucose: +values.data,
        quality: getStepsQuality(+values.data)
      }
    }
    logHealthData(payload)
      .then(() => {
        helper.setSubmitting(false)
        setOpen(false)
        toast.show({ type: 'success', msg: 'Glucose logged successfully' })
      })
      .catch((e) => toast.show({ type: 'error', msg: serverError(e) }))
  }
  return (
    <Styles>
      <QuickAccessBack
        label={'health-data'}
        route={quickAccessRoutes.LOG_HEALTH_DATA}
      />
      <QuickAccessTitle label={'Today'}>
        {t('quickaccess:menu.glucose')}
      </QuickAccessTitle>
      <Formik
        initialValues={{
          data: String(todayHealthData.blood_glucose?.glucose || '')
        }}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          data: Yup.number().required().min(25).max(350)
        })}
      >
        {({ isValid }: FormikProps<QuickAccessLogDataType>) => (
          <Form>
            <QuickAccessLogRow
              min={0}
              max={350}
              label={t('progress:blood_glucose')}
              getQuality={getGlucoseQuality}
            />
            <QuickAccessButton
              htmlType={'submit'}
              type={'primary'}
              disabled={!isValid}
            >
              {t('submit')}
            </QuickAccessButton>
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default QuickAccessLogHealthGlucose
