import { FormikHelpers, useFormik } from 'formik'
import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { useIsBusy } from '../../../../../hooks/sessions.hook'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { ACTION_CLIENT_REQUEST_SESSION_REQUEST } from '../../../../../store/action-types'
import { Session } from '../../../../../types/session.type'
import Button from '../../../../buttons/button/button.component'
import CreditsButton from '../../../../buttons/credits-button/credits-button.component'
import DatePicker from '../../../../form/date-picker/date-picker.component'
import TimePicker from '../../../../form/time-picker/time-picker.component'
import Styles from './add-form.styles'

interface FormValues {
  type: Session
  date: string
  duration: string
  time: string
}

const initialValues: FormValues = {
  type: 'Paid PT',
  date: '',
  duration: '01:00:00',
  time: ''
}

interface AddFormProps {
  onSuccess?: () => void
  trainerId: number
}

export default function AddForm({ onSuccess, trainerId }: AddFormProps) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const handleSubmit = (
    values: FormValues,
    helper: FormikHelpers<FormValues>
  ) => {
    const { type, date, duration, time } = values

    dispatch({
      type: ACTION_CLIENT_REQUEST_SESSION_REQUEST,
      payload: {
        type,
        client_request: {
          date,
          duration: moment(duration, 'h:mm').format('HH:mm:ss'),
          time: moment(time, 'h:mm').format('HH:mm:ss')
        },
        trainer_id: trainerId
      }
    })

    helper.setSubmitting(false)
    onSuccess?.()
  }

  const { values, setFieldValue, submitForm } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      date: Yup.date().min(moment().startOf('day')).required(),
      time: Yup.string().required(),
      duration: Yup.string().required(),
      type: Yup.string().required()
    }),
    onSubmit: handleSubmit
  })

  const { date, time, duration } = values

  const isBusy = useIsBusy({ date, time, duration })

  return (
    <Styles className="add-session">
      {!isMobile && (
        <CreditsButton
          count={4}
          color="secondary"
          className="add-session__credits-btn"
        />
      )}

      {/*<h3 className="add-session__title">*/}
      {/*  {t('sessions:session-request-new')}*/}
      {/*</h3>*/}

      <p className="add-session__subtitle">
        {t('sessions:session-request-title')}
      </p>

      <form>
        <DatePicker
          id="request-session-date"
          label={t('sessions:desired-date')}
          className="add-session__form-item"
          value={date}
          onChange={(e, dateStr) => setFieldValue('date', dateStr)}
          disabledPast
        />
        <TimePicker
          id="request-session-time"
          label={t(
            isBusy ? 'sessions:request-anyway' : 'sessions:desired-time'
          )}
          className="add-session__form-item"
          value={time}
          onChange={(e, dateStr) => setFieldValue('time', dateStr)}
          disabledUntilNow={moment(date).isSame(moment(), 'days')}
        />

        <Button onClick={submitForm} className="add-session__submit-btn">
          {t('sessions:session-request-submit')}
        </Button>
      </form>
    </Styles>
  )
}
