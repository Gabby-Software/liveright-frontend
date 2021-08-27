import { Form, Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'

// import * as Yup from 'yup'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { getStepsQuality } from '../../../../../pages/progress-log/log-health-data/log-health-data.helpers'
import QuickAccessBack from '../../../components/quick-access-back/quick-access-back.component'
import { QuickAccessButton } from '../../../components/quick-access-button.styles'
import QuickAccessLogRow from '../../../components/quick-access-log-row/quick-access-log-row.component'
import QuickAccessTitle from '../../../components/quick-access-title/quick-access-title.component'
import { useQuickAccess } from '../../../quick-access.context'
import { quickAccessRoutes } from '../../../quick-access.routes'
import { QuickAccessLogDataType } from '../../../types/quick-access-log-data.type'
import Styles from './quick-access-log-health-steps.styles'

type Props = {}
const QuickAccessLogHealthSteps: FC<Props> = ({}) => {
  const { t } = useTranslation()
  const { setOpen } = useQuickAccess()
  const onSubmit = (
    values: QuickAccessLogDataType,
    helper: FormikHelpers<QuickAccessLogDataType>
  ) => {
    console.log('submitting', values)
    helper.setSubmitting(false)
    setOpen(false)
  }
  return (
    <Styles>
      <QuickAccessBack
        label={'health-data'}
        route={quickAccessRoutes.LOG_HEALTH_DATA}
      />
      <QuickAccessTitle>{t('quickaccess:menu.steps')}</QuickAccessTitle>
      <Formik initialValues={{ data: '' }} onSubmit={onSubmit}>
        <Form>
          <QuickAccessLogRow
            min={0}
            max={1e5}
            label={t('progress:daily_steps')}
            getQuality={getStepsQuality}
          />
          <QuickAccessButton>{t('submit')}</QuickAccessButton>
        </Form>
      </Formik>
    </Styles>
  )
}

export default QuickAccessLogHealthSteps
