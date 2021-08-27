import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { FC, useMemo, useState } from 'react'
import * as Yup from 'yup'

import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { QUALITY } from '../../../../../pages/progress/progress.constants'
import {
  QualityType,
  SleepData
} from '../../../../../pages/progress/progress.types'
import { getDuration } from '../../../../../pipes/duration.pipe'
import { serverError } from '../../../../../pipes/server-error.pipe'
import FormSelect from '../../../../forms/form-select/form-select.component'
import FormTimepicker from '../../../../forms/form-timepicker/form-timepicker.component'
import { toast } from '../../../../toast/toast.component'
import QuickAccessBack from '../../../components/quick-access-back/quick-access-back.component'
import { QuickAccessButton } from '../../../components/quick-access-button.styles'
import { QuickAccessCard } from '../../../components/quick-access-card.styles'
import QuickAccessTitle from '../../../components/quick-access-title/quick-access-title.component'
import { useQuickAccess } from '../../../quick-access.context'
import { quickAccessRoutes } from '../../../quick-access.routes'
import Styles from './quick-access-log-health-sleep.styles'

type SleepFormType = {
  start_time: string
  end_time: string
  nap_start_time: string
  nap_end_time: string
  quality: string
}
const initialValues: SleepFormType = {
  start_time: '',
  end_time: '',
  nap_start_time: '',
  nap_end_time: '',
  quality: ''
}
enum steps {
  SLEEP,
  NAP
}

const QuickAccessLogHealthSleep: FC = () => {
  const { t } = useTranslation()
  const { setOpen, logHealthData, todayHealthData } = useQuickAccess()
  const [currentStep, setCurrentStep] = useState<steps>(steps.SLEEP)
  const sleepOptions = useMemo(
    () => [
      { value: QUALITY.LOW, label: t(`progress:${QUALITY.LOW}`) },
      {
        value: QUALITY.AVERAGE,
        label: t(`progress:${QUALITY.AVERAGE}`)
      },
      { value: QUALITY.GOOD, label: t(`progress:${QUALITY.GOOD}`) }
    ],
    []
  )
  const onSubmit = (
    values: SleepFormType,
    helper: FormikHelpers<SleepFormType>
  ) => {
    console.log('submitting', values)
    const payload: { sleep: SleepData } = {
      sleep: {
        ...values,
        quality: values.quality as QualityType,
        sleep_duration: getDuration(values.start_time, values.end_time)
      }
    }
    if (values.nap_start_time && values.nap_end_time) {
      payload.sleep.nap_duration = getDuration(
        values.nap_start_time,
        values.nap_end_time
      )
    }
    logHealthData(payload)
      .then(() => {
        helper.setSubmitting(false)
        setOpen(false)
        toast.show({ type: 'success', msg: 'Sleep data logged successfully' })
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
        {t('quickaccess:log-sleep')}
      </QuickAccessTitle>
      <Formik
        initialValues={
          todayHealthData.sleep
            ? (todayHealthData.sleep as SleepFormType)
            : initialValues
        }
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          start_time: Yup.string().required(),
          end_time: Yup.string().required(),
          quality: Yup.string().required()
        })}
        isInitialValid={false}
        initialTouched={{ start_time: true, end_time: true }}
      >
        {({
          values,
          validateForm,
          setFieldError,
          isSubmitting
        }: FormikProps<SleepFormType>) => (
          <Form>
            <QuickAccessCard>
              {currentStep === steps.SLEEP ? (
                <>
                  <div className={'log-sleep__row'}>
                    <FormTimepicker
                      label={t('progress:start_time')}
                      name={'start_time'}
                      suffixIcon={<div />}
                      placeholder={''}
                    />
                    <div className={'log-sleep__duration'}>
                      {getDuration(values.start_time, values.end_time)}
                    </div>
                    <FormTimepicker
                      label={t('progress:end_time')}
                      name={'end_time'}
                      suffixIcon={<div />}
                      placeholder={''}
                    />
                  </div>
                  <FormSelect
                    name={'quality'}
                    label={t('progress:qualityLabel')}
                    options={sleepOptions}
                  />
                </>
              ) : (
                <>
                  <div className={'log-sleep__row'}>
                    <FormTimepicker
                      label={t('progress:nap_start_time')}
                      name={'nap_start_time'}
                      suffixIcon={<div />}
                      placeholder={''}
                    />
                    <div className={'log-sleep__duration'}>
                      {getDuration(values.nap_start_time, values.nap_end_time)}
                    </div>
                    <FormTimepicker
                      label={t('progress:nap_end_time')}
                      name={'nap_end_time'}
                      suffixIcon={<div />}
                      placeholder={''}
                    />
                  </div>
                </>
              )}
            </QuickAccessCard>

            {currentStep === steps.SLEEP ? (
              <QuickAccessButton
                type={'primary'}
                htmlType={'button'}
                onClick={() => {
                  validateForm(values).then((res) => {
                    let valid = true
                    for (const [key, value] of Object.entries(res)) {
                      valid = false
                      setFieldError(key, value)
                    }
                    if (!valid) return
                    setCurrentStep(steps.NAP)
                  })
                }}
                key={steps.SLEEP}
              >
                {t('Next')}
              </QuickAccessButton>
            ) : (
              <QuickAccessButton
                type={'primary'}
                htmlType={'submit'}
                key={steps.NAP}
                loading={isSubmitting}
              >
                {t('Done & Save')}
              </QuickAccessButton>
            )}
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default QuickAccessLogHealthSleep
